import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  createMpesaPaymentIntent,
  mpesaCallback,
  refundPayment,
} from '@/handlers/paymentManager'; // Adjust the import path as needed

// Define the shape of PaymentContext
interface PaymentContextData {
  createPaymentIntent: (serviceId: string, phoneNumber: string) => Promise<void>;
  handleCallback: (callbackData: any) => Promise<void>;
  processRefund: (paymentId: string, refundAmount: number, phoneNumber: string) => Promise<void>;
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
  loading: false,
});

// PaymentProvider component
export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <PaymentContext.Provider value={{ createPaymentIntent, handleCallback, processRefund, loading }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Hook to use PaymentContext
export const usePayments = () => useContext(PaymentContext);
