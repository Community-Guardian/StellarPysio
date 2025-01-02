import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

const AppointmentsScreen: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', date: '2023-05-15', time: '10:00 AM', service: 'Manual Therapy', status: 'upcoming' },
    { id: '2', date: '2023-05-18', time: '2:00 PM', service: 'Sports Therapy', status: 'upcoming' },
    { id: '3', date: '2023-05-10', time: '11:30 AM', service: 'Rehabilitation', status: 'past' },
    { id: '4', date: '2023-05-05', time: '3:00 PM', service: 'Massage Therapy', status: 'cancelled' },
  ]);

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => {
          setAppointments(appointments.map(app => 
            app.id === id ? { ...app, status: 'cancelled' } : app
          ));
        }},
      ]
    );
  };

  const handleRescheduleAppointment = (id: string) => {
    Alert.alert('Reschedule', 'Feature coming soon!');
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <Text
          style={[
            styles.status,
            item.status === 'upcoming'
              ? styles.upcoming
              : item.status === 'past'
              ? styles.past
              : styles.cancelled,
          ]}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.service}>{item.service}</Text>
      {item.status === 'upcoming' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() => handleRescheduleAppointment(item.id)}
          >
            <Ionicons name="calendar-outline" size={20} color="#3b82f6" />
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelAppointment(item.id)}
          >
            <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
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
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  upcoming: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
  },
  past: {
    backgroundColor: '#6b7280',
    color: '#ffffff',
  },
  cancelled: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
