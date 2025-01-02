import axios, { AxiosError } from 'axios';
import { CREATE_MPESA_PAYMENT_INTENT_URL, MPESA_CALLBACK_URL, REFUND_PAYMENT_URL } from './apiConfig';
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

// Payment Handlers
export const createMpesaPaymentIntent = async (serviceId: string, phoneNumber: string) => {
  try {
    const response = await api.post(CREATE_MPESA_PAYMENT_INTENT_URL, { serviceId, phoneNumber });
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
