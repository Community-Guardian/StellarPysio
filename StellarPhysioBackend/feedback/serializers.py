from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'feedback', 'rating', 'created_at']
        read_only_fields = ['user']  # The user is set automatically via authentication
