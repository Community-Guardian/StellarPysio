import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button';
import { colors } from '@/utils/colors';
import { useRoute ,RouteProp } from '@react-navigation/native'; // Import route hook
type RouteParams = {
  selectedService?: { name: string; description: string };
};
const BookAppointmentScreen: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const route = useRoute<RouteProp<{ params: RouteParams }>>(); // Type-safe usage
  const { selectedService } = route.params || {}; // Retrieve the passed parameter
  const [service, setService] = useState(selectedService?.name || ''); // Use selectedService as default
  const handleConfirmAppointment = () => {
    console.log('Appointment confirmed');
    console.log({ service, date, time, notes });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Service Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={service}
              onValueChange={(itemValue) => setService(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a service" value="" />
              <Picker.Item label="Manual Therapy" value="Manual Therapy" />
              <Picker.Item label="Sports Therapy" value="Sports Therapy" />
              <Picker.Item label="Rehabilitation" value="Rehabilitation" />
            </Picker>
          </View>
        </View>

        {/* Date Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <Text
            style={styles.datePickerText}
            onPress={() => setShowDatePicker(true)}
          >
            {date.toDateString()}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
            />
          )}
        </View>

        {/* Time Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time</Text>
          <Text
            style={styles.datePickerText}
            onPress={() => setShowTimePicker(true)}
          >
            {time.toLocaleTimeString()}
          </Text>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
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
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  textArea: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerText: {
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default BookAppointmentScreen;
