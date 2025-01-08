# articles/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ArticleTypeViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'articles/types', ArticleTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
