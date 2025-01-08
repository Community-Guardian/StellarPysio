# notifications/admin.py
from django.contrib import admin
from .models import NotificationType, Notification

@admin.register(NotificationType)
class NotificationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'notification_type', 'title', 'is_read', 'created_at', 'updated_at')
    list_filter = ('is_read', 'notification_type', 'user')
