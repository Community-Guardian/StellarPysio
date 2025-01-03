# payments/urls.py

from django.urls import path,include
from .views import  create_mpesa_payment_intent, mpesa_callback, refund_payment ,PaymentsViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'payments', PaymentsViewSet)
urlpatterns = [
    path('', include(router.urls)),

    path('mpesa/create/', create_mpesa_payment_intent, name='create-mpesa-payment-intent'),
    path('callback/', mpesa_callback, name='mpesa-callback'),
    path('refund/', refund_payment, name='refund-payment'),
]