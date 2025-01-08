# articles/models.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator
from django.conf import settings  # For custom user model

class ArticleType(models.Model):
    """
    Model for defining dynamic article types (e.g., Symptoms, Treatments, Procedures, etc.).
    """
    name = models.CharField(max_length=100, unique=True, verbose_name=_('Article Type'))
    description = models.TextField(blank=True, null=True, verbose_name=_('Description'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    icon = models.CharField(max_length=100, default='fitness', verbose_name=_('Article Type Icon')) 
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Article Type')
        verbose_name_plural = _('Article Types')
class Article(models.Model):
    """
    Model for dynamic medical articles.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='articles', 
        verbose_name=_('User'),
        null=True,
        blank=True
    )
    article_type = models.ForeignKey(
        ArticleType, 
        on_delete=models.CASCADE, 
        related_name='articles', 
        verbose_name=_('Article Type')
    )
    title = models.CharField(max_length=255, verbose_name=_('Title'))
    content = models.TextField(verbose_name=_('Content'))
    is_published = models.BooleanField(default=False, verbose_name=_('Is Published'))
    medical_condition = models.CharField(max_length=255, blank=True, null=True, verbose_name=_('Medical Condition'))
    tags = models.CharField(max_length=255, blank=True, null=True, verbose_name=_('Tags'))
    cover_image = models.ImageField(
        upload_to='articles/covers/', 
        blank=True, 
        null=True, 
        verbose_name=_('Cover Image'),
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Updated At'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Article')
        verbose_name_plural = _('Articles')
