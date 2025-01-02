from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment
from services.models import Service ,Receipt
from django.core.mail import EmailMessage,send_mail
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
import logging
from django.conf import settings
from django.utils.crypto import get_random_string
from .models import Payment
from userManager.models import Individual

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Payment)
def generate_receipt_and_send_email(sender, instance, created, **kwargs):
    try:
        # Only generate receipt and send email if payment status is 'paid'
        if instance.payment_status == 'paid':
            service = instance.service

            # Check if receipt has already been created
            if not Receipt.objects.filter(service=service).exists():
                # Generate receipt PDF
                buffer = BytesIO()
                pdf = canvas.Canvas(buffer, pagesize=letter)
                pdf.setTitle("Harmosoft Book Store Receipt")

                # Header
                pdf.setFont("Helvetica-Bold", 16)
                pdf.drawString(100, 750, "Harmosoft Book Store")

                # Service details
                pdf.setFont("Helvetica", 12)
                pdf.drawString(100, 730, f"Receipt for Service: {service.id}")
                pdf.drawString(100, 710, f"Date: {service.date}")
                pdf.drawString(100, 690, f"Customer: {service.receipient_name}")

                # Items
                y_position = 670
                pdf.drawString(100, y_position, "Items:")
                y_position -= 20

                for item in service.items.all():
                    pdf.drawString(100, y_position, f"{item.quantity} x {item.item.name} @ KSH{item.item.price}")
                    y_position -= 20

                # Total
                pdf.drawString(100, y_position, f"Total: KSH{service.total}")

                # Footer
                y_position -= 40
                pdf.setFont("Helvetica", 10)
                pdf.drawString(100, y_position, "Note: This is a system-generated receipt.")

                # Save PDF to buffer
                pdf.showPage()
                pdf.save()

                # Get the value of the PDF in memory
                buffer.seek(0)
                pdf_data = buffer.getvalue()
                buffer.close()

                # Create a receipt instance and save it
                receipt = Receipt.objects.create(service=service)
                receipt.save()

                # Send email with the PDF receipt attached
                subject = f'Your Stellar Pyhsio {service.service_type}  Receipt'
                message = f"""
                Dear {service.receipient_name},

                Thank you for your Trust from Stellar Pyhsio!

                Attached is your receipt for Service #{service.id}, dated {service.date}. 

                If you have any questions, feel free to contact us.

                Best regards,
                Stellar Pyhsio
                """

                recipient_email = service.receipt_email

                email = EmailMessage(subject, message, to=[recipient_email])
                email.attach(f'Receipt_{service.id}.pdf', pdf_data, 'application/pdf')

                # Send the email
                email.send()
                logger.info(f"Receipt created and sent for service {service.id}")
            else:
                logger.warning(f"Receipt for service {service.id} already exists, skipping generation.")

    except Exception as e:
        logger.error(f"Failed to generate receipt and send email: {e}")

from django.contrib.auth import get_user_model

User = get_user_model()
@receiver(post_save, sender=Payment)
def create_individual_on_payment(sender, instance, created, **kwargs):
    if created:
        service = instance.service
        receipt_email = service.receipt_email
        user = instance.user  # Assuming the user is passed during payment creation

        if user:
            # If the payment is associated with an existing logged-in user, just link the payment to that user
            Payment.objects.filter(id=instance.id).update(user=user)
        else:
            # Generate a random password for the new user
            random_password = Individual.objects.make_random_password()

            # Check if an individual already exists with the receipt's email
            individual, user_created = Individual.objects.get_or_create(
                email=receipt_email, 
                defaults={
                    'username': receipt_email.split('@')[0],
                    'password': random_password,
                }
            )

            # If the user is newly created, send an email with login credentials and account deactivation option
            if user_created:
                subject = "Welcome to Stellar Pyhsio! Your Account Has Been Created To Track Services"
                message = f"""
                Hello {individual.first_name or 'User'},

                An account has been successfully created for you on our platform due to your payment for Service #{service.id}.

                Here are your login details:
                - Username: {individual.username}
                - Email: {individual.email}
                - Password: {random_password}

                You can log in at any time using your email and password. Please consider changing your password after your first login for better security.

                If you did not intend to create this account, you can deactivate it by clicking the link below:
                http://yourdomain.com/deactivate/{individual.id}

                Thank you for your purchase, and we look forward to serving you again!

                Best regards,
                Stellar Pyhsio Team
                """
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [individual.email],
                    fail_silently=False
                )

            # Update the payment instance with the individual using update() to avoid triggering the signal again
            Payment.objects.filter(id=instance.id).update(user=individual)