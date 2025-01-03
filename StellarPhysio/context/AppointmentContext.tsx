import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  getAppointments,
  createAppointment,
  updateAppointments,
  deleteAppointment,
} from '@/handlers/appointmentManager'; // Adjust the import path as needed
import { Alert } from 'react-native';
import { AuthProvider, useAuth } from './AuthContext';
// Define the shape of ServicesContext
interface Service {
  id: number;
  name: string;
  serviceType: string; // Flattened from "service_type.name"
  price: string;
  description: string;
  isActive: boolean;
}
// Define the appointment object structure
interface Appointment {
  id: number;
  status: string;
  date_time: string; // ISO format
  duration: number; // in minutes
  end_time: string; // ISO format
  reason: string;
  patient: string; // UUID
  provider: string | null;
  service: Service;
  service_id: string;
}
// Define the shape of AppointmentContext
interface AppointmentContextData {
  appointments: Appointment[];
  loading: boolean;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointmentData: Partial<Appointment>) => Promise<void>;
  updateAppointment: (appointmentId: string, updatedData: Partial<Appointment>) => Promise<void>;
  removeAppointment: (appointmentId: string) => Promise<void>;
}

// Props for the AppointmentProvider
interface AppointmentProviderProps {
  children: ReactNode;
}

// Default context values
const AppointmentContext = createContext<AppointmentContextData>({
  appointments: [],
  loading: false,
  fetchAppointments: async () => {},
  addAppointment: async () => {},
  updateAppointment: async () => {},
  removeAppointment: async () => {},
});

// AppointmentProvider component
export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {isAuthenticated }= useAuth()
  // Fetch appointments from the server
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data); // Assuming data matches the Appointment[] structure
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new appointment
  const addAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      setLoading(true);
      await createAppointment(appointmentData);
      await fetchAppointments(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing appointment
  const updateAppointment = async (appointmentId: string, updatedData: Partial<Appointment>) => {
    try {
      setLoading(true);
      await updateAppointments(appointmentId, updatedData);
      await fetchAppointments(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove an appointment
  const removeAppointment = async (appointmentId: string) => {
    try {
      setLoading(true);
      await deleteAppointment(appointmentId);
      await fetchAppointments(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments on mount
  useEffect(() => {
    if(isAuthenticated){
      fetchAppointments();
    }
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        fetchAppointments,
        addAppointment,
        updateAppointment,
        removeAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook to use AppointmentContext
export const useAppointments = () => useContext(AppointmentContext);
