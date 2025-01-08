from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Log
from appointments.models import Appointment
from services.models import Service
from payments.models import Payment
from articles.models import Article
from feedback.models import Feedback
from achievements.models import Achievement

@receiver(post_save, sender=Appointment)
def log_appointment_save(sender, instance, created, **kwargs):
    log_type = Log.INFO
    action = 'Created' if created else 'Updated'
    Log.objects.create(
        user=instance.patient,
        log_type=log_type,
        action=f'{action} Appointment',
        details=f'Appointment with {instance.provider} on {instance.date_time}'
    )

@receiver(post_delete, sender=Appointment)
def log_appointment_delete(sender, instance, **kwargs):
    log_type = Log.WARNING
    Log.objects.create(
        user=instance.patient,
        log_type=log_type,
        action='Deleted Appointment',
        details=f'Appointment with {instance.provider} on {instance.date_time}'
    )

@receiver(post_save, sender=Service)
def log_service_save(sender, instance, created, **kwargs):
    log_type = Log.INFO
    action = 'Created' if created else 'Updated'
    Log.objects.create(
        log_type=log_type,
        action=f'{action} Service',
        details=f'Service: {instance.name}'
    )

@receiver(post_delete, sender=Service)
def log_service_delete(sender, instance, **kwargs):
    log_type = Log.WARNING
    Log.objects.create(
        log_type=log_type,
        action='Deleted Service',
        details=f'Service: {instance.name}'
    )

@receiver(post_save, sender=Payment)
def log_payment_save(sender, instance, created, **kwargs):
    log_type = Log.INFO
    action = 'Created' if created else 'Updated'
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action=f'{action} Payment',
        details=f'Payment of {instance.amount} for {instance.service.name}'
    )

@receiver(post_delete, sender=Payment)
def log_payment_delete(sender, instance, **kwargs):
    log_type = Log.WARNING
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action='Deleted Payment',
        details=f'Payment of {instance.amount} for {instance.service.name}'
    )

@receiver(post_save, sender=Article)
def log_article_save(sender, instance, created, **kwargs):
    log_type = Log.INFO
    action = 'Created' if created else 'Updated'
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action=f'{action} Article',
        details=f'Article: {instance.title}'
    )

@receiver(post_delete, sender=Article)
def log_article_delete(sender, instance, **kwargs):
    log_type = Log.WARNING
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action='Deleted Article',
        details=f'Article: {instance.title}'
    )

@receiver(post_save, sender=Feedback)
def log_feedback_save(sender, instance, created, **kwargs):
    log_type = Log.INFO
    action = 'Created' if created else 'Updated'
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action=f'{action} Feedback',
        details=f'Feedback: {instance.message}'
    )

@receiver(post_delete, sender=Feedback)
def log_feedback_delete(sender, instance, **kwargs):
    log_type = Log.WARNING
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action='Deleted Feedback',
        details=f'Feedback: {instance.message}'
    )

@receiver(post_save, sender=Achievement)
def log_achievement_save(sender, instance, created, **kwargs):
    log_type = Log.INFO
    action = 'Created' if created else 'Updated'
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action=f'{action} Achievement',
        details=f'Achievement: {instance.certification.title}'
    )

@receiver(post_delete, sender=Achievement)
def log_achievement_delete(sender, instance, **kwargs):
    log_type = Log.WARNING
    Log.objects.create(
        user=instance.user,
        log_type=log_type,
        action='Deleted Achievement',
        details=f'Achievement: {instance.certification.title}'
    )