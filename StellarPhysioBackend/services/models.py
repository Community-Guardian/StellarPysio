from django.db import models
from django.utils.translation import gettext_lazy as _

class ServiceType(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=_('Service Type'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Updated At'))
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Service Type')
        verbose_name_plural = _('Service Types')


class Service(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Service Name'))
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE, related_name='services', verbose_name=_('Service Type'))
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Price'))
    description = models.TextField(blank=True, null=True, verbose_name=_('Description'))
    is_active = models.BooleanField(default=True, verbose_name=_('Is Active'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Updated At'))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Service')
        verbose_name_plural = _('Services')
class Receipt(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Receipt for order {self.order.id}"