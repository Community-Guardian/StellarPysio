from django.http import JsonResponse
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from .services import PaymentService
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_mpesa_payment_intent(request):
    service_id = request.data.get('serviceId')
    phone_number = request.data.get('phone_number')
    user = request.user  

    result, status_code = PaymentService.create_mpesa_payment_intent(service_id, phone_number,user)
    return Response(result, status=status_code)

@csrf_exempt
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def mpesa_callback(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            data = json.loads(body_unicode)
            result, status_code = PaymentService.mpesa_callback(data)
            return JsonResponse(result, status=status_code)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def refund_payment(request):
    payment_id = request.data.get('payment_id')
    refund_amount = request.data.get('refund_amount')
    phone_number = request.data.get('phone_number')

    result, status_code = PaymentService.refund_payment(payment_id, refund_amount, phone_number)
    return Response(result, status=status_code)
class PaymentsViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    http_method_names = ['get', 'head', 'options']

    def get_queryset(self):
        """
        Returns the queryset based on the role specified in the query parameter.
        Only admins can access filtered roles.
        """
        role = self.request.query_params.get('role', 'self')  # Default to 'self' if no role is specified

        if self.request.user.is_staff:
            if role == 'all':
                return self.queryset  # Return all users
            elif role == 'patient':
                return self.queryset.filter(user_type='patient')
            elif role == 'admins':
                return self.queryset.filter(is_staff=True)
            else:
                return self.queryset.filter(user=self.request.user.id)  # Return only the current user if role is 'self'
        else:
            # Non-admins can only access their own data
            return self.queryset.filter(user=self.request.user.id)

