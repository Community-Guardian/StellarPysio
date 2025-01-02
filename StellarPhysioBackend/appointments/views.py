from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly

class AppointmentViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.user_type == 'patient':
            serializer.save(patient=user)
        elif user.user_type == 'provider':
            if 'patient' not in self.request.data:
                raise serializers.ValidationError("Patient must be specified for providers.")
            serializer.save(provider=user)
        elif user.is_staff:
            if 'patient' not in self.request.data or 'provider' not in self.request.data:
                raise serializers.ValidationError("Admins must specify both patient and provider.")
            serializer.save()

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Appointment.objects.all()
        elif user.user_type == 'provider':
            return Appointment.objects.filter(provider=user)
        elif user.user_type == 'patient':
            return Appointment.objects.filter(patient=user)
        return Appointment.objects.none()

    def perform_update(self, serializer):
        user = self.request.user
        appointment = self.get_object()
        print(user.__dict__)
        # Ensure the user is the owner of the appointment or an admin
        if user.user_type == 'patient' and appointment.patient != user:
            raise serializers.ValidationError("You do not have permission to update this appointment.")
        elif user.user_type == 'provider' and appointment.provider != user:
            raise serializers.ValidationError("You do not have permission to update this appointment.")

        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user
        appointment = self.get_object()

        if user.user_type == 'patient' and appointment.patient != user:
            raise serializers.ValidationError("You do not have permission to delete this appointment.")
        elif user.user_type == 'provider' and appointment.provider != user:
            raise serializers.ValidationError("You do not have permission to delete this appointment.")

        instance.delete()
