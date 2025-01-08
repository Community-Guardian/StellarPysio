import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGS_URL, REFRESH_TOKEN } from './apiConfig';

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
  baseURL: LOGS_URL,
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
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// Log Handlers
export const getLogs = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const createLog = async (logData: any) => {
  try {
    const response = await api.post('/', logData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const updateLog = async (logId: string, updatedData: any) => {
  try {
    const response = await api.put(`/${logId}/`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteLog = async (logId: string) => {
  try {
    const response = await api.delete(`/${logId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};