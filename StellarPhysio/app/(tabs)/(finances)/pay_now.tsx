import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, FlatList } from 'react-native';
import { usePayments } from '@/context/PaymentContext';
import { useServices } from '@/context/ServicesContext';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Service {
  id: number;
  name: string;
  serviceType: string; // Flattened from "service_type.name"
  price: string;
  description: string;
  isActive: boolean;
}

const PayNowScreen: React.FC = () => {
  const { createPaymentIntent, loading } = usePayments();
  const { services, fetchServices } = useServices();
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null); // service structure
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  const router = useRouter();
  const { serviceId } = useLocalSearchParams(); // Assuming serviceId is passed as query param

  useEffect(() => {
    fetchServices(); // Fetch services on mount
  }, [fetchServices]);

  useEffect(() => {
    if (serviceId) {
      const service = services.find((s) => s.id === parseInt(serviceId as string));
      setSelectedService(service || null);
      setAmount(service?.price || '0');
    }
  }, [serviceId, services]);

  const handlePayment = async () => {
    if (!selectedService || !mpesaNumber || !amount) {
      Alert.alert('Error', 'Please select a service, and enter M-Pesa number and amount.');
      return;
    }

    try {
      await createPaymentIntent(selectedService.id.toString(), mpesaNumber);
      setPaymentStatus('success');
      setMpesaNumber('');
      setAmount('');
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('failure');
    }
  };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.successText}>Payment processed successfully!</Text>
          </View>
        );
      case 'failure':
        return (
          <View style={styles.failureContainer}>
            <Ionicons name="close-circle" size={24} color="white" />
            <Text style={styles.failureText}>Payment failed. Please try again.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedService ? [selectedService] : []} // Only render selected service if available
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.selectedService}>
            <Text style={styles.selectedServiceText}>Selected Service: {item.name}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.formContainer}>
            {renderPaymentStatus()}
            <TextInput
              style={styles.input}
              placeholder="M-Pesa Number"
              value={mpesaNumber}
              onChangeText={setMpesaNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (KES)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
        }
        ListFooterComponent={
          <View style={styles.buttonsContainer}>
            <Button
              title="Pay Now"
              onPress={handlePayment}
              disabled={loading || !mpesaNumber || !amount || !selectedService}
              style={styles.button}
            />
            <Button
              title="Back to Payments"
              onPress={() => router.back()}
              variant="outline"
              style={styles.button}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  selectedService: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedServiceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  successContainer: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  failureContainer: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  failureText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonsContainer: {
    paddingHorizontal: 16,
  },
  button: {
    marginBottom: 16,
  },
};

export default PayNowScreen;
