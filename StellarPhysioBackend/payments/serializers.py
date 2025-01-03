# payments/serializers.py

from rest_framework import serializers
from .models import Payment, Refund
from services.serializers import ServiceSerializer
class PaymentSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField()  # Field to accept the service ID
    service = ServiceSerializer(read_only=True)  # Read-only field for service details
    class Meta:
        model = Payment
        fields = '__all__'


class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = '__all__'