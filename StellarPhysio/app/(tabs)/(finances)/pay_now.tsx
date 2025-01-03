import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { usePayments } from '@/context/PaymentContext';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PayNowScreen: React.FC = () => {
  const { createPaymentIntent, loading } = usePayments();
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  const router = useRouter();

  const handlePayment = async () => {
    if (!mpesaNumber || !amount) {
      Alert.alert('Error', 'Please enter both M-Pesa number and amount');
      return;
    }

    try {
      await createPaymentIntent(mpesaNumber, amount);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Pay Now</Text>

        {renderPaymentStatus()}

        <View style={styles.inputContainer}>
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

        <Button
          title="Pay Now"
          onPress={handlePayment}
          disabled={loading || !mpesaNumber || !amount}
          style={styles.button}
        />

        <Button
          title="Back to Payments"
          onPress={() => router.back()}
          variant="outline"
          style={styles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
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
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
  },
};

export default PayNowScreen;
