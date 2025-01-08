from rest_framework import serializers
from .models import Service, ServiceType

class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = ['id', 'name']

class ServiceSerializer(serializers.ModelSerializer):
    service_type = ServiceTypeSerializer(read_only=True)  # Nested representation for reading
    service_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ServiceType.objects.all(), source='service_type', write_only=True
    )  # Accept service_type_id for creation/update
    class Meta:
        model = Service
        fields = '__all__'
