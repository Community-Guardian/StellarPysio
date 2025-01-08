# articles/admin.py
from django.contrib import admin
from .models import ArticleType, Article

@admin.register(ArticleType)
class ArticleTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'article_type', 'is_published', 'medical_condition', 'tags', 'created_at', 'updated_at')
    list_filter = ('is_published', 'article_type', 'user', 'medical_condition')
