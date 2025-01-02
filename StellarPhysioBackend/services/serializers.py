from rest_framework import serializers
from .models import Service, ServiceType

class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = ['id', 'name']

class ServiceSerializer(serializers.ModelSerializer):
    service_type = ServiceTypeSerializer()

    class Meta:
        model = Service
        fields = ['id', 'name', 'service_type', 'price', 'description', 'is_active']
