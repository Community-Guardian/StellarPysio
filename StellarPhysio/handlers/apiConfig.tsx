// Base URL configurations
const BASE_URL = 'https://stellarphysio.pythonanywhere.com'; // Update this as per your environment
// const BASE_URL = 'http://192.168.0.105:80'; // Update this as per your environment
// const BASE_URL = 'http://127.0.0.1:8000'; // Update this as per your environment

// User endpoints
export const GET_INDIVIDUAL_URL = `${BASE_URL}/Patients/pk`;
export const UPDATE_INDIVIDUAL_URL = `${BASE_URL}/Patients/pk/`;
export const SIGN_UP_URL = `${BASE_URL}/register/`;
export const REFRESH_TOKEN = `${BASE_URL}/token/refresh/`;
export const LOGIN_URL_URL = `${BASE_URL}/login/`;
export const LOGOUT_URL = `${BASE_URL}/logout/`;
export const GET_USER_URL = `${BASE_URL}/users/pk/`;
export const CREATE_EMERGENCY_CONTACT_URL = `${BASE_URL}/emergency-contacts/`;
export const GET_EMERGENCY_CONTACT_URL = `${BASE_URL}/emergency-contacts/`;
export const UPDATE_EMERGENCY_CONTACT_URL = `${BASE_URL}/emergency-contacts/{id}/`;
export const DELETE_EMERGENCY_CONTACT_URL = `${BASE_URL}/emergency-contacts/{id}/`;

//  endpoints for Payment Service
export const CREATE_MPESA_PAYMENT_INTENT_URL = `${BASE_URL}/mpesa/create/`;
export const MPESA_CALLBACK_URL = `${BASE_URL}/callback/`;
export const REFUND_PAYMENT_URL = `${BASE_URL}/refund/`;
export const PAYMENTS_URL = `${BASE_URL}/payments/`;

//  endpoints for Appointment Service
export const APPOINTMENTS_URL = `${BASE_URL}/appointments/`;

//  endpoints for Service management
export const SERVICES_URL = `${BASE_URL}/services/`;

// Exporting BASE_URL for external use
export { BASE_URL };
