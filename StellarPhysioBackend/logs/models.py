from django.db import models
from django.conf import settings

class Log(models.Model):
    INFO = 'INFO'
    WARNING = 'WARNING'
    ERROR = 'ERROR'
    DEBUG = 'DEBUG'

    LOG_CHOICE_TYPES = [
        (INFO, 'Info'),
        (WARNING, 'Warning'),
        (ERROR, 'Error'),
        (DEBUG, 'Debug'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    log_type = models.CharField(max_length=10, choices=LOG_CHOICE_TYPES, default=INFO)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.action} by {self.user.username if self.user else 'System'} at {self.timestamp}"