import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Button from '../../components/Button';

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  service: string;
}

const SchedulingScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', date: '2023-05-20', time: '10:00 AM', patientName: 'John Doe', service: 'Physiotherapy' },
    { id: '2', date: '2023-05-20', time: '2:00 PM', patientName: 'Jane Smith', service: 'Nutrition Consultation' },
    { id: '3', date: '2023-05-21', time: '11:00 AM', patientName: 'Bob Johnson', service: 'Wellness Coaching' },
  ]);

  const filteredAppointments = appointments.filter(appointment => appointment.date === selectedDate);

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentTime}>{item.time}</Text>
      <Text style={styles.appointmentPatient}>{item.patientName}</Text>
      <Text style={styles.appointmentService}>{item.service}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scheduling</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#4A90E2' }
        }}
      />
      <Text style={styles.subtitle}>Appointments for {selectedDate}</Text>
      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No appointments for this date.</Text>}
      />
      <Button
        title="Add New Appointment"
        onPress={() => {/* Implement add new appointment logic */}}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  appointmentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  appointmentPatient: {
    fontSize: 16,
    color: '#333',
  },
  appointmentService: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});

export default SchedulingScreen;

