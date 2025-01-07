import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/Button';

const ReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState('userActivity');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('lastWeek');

  const generateReport = () => {
    // Implement logic to generate the selected report
    console.log(`Generating ${selectedReport} report for ${selectedTimeFrame}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Report Type:</Text>
        <Picker
          selectedValue={selectedReport}
          onValueChange={(itemValue) => setSelectedReport(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="User Activity" value="userActivity" />
          <Picker.Item label="Appointment Statistics" value="appointmentStats" />
          <Picker.Item label="Financial Summary" value="financialSummary" />
          <Picker.Item label="Patient Progress" value="patientProgress" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Time Frame:</Text>
        <Picker
          selectedValue={selectedTimeFrame}
          onValueChange={(itemValue) => setSelectedTimeFrame(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Last Week" value="lastWeek" />
          <Picker.Item label="Last Month" value="lastMonth" />
          <Picker.Item label="Last Quarter" value="lastQuarter" />
          <Picker.Item label="Last Year" value="lastYear" />
        </Picker>
      </View>
      <Button
        title="Generate Report"
        onPress={generateReport}
        style={styles.generateButton}
      />
      <View style={styles.reportPreview}>
        <Text style={styles.previewTitle}>Report Preview</Text>
        <Text style={styles.previewContent}>
          Report data will be displayed here after generation.
        </Text>
      </View>
    </ScrollView>
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  picker: {
    height: 50,
  },
  generateButton: {
    backgroundColor: '#4A90E2',
    marginBottom: 20,
  },
  reportPreview: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  previewContent: {
    fontSize: 14,
    color: '#666',
  },
});

export default ReportsScreen;

