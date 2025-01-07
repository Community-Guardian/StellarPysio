import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../../components/Button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ManageUsersScreen = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Physiotherapist' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Nutritionist' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Patient' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      <View style={styles.actionButtons}>
        <Button
          title="Edit"
          onPress={() => {/* Implement edit user logic */}}
          style={styles.editButton}
        />
        <Button
          title="Delete"
          onPress={() => {/* Implement delete user logic */}}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Users</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Add New User"
        onPress={() => {/* Implement add new user logic */}}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userRole: {
    fontSize: 14,
    color: '#4A90E2',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4A90E2',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});

export default ManageUsersScreen;

