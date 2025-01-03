import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  createMpesaPaymentIntent,
  mpesaCallback,
  refundPayment,
  getPayments as fetchPaymentsHandler, // Add fetch payments handler
} from '@/handlers/paymentManager'; // Adjust the import path as needed

// Define the shape of PaymentContext
interface Payment {
  id: string;
  service_id: number;
  service: {
    id: number;
    name: string;
    service_type: {
      id: number;
      name: string;
    };
    price: string;
    description: string;
    is_active: boolean;
  };
  service_type: string;
  payment_method: string;
  result_code: string;
  result_desc: string;
  payment_status: string;
  amount: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
  user: string;
}

interface PaymentContextData {
  createPaymentIntent: (serviceId: string, phoneNumber: string) => Promise<void>;
  handleCallback: (callbackData: any) => Promise<void>;
  processRefund: (paymentId: string, refundAmount: number, phoneNumber: string) => Promise<void>;
  fetchPayments: () => Promise<Payment[]>; // New function for fetching payments
  payments: Payment[]; // Holds fetched payments
  loading: boolean;
}

// Props for the PaymentProvider
interface PaymentProviderProps {
  children: ReactNode;
}

// Default context values
const PaymentContext = createContext<PaymentContextData>({
  createPaymentIntent: async () => {},
  handleCallback: async () => {},
  processRefund: async () => {},
  fetchPayments: async () => [],
  payments: [],
  loading: false,
});

// PaymentProvider component
export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Create Mpesa payment intent
  const createPaymentIntent = async (serviceId: string, phoneNumber: string) => {
    try {
      setLoading(true);
      await createMpesaPaymentIntent(serviceId, phoneNumber);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle Mpesa callback
  const handleCallback = async (callbackData: any) => {
    try {
      setLoading(true);
      await mpesaCallback(callbackData);
    } catch (error) {
      console.error('Error handling callback:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Process payment refund
  const processRefund = async (paymentId: string, refundAmount: number, phoneNumber: string) => {
    try {
      setLoading(true);
      await refundPayment(paymentId, refundAmount, phoneNumber);
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const fetchedPayments = await fetchPaymentsHandler(); // Call fetch payments handler
      setPayments(fetchedPayments);
      return fetchedPayments;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        createPaymentIntent,
        handleCallback,
        processRefund,
        fetchPayments,
        payments,
        loading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

// Hook to use PaymentContext
export const usePayments = () => useContext(PaymentContext);
