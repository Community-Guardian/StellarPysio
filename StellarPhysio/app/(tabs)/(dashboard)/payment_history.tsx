import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { usePayments } from '@/context/PaymentContext';
import { useServices } from '@/context/ServicesContext';
import Button from '@/components/Button';

interface Payment {
  id: string;
  service_id: number;
  service: {
    id: number;
    name: string;
    description: string;
    service_type: {
      id: number;
      name: string;
    };
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

const PaymentsScreen: React.FC = () => {
  const { fetchPayments, payments, loading, createPaymentIntent } = usePayments();
  const { services, fetchServices } = useServices();
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchPayments();
    fetchServices();
  }, []);

  const handlePayNow = (serviceId: string) => {
    Alert.prompt(
      "Enter Phone Number",
      "Please enter your M-Pesa phone number",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: (number: string | undefined) => {
            if (number) {
              setPhoneNumber(number);
              createPaymentIntent(serviceId, number)
                .then(() => Alert.alert("Payment Initiated", "Please check your phone for the M-Pesa prompt."))
                .catch((error) => Alert.alert("Error", "Failed to initiate payment. Please try again."));
            }
          }
        }
      ],
      "plain-text"
    );
  };

  const renderPaymentItem = ({ item }: { item: Payment }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <Text style={styles.paymentTitle}>{item.service.name}</Text>
        <Text style={styles.paymentAmount}>KES {item.amount}</Text>
      </View>
      <Text style={styles.paymentDescription}>{item.service.description}</Text>
      <View style={styles.paymentFooter}>
        <Text style={styles.paymentDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
        {item.payment_status === 'incomplete' && item.service.service_type.name === 'Prescriptions' && (
          <TouchableOpacity
            style={styles.payNowButton}
            onPress={() => handlePayNow(item.service.id.toString())}
          >
            <Text style={styles.payNowText}>Pay Now</Text>
          </TouchableOpacity>
        )}
        {item.payment_status === 'paid' && (
          <View style={styles.paidStatus}>
            <Text style={styles.paidText}>Paid</Text>
          </View>
        )}
        {item.payment_status === 'refunded' && (
          <View style={styles.refundedStatus}>
            <Text style={styles.refundedText}>Refunded</Text>
          </View>
        )}
        {item.payment_status === 'pending' && (
          <View style={styles.incompleteStatus}>
            <Text style={styles.incompleteText}>Pending</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading payments...</Text>
        </View>
      ) : (
        <FlatList
          data={payments}
          renderItem={renderPaymentItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No payments found</Text>
            </View>
          }
        />
      )}
      <Button
        title="Refresh Payments"
        onPress={fetchPayments}
        variant="outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentAmount: {
    fontSize: 16,
    color: '#6c757d',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDate: {
    fontSize: 14,
    color: '#6c757d',
  },
  payNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  payNowText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  paidStatus: {
    backgroundColor: '#17a2b8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  paidText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  refundedStatus: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  refundedText: {
    fontSize: 14,
    color: '#212529',
    fontWeight: 'bold',
  },
  incompleteStatus: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  incompleteText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default PaymentsScreen;