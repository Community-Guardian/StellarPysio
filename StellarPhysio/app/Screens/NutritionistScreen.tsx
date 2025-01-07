import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Button from '../../components/Button';

interface Patient {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  dietPlan: string;
}

const NutritionistScreen = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: '1', name: 'John Doe', age: 35, weight: 80, height: 180, dietPlan: 'Low carb' },
    { id: '2', name: 'Jane Smith', age: 28, weight: 65, height: 165, dietPlan: 'Balanced' },
    { id: '3', name: 'Bob Johnson', age: 42, weight: 90, height: 175, dietPlan: 'High protein' },
  ]);

  const renderPatient = ({ item }: { item: Patient }) => (
    <View style={styles.patientItem}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientDetails}>{`Age: ${item.age}, Weight: ${item.weight}kg, Height: ${item.height}cm`}</Text>
      <Text style={styles.dietPlan}>{`Diet Plan: ${item.dietPlan}`}</Text>
      <View style={styles.actionButtons}>
        <Button
          title="Update Plan"
          onPress={() => {/* Navigate to Update Diet Plan screen */}}
          style={styles.updateButton}
        />
        <Button
          title="View Progress"
          onPress={() => {/* Navigate to Patient Progress screen */}}
          style={styles.progressButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutritionist Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search patients..."
      />
      <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={item => item.id}
      />
      <Button
        title="Create Meal Plan"
        onPress={() => {/* Navigate to Create Meal Plan screen */}}
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
  patientItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  dietPlan: {
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
  progressButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#FFC107',
  },
  createPlanButton: {
    marginTop: 20,
  },
});

export default NutritionistScreen;

