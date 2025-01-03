import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { usePayments } from '@/context/PaymentContext';
import { colors } from '@/utils/colors';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
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
const PaymentsScreen: React.FC = () => {
  const { fetchPayments, payments, loading } = usePayments();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(150);

  useEffect(() => {
    fetchPayments(); // Fetch payments on component mount
  }, []);

  
  const applyPromoCode = () => {
    Alert.alert('Success', 'Promo code applied successfully. You get 10% off on your next payment!');
    setPromoCode('');
  };

  const renderPaymentHistoryItem = ({ item }: { item: Payment }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
        <Text style={styles.historyService}>{item.service.name}</Text>
      </View>
      <View>
        <Text style={styles.historyAmount}>KES {item.amount}</Text>
        <Text style={styles.historyAmount}>{item.payment_status}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.pendingChargesSection}>
          <Text style={styles.sectionTitle}>Pending Charges</Text>
          {payments.filter((payment) => payment.payment_status === 'pending').map((charge) => (
            <View key={charge.id} style={styles.chargeItem}>
              <View>
                <Text style={styles.chargeDate}>{new Date(charge.created_at).toLocaleDateString()}</Text>
                <Text style={styles.chargeDescription}>{charge.service.name}</Text>
              </View>
              <View style={styles.chargeAmountContainer}>
                <Text style={styles.chargeAmount}>KES {charge.amount}</Text>
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => {
                    router.push(`/(tabs)/(finances)/pay_now?serviceId=${charge.service_id}`);
                  }}
                >
                  <Text style={styles.payNowButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.loyaltySection}>
          <Text style={styles.sectionTitle}>Loyalty Points</Text>
          <Text style={styles.loyaltyPoints}>{loyaltyPoints} points</Text>
          <Text style={styles.loyaltyInfo}>Earn 1 point for every 10 KES spent</Text>
        </View>

        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoInputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.promoButton} onPress={applyPromoCode}>
              <Text style={styles.promoButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          {payments.length > 0 ? (
            <FlatList
              data={payments}
              renderItem={renderPaymentHistoryItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noHistoryText}>No payment history available</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  mpesaSection: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  payButton: {
    marginTop: 12,
  },
  pendingChargesSection: {
    marginBottom: 24,
  },
  chargeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  chargeDate: {
    fontSize: 14,
    color: colors.lightText,
  },
  chargeDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  chargeAmountContainer: {
    alignItems: 'flex-end',
  },
  chargeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  payNowButton: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  payNowButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  loyaltySection: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  loyaltyPoints: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  loyaltyInfo: {
    fontSize: 14,
    color: colors.white,
  },
  promoSection: {
    marginBottom: 24,
  },
  promoInputContainer: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  promoButton: {
    backgroundColor: colors.secondary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  historySection: {
    flex: 1,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    color: colors.lightText,
  },
  historyService: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  noHistoryText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentsScreen;
