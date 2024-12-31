import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import Button from '@/components/Button';

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  service: string;
}

interface FavoriteNumber {
  id: string;
  name: string;
  number: string;
}

interface PendingCharge {
  id: string;
  date: string;
  description: string;
  amount: number;
}

const PaymentsScreen: React.FC = () => {
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(150);

  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([
    { id: '1', date: '2023-05-01', amount: 2500, service: 'Manual Therapy' },
    { id: '2', date: '2023-04-15', amount: 3000, service: 'Sports Therapy' },
    { id: '3', date: '2023-03-28', amount: 2000, service: 'Rehabilitation' },
  ]);

  const [favoriteNumbers, setFavoriteNumbers] = useState<FavoriteNumber[]>([
    { id: '1', name: 'Personal', number: '0712345678' },
    { id: '2', name: 'Work', number: '0723456789' },
  ]);

  const [pendingCharges, setPendingCharges] = useState<PendingCharge[]>([
    { id: '1', date: '2023-05-10', description: 'Consultation Fee', amount: 1500 },
    { id: '2', date: '2023-05-12', description: 'X-Ray Test', amount: 3000 },
  ]);

  const handlePayment = () => {
    if (!mpesaNumber || !amount) {
      Alert.alert('Error', 'Please enter both M-Pesa number and amount');
      return;
    }

    // Simulate payment processing
    Alert.alert(
      'Payment Confirmation',
      `Confirm payment of KES ${amount} to StellarPhysio using M-Pesa number ${mpesaNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            // Simulate successful payment
            Alert.alert('Success', 'Payment processed successfully');
            // Add to payment history
            const newPayment: PaymentHistory = {
              id: (paymentHistory.length + 1).toString(),
              date: new Date().toISOString().split('T')[0],
              amount: parseFloat(amount),
              service: 'Recent Service',
            };
            setPaymentHistory([newPayment, ...paymentHistory]);
            // Update loyalty points (1 point per 10 KES spent)
            setLoyaltyPoints(prevPoints => prevPoints + Math.floor(parseFloat(amount) / 10));
            // Clear inputs
            setMpesaNumber('');
            setAmount('');
            Keyboard.dismiss();
          }
        }
      ]
    );
  };

  const applyPromoCode = () => {
    // Simulate promo code application
    Alert.alert('Success', 'Promo code applied successfully. You get 10% off on your next payment!');
    setPromoCode('');
  };

  const renderPaymentHistoryItem = ({ item }: { item: PaymentHistory }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyDate}>{item.date}</Text>
        <Text style={styles.historyService}>{item.service}</Text>
      </View>
      <Text style={styles.historyAmount}>KES {item.amount}</Text>
    </View>
  );

  const renderFavoriteNumber = ({ item }: { item: FavoriteNumber }) => (
    <TouchableOpacity 
      style={styles.favoriteItem} 
      onPress={() => setMpesaNumber(item.number)}
    >
      <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteNumber}>{item.number}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView style={styles.scrollContent}>
        <View style={styles.mpesaSection}>
          <Text style={styles.sectionTitle}>Pay with M-Pesa</Text>
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
          <Button title="Pay Now" onPress={handlePayment} style={styles.payButton} />
        </View>
  
        <View style={styles.pendingChargesSection}>
          <Text style={styles.sectionTitle}>Pending Charges</Text>
          {pendingCharges.map((charge) => (
            <View key={charge.id} style={styles.chargeItem}>
              <View>
                <Text style={styles.chargeDate}>{charge.date}</Text>
                <Text style={styles.chargeDescription}>{charge.description}</Text>
              </View>
              <View style={styles.chargeAmountContainer}>
                <Text style={styles.chargeAmount}>KES {charge.amount}</Text>
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => {
                    setMpesaNumber('');
                    setAmount(charge.amount.toString());
                  }}
                >
                  <Text style={styles.payNowButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
  
        <View style={styles.favoriteNumbersSection}>
          <Text style={styles.sectionTitle}>Favorite Numbers</Text>
          <FlatList
            data={favoriteNumbers}
            renderItem={renderFavoriteNumber}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
          {paymentHistory.length > 0 ? (
            <FlatList
              data={paymentHistory}
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
  favoriteNumbersSection: {
    marginBottom: 24,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  favoriteInfo: {
    marginLeft: 12,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  favoriteNumber: {
    fontSize: 14,
    color: colors.lightText,
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
  noHistoryText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
});
