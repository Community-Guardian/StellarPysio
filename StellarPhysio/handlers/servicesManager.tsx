import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { SERVICES_URL,REFRESH_TOKEN } from './apiConfig';
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
  baseURL: SERVICES_URL,
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
// Handle refresh token logic
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
// Service Handlers
export const getServices = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const createService = async (serviceData: any) => {
  try {
    const response = await api.post('/', serviceData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const updateService = async (serviceId: string, serviceData: any) => {
  try {
    const response = await api.patch(`/${serviceId}/`, serviceData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteService = async (serviceId: string) => {
  try {
    const response = await api.delete(`/${serviceId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
