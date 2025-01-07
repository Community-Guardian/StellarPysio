import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '@/components/Button';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Administrator Dashboard</Text>
      <View style={styles.moduleContainer}>
        <Button
          title="Manage Users"
          onPress={() => navigateToScreen('ManageUsers')}
          style={styles.moduleButton}
        />
        <Button
          title="Approve Accounts"
          onPress={() => navigateToScreen('ApproveAccounts')}
          style={styles.moduleButton}
        />
        <Button
          title="System Settings"
          onPress={() => navigateToScreen('SystemSettings')}
          style={styles.moduleButton}
        />
        <Button
          title="Reports"
          onPress={() => navigateToScreen('Reports')}
          style={styles.moduleButton}
        />
        <Button
          title="Notifications"
          onPress={() => navigateToScreen('Notifications')}
          style={styles.moduleButton}
        />
        <Button
          title="Logs"
          onPress={() => navigateToScreen('Logs')}
          style={styles.moduleButton}
        />
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
  moduleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleButton: {
    width: '48%',
    marginBottom: 15,
  },
});

export default AdminDashboardScreen;

