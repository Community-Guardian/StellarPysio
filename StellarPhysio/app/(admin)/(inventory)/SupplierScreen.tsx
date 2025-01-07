import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Button from '../../../components/Button';

interface SupplyRequest {
  id: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'approved' | 'delivered';
}

const SupplierScreen = () => {
  const [supplyRequests, setSupplyRequests] = useState<SupplyRequest[]>([
    { id: '1', productName: 'Massage Oil', quantity: 50, status: 'pending' },
    { id: '2', productName: 'Resistance Bands', quantity: 30, status: 'approved' },
    { id: '3', productName: 'Yoga Mats', quantity: 20, status: 'delivered' },
  ]);

  const renderSupplyRequest = ({ item }: { item: SupplyRequest }) => (
    <View style={styles.requestItem}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      {item.status === 'pending' && (
        <Button
          title="Approve"
          onPress={() => handleApprove(item.id)}
          style={styles.approveButton}
        />
      )}
    </View>
  );

  const handleApprove = (id: string) => {
    setSupplyRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'approved' } : request
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supplier Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search supply requests..."
      />
      <FlatList
        data={supplyRequests}
        renderItem={renderSupplyRequest}
        keyExtractor={item => item.id}
      />
      <Button
        title="Add New Supply"
        onPress={() => {/* Implement add new supply logic */}}
        style={styles.addButton}
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
  },
  status: {
    fontSize: 16,
    color: '#4A90E2',
    marginTop: 5,
  },
  approveButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
  },
});

export default SupplierScreen;

