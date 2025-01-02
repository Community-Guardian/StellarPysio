import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from '@/handlers/servicesManager'; // Services manager API functions

// Define the shape of ServicesContext
interface ServicesContextData {
  services: any[];
  loading: boolean;
  addService: (serviceData: any) => Promise<void>;
  updateService: (serviceId: string, updatedData: any) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
  fetchServices: () => Promise<void>;
}

// Props for the ServicesProvider
interface ServicesProviderProps {
  children: ReactNode;
}

// Default context values
const ServicesContext = createContext<ServicesContextData>({
  services: [],
  loading: false,
  addService: async () => {},
  updateService: async () => {},
  deleteService: async () => {},
  fetchServices: async () => {},
});

// ServicesProvider component
export const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }) => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      setServices(response);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: any) => {
    try {
      setLoading(true);
      await createService(serviceData);
      await fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateServiceDetails = async (serviceId: string, updatedData: any) => {
    try {
      setLoading(true);
      await updateService(serviceId, updatedData);
      await fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeService = async (serviceId: string) => {
    try {
      setLoading(true);
      await deleteService(serviceId);
      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loading, addService, updateService: updateServiceDetails, deleteService: removeService, fetchServices }}>
      {children}
    </ServicesContext.Provider>
  );
};

// Hook to use ServicesContext
export const useServices = () => useContext(ServicesContext);
