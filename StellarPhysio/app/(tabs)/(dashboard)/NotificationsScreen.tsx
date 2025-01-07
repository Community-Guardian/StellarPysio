import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Appointment', message: 'You have a new appointment scheduled for tomorrow.', read: false },
    { id: '2', title: 'Reminder', message: 'Don\'t forget to update patient records.', read: true },
    { id: '3', title: 'System Update', message: 'A new system update is available. Please update at your earliest convenience.', read: false },
  ]);

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const toggleRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter(notification => !notification.read)
    : notifications;

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <View style={[styles.notificationItem, item.read && styles.readNotification]}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
      <Ionicons
        name={item.read ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
        color={item.read ? '#4CAF50' : '#999'}
        onPress={() => toggleRead(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Show Unread Only</Text>
        <Switch
          value={showUnreadOnly}
          onValueChange={setShowUnreadOnly}
        />
      </View>
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    color: '#333',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  readNotification: {
    opacity: 0.6,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsScreen;

