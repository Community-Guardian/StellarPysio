import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLogs } from '@/context/LogsContext';

interface LogEntry {
  id: string;
  timestamp: string;
  log_type: 'INFO' | 'WARNING' | 'ERROR';
  details: string;
}

const LogsScreen = () => {
  const { logs, fetchLogs, loading } = useLogs();
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    (filterLevel === 'ALL' || log.log_type === filterLevel) &&
    (log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
     log.timestamp.includes(searchQuery))
  );

  const renderLogItem = ({ item }: { item: LogEntry }) => (
    <View style={[styles.logItem, styles[`log${item.log_type}`]]}>
      <Text style={styles.logTimestamp}>{item.timestamp}</Text>
      <Text style={styles.logLevel}>{item.log_type}</Text>
      <Text style={styles.logMessage}>{item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Logs</Text>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterLevel}
          onValueChange={(itemValue) => setFilterLevel(itemValue)}
          style={styles.levelPicker}
        >
          <Picker.Item label="All Levels" value="ALL" />
          <Picker.Item label="Info" value="INFO" />
          <Picker.Item label="Warning" value="WARNING" />
          <Picker.Item label="Error" value="ERROR" />
        </Picker>
        <TextInput
          style={styles.searchInput}
          placeholder="Search logs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredLogs}
          renderItem={renderLogItem}
          keyExtractor={item => item.id}
        />
      )}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelPicker: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  logINFO: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  logWARNING: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  logERROR: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
  },
  logTimestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  logLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logMessage: {
    fontSize: 14,
    color: '#333',
  },
});

export default LogsScreen;