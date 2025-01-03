from datetime import timedelta
from django.db import models
from django.utils.timezone import now
from django.conf import settings
from services.models import Service
class Appointment(models.Model):
    STATUS_CHOICES = [
        ('UPCOMMING', 'Upcomming'),
        ('PAST', 'Past'),
        ('CANCELLED', 'Cancelled'),
    ]
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments_as_patient',
        limit_choices_to={'user_type': 'patient'},
        blank=True,
        null=True
    )
    provider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments_as_provider',
        limit_choices_to={'user_type': 'provider'},
        blank=True,
        null=True
    )
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, related_name='appointments', verbose_name='Service')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='UPCOMMING')
    date_time = models.DateTimeField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes", default=60)
    end_time = models.DateTimeField(editable=False)
    reason = models.TextField(blank=True, null=True)
    is_confirmed = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        self.end_time = self.date_time + timedelta(minutes=self.duration)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Appointment with {self.patient} and {self.provider} for {self.service} on {self.date_time}"

    class Meta:
        ordering = ['date_time']
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"
