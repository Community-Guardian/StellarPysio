import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CREATE_MPESA_PAYMENT_INTENT_URL, MPESA_CALLBACK_URL, REFUND_PAYMENT_URL,PAYMENTS_URL,REFRESH_TOKEN } from './apiConfig';
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
const api = axios.create();

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
// Payment Handlers
export const getPayments = async () => {
  try {
    const response = await api.get(PAYMENTS_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const createMpesaPaymentIntent = async (serviceId: string, phoneNumber: string) => {
  try {
    const response = await api.post(CREATE_MPESA_PAYMENT_INTENT_URL, { serviceId, phone_number:phoneNumber });
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const mpesaCallback = async (callbackData: any) => {
  try {
    const response = await api.post(MPESA_CALLBACK_URL, callbackData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const refundPayment = async (paymentId: string, refundAmount: number, phoneNumber: string) => {
  try {
    const response = await api.post(REFUND_PAYMENT_URL, { paymentId, refundAmount, phoneNumber });
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
