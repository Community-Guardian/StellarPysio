import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Button from '../../components/Button';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

const InventoryManagerScreen = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    { id: '1', name: 'Massage Table', quantity: 10, category: 'Equipment' },
    { id: '2', name: 'Resistance Bands', quantity: 50, category: 'Supplies' },
    { id: '3', name: 'Yoga Mats', quantity: 30, category: 'Supplies' },
  ]);

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Button
        title="Update"
        onPress={() => {/* Implement update item logic */}}
        style={styles.updateButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Manager</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search inventory..."
      />
      <FlatList
        data={inventoryItems}
        renderItem={renderInventoryItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Add New Item"
        onPress={() => {/* Implement add new item logic */}}
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
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  updateButton: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});

export default InventoryManagerScreen;

