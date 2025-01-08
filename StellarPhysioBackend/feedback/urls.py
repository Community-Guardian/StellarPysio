from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet

# Set up the router to automatically create URLs for the viewset
router = DefaultRouter()
router.register(r'feedbacks', FeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include the feedback viewset
]
