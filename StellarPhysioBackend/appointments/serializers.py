from rest_framework import serializers
from .models import Appointment
from datetime import timedelta

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

    def validate(self, attrs):
        provider = attrs.get('provider')
        date_time = attrs.get('date_time')
        duration = attrs.get('duration')

        if provider and date_time and duration:
            end_time = date_time + timedelta(hours=duration)  # Use duration in hours
            conflicting_appointments = Appointment.objects.filter(
                provider=provider,
                date_time__lt=end_time,
                end_time__gt=date_time
            )
            if conflicting_appointments.exists():
                raise serializers.ValidationError("The provider is unavailable during this time.")
        return attrs
