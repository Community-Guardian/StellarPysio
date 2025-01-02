from django.contrib import admin
from .models import Service, ServiceType

@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'service_type', 'price', 'is_active', 'created_at', 'updated_at')
    search_fields = ('name', 'service_type__name',)
    list_filter = ('service_type', 'is_active')
    ordering = ('name',)
