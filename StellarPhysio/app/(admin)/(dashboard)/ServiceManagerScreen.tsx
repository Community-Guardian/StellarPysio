import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Button from '../../../components/Button';

interface ServiceRequest {
  id: string;
  patientName: string;
  service: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ServiceManagerScreen = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    { id: '1', patientName: 'John Doe', service: 'Manual Therapy', status: 'pending' },
    { id: '2', patientName: 'Jane Smith', service: 'Sports Therapy', status: 'pending' },
    { id: '3', patientName: 'Bob Johnson', service: 'Rehabilitation', status: 'pending' },
  ]);

  const handleApprove = (id: string) => {
    setServiceRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'approved' } : request
      )
    );
  };

  const handleReject = (id: string) => {
    setServiceRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
  };

  const renderServiceRequest = ({ item }: { item: ServiceRequest }) => (
    <View style={styles.requestItem}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.status}>{item.status}</Text>
      <View style={styles.actionButtons}>
        <Button
          title="Approve"
          onPress={() => handleApprove(item.id)}
          style={styles.approveButton}
        />
        <Button
          title="Reject"
          onPress={() => handleReject(item.id)}
          style={styles.rejectButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Manager</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search requests..."
      />
      <FlatList
        data={serviceRequests}
        renderItem={renderServiceRequest}
        keyExtractor={item => item.id}
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
  requestItem: {
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
  service: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  approveButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#F44336',
  },
});

export default ServiceManagerScreen;

