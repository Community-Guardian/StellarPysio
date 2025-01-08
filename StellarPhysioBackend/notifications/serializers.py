# notifications/serializers.py
from rest_framework import serializers
from .models import Notification, NotificationType


class NotificationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationType
        fields = ['id', 'name', 'description', 'created_at']


class NotificationSerializer(serializers.ModelSerializer):
    notification_type = NotificationTypeSerializer(read_only=True)  # Nested representation for reading
    notification_type_id = serializers.PrimaryKeyRelatedField(
        queryset=NotificationType.objects.all(), source='notification_type', write_only=True
    ) 
    class Meta:
        model = Notification
        fields = '__all__'
