# articles/serializers.py
from rest_framework import serializers
from .models import Article, ArticleType


class ArticleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleType
        fields = ['id', 'name', 'description', 'created_at', 'icon']


class ArticleSerializer(serializers.ModelSerializer):
    article_type = ArticleTypeSerializer(read_only=True)  # Nested representation for reading
    article_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ArticleType.objects.all(), source='article_type', write_only=True
    ) 
    class Meta:
        model = Article
        fields = '__all__'
