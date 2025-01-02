import axios, { AxiosError } from 'axios';
import { SERVICES_URL } from './apiConfig';
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
