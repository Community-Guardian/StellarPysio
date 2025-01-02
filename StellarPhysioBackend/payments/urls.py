# payments/urls.py

from django.urls import path
from .views import  create_mpesa_payment_intent, mpesa_callback, refund_payment

urlpatterns = [
    path('mpesa/create/', create_mpesa_payment_intent, name='create-mpesa-payment-intent'),
    path('callback/', mpesa_callback, name='mpesa-callback'),
    path('refund/', refund_payment, name='refund-payment'),
]