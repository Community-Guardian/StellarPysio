# notifications/models.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings  # For custom user model


class NotificationType(models.Model):
    """
    Model for different types of notifications (e.g., Alert, Reminder, News).
    """
    class Type(models.TextChoices):
        ALERT = 'AL', _('Alert')
        REMINDER = 'RE', _('Reminder')
        NEWS = 'NE', _('News')
        INFO = 'IN', _('Information')
    
    name = models.CharField(
        max_length=2,
        choices=Type.choices,
        default=Type.INFO,
        verbose_name=_('Notification Type')
    )
    description = models.TextField(blank=True, null=True, verbose_name=_('Description'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    
    def __str__(self):
        return self.get_name_display()

    class Meta:
        verbose_name = _('Notification Type')
        verbose_name_plural = _('Notification Types')


class Notification(models.Model):
    """
    Model for managing notifications.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        verbose_name=_('User'),
        null=True,
        blank=True
    )
    notification_type = models.ForeignKey(
        NotificationType,
        on_delete=models.CASCADE,
        related_name='notifications',
        verbose_name=_('Notification Type')
    )
    title = models.CharField(max_length=255, verbose_name=_('Title'))
    message = models.TextField(verbose_name=_('Message'))
    is_read = models.BooleanField(default=False, verbose_name=_('Is Read'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Updated At'))
    
    def __str__(self):
        return f'Notification for {self.user.username}'

    class Meta:
        verbose_name = _('Notification')
        verbose_name_plural = _('Notifications')
