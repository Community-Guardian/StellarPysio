import axios, { AxiosError } from 'axios';
import { APPOINTMENTS_URL } from './apiConfig';
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
  baseURL: APPOINTMENTS_URL,
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

// Appointment Handlers
export const getAppointments = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await api.post('/', appointmentData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const updateAppointment = async (appointmentId: string, appointmentData: any) => {
  try {
    const response = await api.patch(`/${appointmentId}/`, appointmentData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const response = await api.delete(`/${appointmentId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
