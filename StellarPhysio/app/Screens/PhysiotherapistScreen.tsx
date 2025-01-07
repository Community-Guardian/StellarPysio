import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Button from '../../components/Button';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

const PhysiotherapistScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', patientName: 'John Doe', date: '2023-05-15', time: '10:00 AM', status: 'scheduled' },
    { id: '2', patientName: 'Jane Smith', date: '2023-05-15', time: '11:30 AM', status: 'scheduled' },
    { id: '3', patientName: 'Bob Johnson', date: '2023-05-15', time: '2:00 PM', status: 'scheduled' },
  ]);

  const handleStartSession = (id: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'in-progress' } : appointment
      )
    );
  };

  const handleCompleteSession = (id: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'completed' } : appointment
      )
    );
  };

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text style={styles.appointmentDetails}>{`${item.date} at ${item.time}`}</Text>
      <Text style={styles.status}>{item.status}</Text>
      <View style={styles.actionButtons}>
        {item.status === 'scheduled' && (
          <Button
            title="Start Session"
            onPress={() => handleStartSession(item.id)}
            style={styles.startButton}
          />
        )}
        {item.status === 'in-progress' && (
          <Button
            title="Complete Session"
            onPress={() => handleCompleteSession(item.id)}
            style={styles.completeButton}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Physiotherapist Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search appointments..."
      />
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
      />
      <Button
        title="View Patient Records"
        onPress={() => {/* Navigate to Patient Records screen */}}
        style={styles.viewRecordsButton}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  appointmentItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appointmentDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  completeButton: {
    backgroundColor: '#FFC107',
  },
  viewRecordsButton: {
    marginTop: 20,
  },
});

export default PhysiotherapistScreen;

