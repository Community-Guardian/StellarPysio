import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Button from '../../components/Button';

interface Client {
  id: string;
  name: string;
  goal: string;
  progress: number;
}

const WellnessCoachScreen = () => {
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'John Doe', goal: 'Stress reduction', progress: 60 },
    { id: '2', name: 'Jane Smith', goal: 'Improve sleep quality', progress: 75 },
    { id: '3', name: 'Bob Johnson', goal: 'Increase energy levels', progress: 40 },
  ]);

  const renderClient = ({ item }: { item: Client }) => (
    <View style={styles.clientItem}>
      <Text style={styles.clientName}>{item.name}</Text>
      <Text style={styles.clientGoal}>{`Goal: ${item.goal}`}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{`Progress: ${item.progress}%`}</Text>
      <View style={styles.actionButtons}>
        <Button
          title="Update Progress"
          onPress={() => {/* Navigate to Update Progress screen */}}
          style={styles.updateButton}
        />
        <Button
          title="Schedule Session"
          onPress={() => {/* Navigate to Schedule Session screen */}}
          style={styles.scheduleButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellness Coach Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search clients..."
      />
      <FlatList
        data={clients}
        renderItem={renderClient}
        keyExtractor={item => item.id}
      />
      <Button
        title="Create Wellness Plan"
        onPress={() => {/* Navigate to Create Wellness Plan screen */}}
        style={styles.createPlanButton}
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
  clientItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientGoal: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#4CAF50',
  },
  scheduleButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#FFC107',
  },
  createPlanButton: {
    marginTop: 20,
  },
});

export default WellnessCoachScreen;

