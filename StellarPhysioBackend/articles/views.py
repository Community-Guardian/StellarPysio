# articles/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Article, ArticleType
from .serializers import ArticleSerializer, ArticleTypeSerializer
from rest_framework.permissions import IsAuthenticated


class ArticleTypeViewSet(viewsets.ModelViewSet):
    queryset = ArticleType.objects.all()
    serializer_class = ArticleTypeSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        # Automatically set the user from the request
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Ensure the user field is not altered during updates
        serializer.save(user=self.request.user)
    # Custom action to filter articles by medical condition
    @action(detail=False, methods=['get'])
    def by_condition(self, request):
        medical_condition = request.query_params.get('condition', None)
        if medical_condition:
            articles = Article.objects.filter(medical_condition__icontains=medical_condition)
        else:
            articles = Article.objects.all()
        
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)

    # Custom action to get published articles
    @action(detail=False, methods=['get'])
    def published(self, request):
        published_articles = Article.objects.filter(is_published=True)
        serializer = self.get_serializer(published_articles, many=True)
        return Response(serializer.data)
