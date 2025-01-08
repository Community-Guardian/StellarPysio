import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/Button';
import { useLogs } from '@/context/LogsContext';
import { generatePDFReport } from '@/utils/pdfGenerator';

const ReportsScreen = () => {
  const { logs, fetchLogs, loading } = useLogs();
  const [selectedReport, setSelectedReport] = useState('userActivity');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('lastWeek');
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, selectedTimeFrame]);

  const filterLogs = () => {
    const now = new Date();
    let startDate;

    switch (selectedTimeFrame) {
      case 'lastWeek':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'lastMonth':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'lastQuarter':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case 'lastYear':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    const filtered = logs.filter(log => new Date(log.timestamp) >= startDate);
    setFilteredLogs(filtered);
  };

  const generateReport = async () => {
    try {
      const reportData = filteredLogs.filter(log => log.level === selectedReport.toUpperCase());
      await generatePDFReport(reportData, selectedReport, selectedTimeFrame);
      Alert.alert('Report Generated', 'The report has been generated successfully.');
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'Failed to generate the report. Please try again.');
    }
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
          <Picker.Item label="Information" value="Info" />
          <Picker.Item label="Warnings" value="warning" />
          <Picker.Item label="Errors" value="error" />
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