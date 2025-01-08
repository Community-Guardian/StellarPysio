from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AchievementViewSet, CertificationViewSet

router = DefaultRouter()
router.register(r'achievements', AchievementViewSet)
router.register(r'certifications', CertificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]