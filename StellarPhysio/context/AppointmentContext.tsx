import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '@/handlers/appointmentManager'; // Adjust the import path as needed

// Define the shape of AppointmentContext
interface AppointmentContextData {
  appointments: any[];
  loading: boolean;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointmentData: any) => Promise<void>;
  updateAppointment: (appointmentId: string, updatedData: any) => Promise<void>;
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
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch appointments from the server
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new appointment
  const addAppointment = async (appointmentData: any) => {
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
  const updateAppointmentDetails = async (appointmentId: string, updatedData: any) => {
    try {
      setLoading(true);
      await updateAppointment(appointmentId, updatedData);
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
    fetchAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointments, loading, fetchAppointments, addAppointment, updateAppointment: updateAppointmentDetails, removeAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook to use AppointmentContext
export const useAppointments = () => useContext(AppointmentContext);
