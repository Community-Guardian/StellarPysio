import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button';

const BookAppointmentScreen: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');

  const handleConfirmAppointment = () => {
    if (!service || !date || !time) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    // Implement appointment booking logic here
    console.log('Appointment confirmed:', { service, date, time, notes });
    Alert.alert('Success', 'Your appointment has been booked.');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 16 }}>
        Book Appointment
      </Text>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Service Type</Text>
        <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
          <Picker
            selectedValue={service}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Picker.Item label="Select a service" value="" />
            <Picker.Item label="Manual Therapy" value="manual_therapy" />
            <Picker.Item label="Sports Therapy" value="sports_therapy" />
            <Picker.Item label="Rehabilitation" value="rehabilitation" />
          </Picker>
        </View>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Date</Text>
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Time</Text>
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => setTime(selectedTime || time)}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Additional Notes</Text>
        <TextInput
          style={{
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
            textAlignVertical: 'top',
            minHeight: 80,
          }}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any special requests or information"
        />
      </View>
      <Button
        title="Confirm Appointment"
        onPress={handleConfirmAppointment}
      />
    </ScrollView>
  );
};

export default BookAppointmentScreen;
