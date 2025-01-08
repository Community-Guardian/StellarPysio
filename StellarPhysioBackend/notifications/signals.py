from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification, NotificationType
from appointments.models import Appointment
from services.models import Service
from payments.models import Payment
from articles.models import Article
from feedback.models import Feedback
from achievements.models import Achievement

@receiver(post_save, sender=Appointment)
def create_appointment_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.patient,
            notification_type=NotificationType.objects.get(name=NotificationType.Type.ALERT),
            title="New Appointment",
            message=f"Your appointment with {instance.provider} is scheduled for {instance.date_time}.",
        )

@receiver(post_save, sender=Service)
def create_service_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            notification_type=NotificationType.objects.get(name=NotificationType.Type.INFO),
            title="New Service Added",
            message=f"A new service '{instance.name}' has been added.",
        )

@receiver(post_save, sender=Payment)
def create_payment_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            notification_type=NotificationType.objects.get(name=NotificationType.Type.ALERT),
            title="Payment Received",
            message=f"Your payment of {instance.amount} for {instance.service.name} has been received.",
        )

@receiver(post_save, sender=Article)
def create_article_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            notification_type=NotificationType.objects.get(name=NotificationType.Type.NEWS),
            title="New Article Published",
            message=f"A new article '{instance.title}' has been published.",
        )

@receiver(post_save, sender=Feedback)
def create_feedback_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            notification_type=NotificationType.objects.get(name=NotificationType.Type.INFO),
            title="Feedback Received",
            message=f"Thank you for your feedback!",
        )

@receiver(post_save, sender=Achievement)
def create_achievement_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            notification_type=NotificationType.objects.get(name=NotificationType.Type.ALERT),
            title="New Achievement",
            message=f"Congratulations! You have received a new achievement: {instance.certification.title}.",
        )