import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

const AppointmentsScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', date: '2023-05-15', time: '10:00 AM', service: 'Manual Therapy', status: 'upcoming' },
    { id: '2', date: '2023-05-18', time: '2:00 PM', service: 'Sports Therapy', status: 'upcoming' },
    { id: '3', date: '2023-05-10', time: '11:30 AM', service: 'Rehabilitation', status: 'past' },
    { id: '4', date: '2023-05-05', time: '3:00 PM', service: 'Massage Therapy', status: 'cancelled' },
  ]);

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => {
          setAppointments(appointments.map(app => 
            app.id === id ? { ...app, status: 'cancelled' } : app
          ));
        }}
      ]
    );
  };

  const handleRescheduleAppointment = (id: string) => {
    // In a real app, this would open a date/time picker
    Alert.alert("Reschedule", "Feature coming soon!");
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentItem}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentDate}>{item.date}</Text>
        <Text style={[styles.appointmentStatus, 
          item.status === 'upcoming' ? styles.statusUpcoming :
          item.status === 'past' ? styles.statusPast :
          styles.statusCancelled
        ]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <Text style={styles.appointmentTime}>{item.time}</Text>
      <Text style={styles.appointmentService}>{item.service}</Text>
      {item.status === 'upcoming' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]} 
            onPress={() => handleRescheduleAppointment(item.id)}
          >
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]} 
            onPress={() => handleCancelAppointment(item.id)}
          >
            <Ionicons name="close-circle-outline" size={20} color={colors.error} />
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
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
  appointmentItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  appointmentStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusUpcoming: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  statusPast: {
    backgroundColor: colors.lightText,
    color: colors.white,
  },
  statusCancelled: {
    backgroundColor: colors.error,
    color: colors.white,
  },
  appointmentTime: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 4,
  },
  appointmentService: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  rescheduleButton: {
    borderColor: colors.primary,
  },
  cancelButton: {
    borderColor: colors.error,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: colors.error,
  },
});

export default AppointmentsScreen;
