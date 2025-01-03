from datetime import timedelta
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Appointment
from userManager.models import Provider
@receiver(pre_save, sender=Appointment)
def validate_appointment(sender, instance, **kwargs):
    if instance.provider:
        overlapping_appointments = Appointment.objects.filter(
            provider=instance.provider, 
            date_time__lt=instance.date_time + timedelta(minutes=instance.duration), 
            end_time__gt=instance.date_time
        ).exclude(id=instance.id)
        if overlapping_appointments.exists():
            raise ValueError('Provider already has an appointment at this time.')

@receiver(post_save, sender=Appointment)
def update_provider_status(sender, instance, created, **kwargs):
    if created and instance.provider:
        provider = instance.provider
        has_conflicting_appointments = Appointment.objects.filter(
            provider=provider, 
            date_time__lt=instance.date_time + timedelta(minutes=instance.duration), 
            end_time__gt=instance.date_time
        ).exclude(id=instance.id).exists()
        
        provider.is_available = not has_conflicting_appointments
