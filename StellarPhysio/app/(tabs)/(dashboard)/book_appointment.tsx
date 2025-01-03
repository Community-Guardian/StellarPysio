import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button'; // Ensure correct path
import { useAppointments } from '@/context/AppointmentContext';
import { useServices } from '@/context/ServicesContext';
import { router, useLocalSearchParams } from 'expo-router';

interface Service {
  id: number;
  name: string;
  serviceType: string; // Flattened from "service_type.name"
  price: string;
  description: string;
  isActive: boolean;
}

interface Appointment {
  date_time: string; // ISO format
  reason: string;
  service_id: string;
}

const BookAppointmentScreen: React.FC = () => {
  const { selectedService } = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [service, setService] = useState(selectedService || ''); // Use the selectedService as default value
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { addAppointment } = useAppointments();
  const { services } = useServices(); // Fetch services from context

  const handleConfirmAppointment = async () => {
    if (!service) {
      Alert.alert('Validation Error', 'Please select a service.');
      return;
    }

    try {
      // Combine date and time properly
      const combinedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      );

      if (isNaN(combinedDate.getTime())) {
        throw new Error('Invalid date or time value');
      }

      const newAppointment: Appointment = {
        date_time: combinedDate.toISOString(),
        reason: notes,
        service_id: service,
      };

      await addAppointment(newAppointment);
      Alert.alert('Success', 'Appointment booked successfully!');
      router.back();
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formContainer}>
        {/* Service Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Type</Text>
          <Picker
            selectedValue={service}
            onValueChange={(itemValue) => setService(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a service" value="" />
            {services.map((service) => (
              <Picker.Item key={service.id} label={service.name} value={service.id.toString()} />
            ))}
          </Picker>
        </View>

        {/* Date Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
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
          <Text style={styles.label}>Time</Text>
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

        {/* Notes Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special requests or information"
          />
        </View>
      </View>

      {/* Confirm Button */}
      <Button title="Confirm Appointment" onPress={handleConfirmAppointment} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#374151',
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
  },
  datePickerText: {
    fontSize: 16,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    color: '#374151',
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    color: '#374151',
  },
});

export default BookAppointmentScreen;
