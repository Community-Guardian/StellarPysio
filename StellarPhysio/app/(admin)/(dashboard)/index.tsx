// StellarPhysio/app/(admin)/(dashboard)/index.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboardScreen: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { title: 'Reports', icon: 'bar-chart', route: '/(admin)/(reports)' },
    { title: 'Notifications', icon: 'notifications', route: '/(admin)/(notifications)' },
    { title: 'Logs', icon: 'document-text', route: '/(admin)/(notifications)/LogsScreen' },
    { title: 'Manage Users', icon: 'people', route: '/(admin)/(users)' },
    { title: 'System Settings', icon: 'settings', route: '/(admin)/(settings)' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={24} color="#4A90E2" style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
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
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AdminDashboardScreen;