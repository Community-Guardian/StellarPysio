import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button';

const BookAppointmentScreen: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');

  const handleConfirmAppointment = () => {
    // Implement appointment booking logic here
    console.log('Appointment confirmed');
  };

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <Text className="text-2xl font-bold text-text mb-6">Book Appointment</Text>
      <View className="space-y-4 mb-6">
        <View>
          <Text className="text-sm text-lightText mb-1">Service Type</Text>
          <View className="bg-white rounded-lg">
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
        <View>
          <Text className="text-sm text-lightText mb-1">Date</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setDate(selectedDate || date)}
          />
        </View>
        <View>
          <Text className="text-sm text-lightText mb-1">Time</Text>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => setTime(selectedTime || time)}
          />
        </View>
        <View>
          <Text className="text-sm text-lightText mb-1">Additional Notes</Text>
          <TextInput
            className="bg-white p-3 rounded-lg text-base"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special requests or information"
          />
        </View>
      </View>
      <Button
        title="Confirm Appointment"
        onPress={handleConfirmAppointment}
      />
    </ScrollView>
  );
};

export default BookAppointmentScreen;

