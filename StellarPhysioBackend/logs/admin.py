from django.contrib import admin
from .models import Log 



@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ['user', 'log_type', 'action', 'timestamp']
    list_filter = ['log_type', 'timestamp']
    search_fields = ['user__username', 'action', 'details']
    readonly_fields = ['timestamp']
    