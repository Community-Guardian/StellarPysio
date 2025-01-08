// StellarPhysio/app/(admin)/(reports)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/Button';
import { useLogs } from '@/context/LogsContext';

const ReportsScreen = () => {
  const { logs, fetchLogs, loading } = useLogs();
  const [selectedReport, setSelectedReport] = useState('info');
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

  const generateReport = () => {
    const reportData = filteredLogs.filter(log => log.log_type === selectedReport.toUpperCase());
    if (reportData.length === 0) {
      Alert.alert('No Data', 'No logs found for the selected report type and time frame.');
    } else {
      setFilteredLogs(reportData);
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

          <Picker.Item label="Information" value="INFO" />
          <Picker.Item label="Warnings" value="WARNING" />
          <Picker.Item label="Errors" value="ERROR" />
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
      <View style={styles.reportContainer}>
        <Text style={styles.reportTitle}>Report Data</Text>
        {filteredLogs.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Timestamp</Text>
              <Text style={styles.tableHeader}>Level</Text>
              <Text style={styles.tableHeader}>Message</Text>
            </View>
            {filteredLogs.map((log, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{log.timestamp}</Text>
                <Text style={styles.tableCell}>{log.log_type}</Text>
                <Text style={styles.tableCell}>{log.details}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No data available for the selected criteria.</Text>
        )}
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
  reportContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReportsScreen;