from django.contrib import admin
from .models import  Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['patient', 'provider', 'date_time', 'status']
    list_filter = ['status', 'date_time']
