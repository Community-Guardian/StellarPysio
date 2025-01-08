from rest_framework import serializers
from .models import Achievement, Certification

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'description', 'image_url']

class AchievementSerializer(serializers.ModelSerializer):
    certification = CertificationSerializer()

    class Meta:
        model = Achievement
        fields = ['id', 'user', 'certification', 'date', 'created_at']
        read_only_fields = ['user', 'created_at']