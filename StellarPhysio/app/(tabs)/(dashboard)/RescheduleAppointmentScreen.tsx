import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Button from '@/components/Button'; // Ensure the correct import path
import { useAppointments } from '@/context/AppointmentContext'; // Ensure proper import path

const RescheduleAppointmentScreen: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the appointment ID from the query params
  const { updateAppointment } = useAppointments();


  const handleReschedule = async () => {
    const selectedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    ).toISOString();

    try {
      await updateAppointment(id as string, {
        date_time: selectedDateTime,
      });
      Alert.alert('Success', 'Appointment rescheduled successfully!');
      router.push('/appointments'); // Navigate back to the appointments list
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      Alert.alert('Error', 'Failed to reschedule the appointment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reschedule Appointment</Text>

      {/* Date Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>New Date</Text>
        <Text style={styles.datePickerText} onPress={() => setShowDatePicker(true)}>
          {date.toDateString()}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </View>

      {/* Time Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>New Time</Text>
        <Text style={styles.datePickerText} onPress={() => setShowTimePicker(true)}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}
      </View>

      {/* Reschedule Button */}
      <Button title="Reschedule Appointment" onPress={handleReschedule} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  datePickerText: {
    fontSize: 16,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
  },
});

export default RescheduleAppointmentScreen;
