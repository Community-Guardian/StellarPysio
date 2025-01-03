from rest_framework import serializers
from .models import Appointment
from datetime import timedelta
from services.serializers import ServiceSerializer
from .models import Service  # Import your Service model

class AppointmentSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField()  # Field to accept the service ID
    service = ServiceSerializer(read_only=True)  # Read-only field for service details

    class Meta:
        model = Appointment
        fields = '__all__'

    def validate(self, attrs):
        service_id = attrs.get('service_id')
        date_time = attrs.get('date_time')
        duration = attrs.get('duration')  # duration in minutes

        if service_id and date_time and duration:
            service = Service.objects.get(id=service_id)
            end_time = date_time + timedelta(minutes=duration)

            conflicting_appointments = Appointment.objects.filter(
                service=service,
                date_time__lt=end_time,
                date_time__gt=date_time
            )

            if conflicting_appointments.exists():
                raise serializers.ValidationError("The service is already booked at this time.")

        return attrs
