import logging
import json
from django.conf import settings
from django_daraja.mpesa.core import MpesaClient
from .models import Payment, Refund
from django.db import transaction
from services.models import Service
from .serializers import PaymentSerializer
logger = logging.getLogger('payments')

class PaymentService:
    @staticmethod
    def create_mpesa_payment_intent(service_id, phone_number):
        cl = MpesaClient()
        
        if not service_id:
            logger.error('serviceId is required.')
            return {'error': 'serviceId is required.'}, 400
        
        if not phone_number:
            logger.error('phone_number is required.')
            return {'error': 'phone_number is required.'}, 400

        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            logger.error(f'Service with id {service_id} does not exist.')
            return {'error': 'Service not found.'}, 404

        account_reference = f'service-{service.name}'
        transaction_desc = f'Payment for Stellar Physio service-{service.name}'
        callback_url = 'https://api.harmosoftbookstore.co.ke/api/callback/'
        amount = int(service.price)

        try:
            logger.info(f'Initiating MPESA payment for service {service_id} of amount {amount}.')
            response = cl.stk_push(phone_number, amount, account_reference, transaction_desc, callback_url)
            response_data = response.json()  # Convert response to JSON
            
            if response.status_code != 200:
                logger.error(f'MPESA STK push failed: {response_data}')
                return {'error': 'Failed to initiate payment. Please try again.'}, 400

            payment = Payment.objects.create(
                service=service,
                payment_method='mpesa',
                payment_status='pending',
                amount=service.price,
                transaction_id=response_data.get('MerchantRequestID', '')
            )

            logger.info(f'MPESA payment initiated for service {service_id} with status {payment.payment_status}')
            payment_data = PaymentSerializer(payment).data
            return {'payment_details': payment_data}, 201   

        except Exception as e:
            logger.error(f'MPESA error: {str(e)}')
            return {'error': str(e)}, 500

    @staticmethod
    def mpesa_callback(data):
        if not data:
            logger.warning('Invalid callback data received.')
            return {'error': 'Invalid callback data'}, 400
        
        try:
            stk_callback = data.get('Body', {}).get('stkCallback', {})
            merchant_request_id = stk_callback.get('MerchantRequestID')
            result_code = stk_callback.get('ResultCode')
            result_desc = stk_callback.get('ResultDesc')
            callback_metadata = stk_callback.get('CallbackMetadata', {}).get('Item', [])

            if not merchant_request_id:
                logger.error('Missing MerchantRequestID')
                return {'error': 'Missing MerchantRequestID'}, 400

            payment = Payment.objects.get(transaction_id=merchant_request_id)
            service = payment.service

            with transaction.atomic():
                if result_code == 0:
                    for item in callback_metadata:
                        if item['Name'] == 'Amount':
                            payment.amount = item['Value']
                    payment.payment_status = 'paid'
                else:
                    payment.payment_status = 'failed'
                    payment.result_code = result_code
                    payment.result_desc = result_desc

                payment.save()
                service.save()

            logger.info(f'MPESA callback processed for service {service.id} with status {payment.payment_status}')
            return {'status': 'success'}, 200

        except Payment.DoesNotExist:
            logger.error('Payment not found.')
            return {'error': 'Payment not found'}, 404
        except Exception as e:
            logger.error(f'MPESA callback error: {str(e)}')
            return {'error': str(e)}, 500

    @staticmethod
    def refund_payment(payment_id, refund_amount, phone_number):
        if not payment_id:
            logger.error('payment_id is required.')
            return {'error': 'payment_id is required.'}, 400

        try:
            payment = Payment.objects.get(id=payment_id)
            service = payment.service

            if payment.payment_method == 'mpesa':
                cl = MpesaClient()
                if not phone_number:
                    logger.error('phone_number is required.')
                    return {'error': 'phone_number is required.'}, 400
                
                remarks = f'Refund for service ID {service.id}'
                response = cl.business_payment(phone_number, int(refund_amount), remarks, 'https://api.harmosoftbookstore.co.ke/api/result/', 'Service Refund')
                refund_status = response.json().get('ResponseDescription', 'pending')

                Refund.objects.create(
                    payment=payment,
                    refund_amount=refund_amount if refund_amount else payment.amount,
                    refund_status=refund_status,
                    refund_reason='Manual Refund'
                )

                payment.payment_status = 'refunded'
                service.payment_status = 'refunded'
                payment.save()
                service.save()

                logger.info(f'Refund initiated for payment {payment_id} with status {refund_status}')
                return {'message': 'Refund initiated', 'refund_status': refund_status}, 200

            logger.error('Payment method is not MPESA')
            return {'error': 'Payment method is not MPESA'}, 400

        except Payment.DoesNotExist:
            logger.error('Payment not found.')
            return {'error': 'Payment not found'}, 404
        except Exception as e:
            logger.error(f'Refund error: {str(e)}')
            return {'error': str(e)}, 400
