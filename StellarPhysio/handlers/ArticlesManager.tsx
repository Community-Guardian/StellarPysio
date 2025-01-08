import { ARTICLES_URL,BASE_URL,REFRESH_TOKEN } from "./apiConfig";
import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Handle API errors
const handleApiError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    console.error('API Error:', error.response.data);
    throw error.response.data;
  } else {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Configure Axios instance
const api = axios.create({
  baseURL: ARTICLES_URL,
});

api.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (originalRequest && error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (refreshToken) {
          const response = await api.post(REFRESH_TOKEN, { refresh: refreshToken });

          if (response.status === 200) {
            await AsyncStorage.setItem('accessToken', response.data.access);
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            }
            return api(originalRequest);
          } else {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
          }
        }

        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
// Article Handlers
export const getArticles = async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };
  
  export const getArticlesByCondition = async (condition: string) => {
    try {
      const response = await api.get(`/by_condition/?condition=${condition}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };
  
  export const getPublishedArticles = async () => {
    try {
      const response = await api.get('/published/');
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };
  
  export const createArticle = async (articleData: any) => {
    try {
      const response = await api.post('/', articleData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };
  
  export const updateArticles = async (articleId: string, articleData: any) => {
    try {
      const response = await api.patch(`/${articleId}/`, articleData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };
  
  export const deleteArticle = async (articleId: string) => {
    try {
      const response = await api.delete(`/${articleId}/`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };