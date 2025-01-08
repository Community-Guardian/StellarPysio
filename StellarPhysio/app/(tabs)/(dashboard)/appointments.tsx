import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppointments } from '@/context/AppointmentContext'; // Ensure proper import path

interface Service {
  id: number;
  name: string;
  serviceType: string; 
  price: string;
  description: string;
  isActive: boolean;
}

// Define the appointment object structure
interface Appointment {
  id: number;
  status: string;
  date_time: string; // ISO format
  duration: number; // in minutes
  end_time: string; // ISO format
  reason: string;
  patient: string; // UUID
  provider: string | null;
  service: Service;
  service_id: string;
}

const AppointmentsScreen: React.FC = () => {
  const router = useRouter();
  const { appointments, loading, fetchAppointments, removeAppointment } = useAppointments();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => removeAppointment(id) },
      ]
    );
  };

  const handleRescheduleAppointment = (id: string) => {
    router.push(`/RescheduleAppointmentScreen?id=${id}`);
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{new Date(item.date_time).toDateString()}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.time}>{new Date(item.date_time).toLocaleTimeString()}</Text>
      <Text style={styles.service}>{item.service.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.rescheduleButton}
          onPress={() => handleRescheduleAppointment(item.id.toString())}
        >
          <Ionicons name="calendar-outline" size={20} color="#3b82f6" />
          <Text style={styles.rescheduleText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelAppointment(item.id.toString())}
        >
          <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No appointments available</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/book_appointment')}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#6b7280',
  },
  time: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  service: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rescheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#3b82f6',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  rescheduleText: {
    marginLeft: 8,
    color: '#3b82f6',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelText: {
    marginLeft: 8,
    color: '#ef4444',
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default AppointmentsScreen;