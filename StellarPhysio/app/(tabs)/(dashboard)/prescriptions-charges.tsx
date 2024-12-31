import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import Button from '@/components/Button';

interface Prescription {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  instructions: string;
  refillDate: string;
}

interface Charge {
  id: string;
  date: string;
  description: string;
  amount: number;
  isPaid: boolean;
}

const PrescriptionsChargesScreen: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      date: '2023-05-10',
      medication: 'Ibuprofen',
      dosage: '400mg',
      instructions: 'Take 1 tablet every 6 hours as needed for pain',
      refillDate: '2023-06-10',
    },
    {
      id: '2',
      date: '2023-05-12',
      medication: 'Amoxicillin',
      dosage: '500mg',
      instructions: 'Take 1 capsule every 8 hours for 7 days',
      refillDate: '2023-05-19',
    },
  ]);

  const [charges, setCharges] = useState<Charge[]>([
    { id: '1', date: '2023-05-10', description: 'Consultation Fee', amount: 1500, isPaid: false },
    { id: '2', date: '2023-05-12', description: 'X-Ray Test', amount: 3000, isPaid: false },
    { id: '3', date: '2023-05-05', description: 'Physical Therapy Session', amount: 2000, isPaid: true },
  ]);

  const renderPrescriptionItem = ({ item }: { item: Prescription }) => (
    <View style={styles.prescriptionItem}>
      <View style={styles.prescriptionHeader}>
        <Text style={styles.prescriptionDate}>{item.date}</Text>
        <TouchableOpacity 
          style={styles.refillButton}
          onPress={() => Alert.alert('Refill Request', 'Your refill request has been sent to the doctor.')}
        >
          <Text style={styles.refillButtonText}>Request Refill</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.prescriptionMedication}>{item.medication} - {item.dosage}</Text>
      <Text style={styles.prescriptionInstructions}>{item.instructions}</Text>
      <Text style={styles.prescriptionRefill}>Refill Date: {item.refillDate}</Text>
    </View>
  );

  const renderChargeItem = ({ item }: { item: Charge }) => (
    <View style={styles.chargeItem}>
      <View>
        <Text style={styles.chargeDate}>{item.date}</Text>
        <Text style={styles.chargeDescription}>{item.description}</Text>
      </View>
      <View style={styles.chargeAmountContainer}>
        <Text style={styles.chargeAmount}>KES {item.amount}</Text>
        {!item.isPaid && (
          <TouchableOpacity 
            style={styles.payNowButton}
            onPress={() => Alert.alert('Pay Now', 'Redirecting to payment screen...')
                

            }
          >
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
        {item.isPaid && (
          <View style={styles.paidBadge}>
            <Text style={styles.paidBadgeText}>Paid</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prescriptions</Text>
        <FlatList
          data={prescriptions}
          renderItem={renderPrescriptionItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Charges</Text>
        <FlatList
          data={charges}
          renderItem={renderChargeItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  prescriptionItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  prescriptionDate: {
    fontSize: 14,
    color: colors.lightText,
  },
  refillButton: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  refillButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  prescriptionMedication: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  prescriptionInstructions: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  prescriptionRefill: {
    fontSize: 14,
    color: colors.lightText,
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
  paidBadge: {
    backgroundColor: colors.success,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  paidBadgeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default PrescriptionsChargesScreen;

