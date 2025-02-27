import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  BASE_URL, 
  GET_INDIVIDUAL_URL,
  UPDATE_INDIVIDUAL_URL,
  REFRESH_TOKEN,
  SIGN_UP_URL, 
  LOGIN_URL_URL, 
  LOGOUT_URL,
  GET_USER_URL,
  CREATE_EMERGENCY_CONTACT_URL, 
  GET_EMERGENCY_CONTACT_URL,
  UPDATE_EMERGENCY_CONTACT_URL, 
  DELETE_EMERGENCY_CONTACT_URL, 

} from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Handler for API error
const handleApiError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    console.error('API Error:', error.response.data);
    throw error.response.data;
  } else {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Configure Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the access token in headers
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
  (error: AxiosError) => {
    return Promise.reject(error);
  }
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

// User Authentication Handlers
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL_URL, { email, password });
    const { access, refresh, user } = response.data;
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('username', user.username);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const signUpUser = async (email: string, password1: string, password2: string, user_type: string) => {
  try {
    const response = await axios.post(SIGN_UP_URL, { email, password1, password2, user_type });
    const { access, refresh, user } = response.data;
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('username', user.username);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get(GET_USER_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getIndividual = async () => {
  try {
    const response = await api.get(GET_INDIVIDUAL_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const updateIndividual = async (formData: any) => {
  try {
    const response = await api.patch(UPDATE_INDIVIDUAL_URL, formData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const logoutUser = async () => {
  try {
    const authToken = await AsyncStorage.getItem('accessToken');
    if (!authToken) throw new Error('No auth token found');
    const response = await api.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  } finally {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }
};
// 
// New Emergency Contact Handlers
export const createEmergencyContact = async (contactData: any) => {
  try {
    const response = await api.post(CREATE_EMERGENCY_CONTACT_URL, contactData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const getEmergencyContact = async () => {
  try {
    const response = await api.get(GET_EMERGENCY_CONTACT_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const updateEmergencyContact = async (contactId: string, contactData: any) => {
  try {
    const response = await api.patch(UPDATE_EMERGENCY_CONTACT_URL.replace('{id}',contactId.toString()),contactData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteEmergencyContact = async (contactId: string) => {
  try {
    const response = await api.delete(DELETE_EMERGENCY_CONTACT_URL.replace('{id}',contactId.toString()));
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
