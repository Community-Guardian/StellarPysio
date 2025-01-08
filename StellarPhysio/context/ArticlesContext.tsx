import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  getArticles,
  getArticlesByCondition,
  getPublishedArticles,
  createArticle,
  updateArticles,
  deleteArticle,
} from '@/handlers/ArticlesManager';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';

// Article and Service Interfaces
interface Service {
  id: number;
  name: string;
  serviceType: string; // Flattened from "service_type.name"
  price: string;
  description: string;
  isActive: boolean;
}

interface ArticleType {
  id: number;
  name: string;
  description: string;
  created_at: string;
  icon: string;
}

interface Article {
  id: number;
  article_type: ArticleType;
  title: string;
  content: string;
  is_published: boolean;
  medical_condition: string;
  tags: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  user: string;
}

// Context Interface
interface ArticlesContextData {
  articles: Article[];
  loading: boolean;
  fetchArticles: () => Promise<void>;
  fetchPublishedArticles: () => Promise<void>;
  fetchArticlesByCondition: (condition: string) => Promise<void>;
  addArticle: (articleData: Partial<Article>) => Promise<void>;
  updateArticle: (articleId: string, updatedData: Partial<Article>) => Promise<void>;
  removeArticle: (articleId: string) => Promise<void>;
}

// Context Props
interface ArticlesProviderProps {
  children: ReactNode;
}

// Default Context Values
const ArticlesContext = createContext<ArticlesContextData>({
  articles: [],
  loading: false,
  fetchArticles: async () => {},
  fetchPublishedArticles: async () => {},
  fetchArticlesByCondition: async () => {},
  addArticle: async () => {},
  updateArticle: async () => {},
  removeArticle: async () => {},
});

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPublishedArticles = async () => {
    try {
      setLoading(true);
      const data = await getPublishedArticles();
      setArticles(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch published articles.');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticlesByCondition = async (condition: string) => {
    try {
      setLoading(true);
      const data = await getArticlesByCondition(condition);
      setArticles(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch articles by condition.');
    } finally {
      setLoading(false);
    }
  };

  const addArticle = async (articleData: Partial<Article>) => {
    try {
      setLoading(true);
      await createArticle(articleData);
      await fetchArticles();
    } catch (error) {
      console.error('Error adding article:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (articleId: string, updatedData: Partial<Article>) => {
    try {
      setLoading(true);
      await updateArticles(articleId, updatedData);
      await fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeArticle = async (articleId: string) => {
    try {
      setLoading(true);
      await deleteArticle(articleId);
      await fetchArticles();
    } catch (error) {
      console.error('Error removing article:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated]);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        fetchArticles,
        fetchPublishedArticles,
        fetchArticlesByCondition,
        addArticle,
        updateArticle,
        removeArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);