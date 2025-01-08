from django.contrib import admin
from .models import Achievement, Certification

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']
    search_fields = ['title']

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['user', 'certification', 'date', 'created_at']
    list_filter = ['date', 'created_at']
    search_fields = ['user__username', 'certification__title']