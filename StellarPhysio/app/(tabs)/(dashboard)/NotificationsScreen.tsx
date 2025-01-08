import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotifications } from '@/context/NotificationContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

const NotificationsScreen = () => {
  const { notifications, fetchNotifications, markNotificationAsRead, loading } = useNotifications();
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.is_read) {
        markNotificationAsRead(notification.id);
        fetchNotifications(); // Refetch notifications to update the UI
      }
    });
  };

  const markAsRead = (id: string) => {
    markNotificationAsRead(id);
  };

  const showMenu = (id: string) => {
    Alert.alert(
      'Notification Options',
      'What would you like to do?',
      [
        {
          text: 'Mark as Read',
          onPress: () => markAsRead(id),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        {!item.read && <View style={styles.unreadDot} />}
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>
            <Text style={styles.boldText}>{item.title}</Text> {item.message}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => showMenu(item.id)} // Show menu when the dots are pressed
      >
        <MaterialCommunityIcons name="dots-vertical" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.disturbContainer}>
          <Text style={styles.disturbText}>Do not disturb</Text>
          <Switch
            value={doNotDisturb}
            onValueChange={setDoNotDisturb}
            trackColor={{ false: '#e4e4e4', true: '#a794ff' }}
            thumbColor={doNotDisturb ? '#6c4fff' : '#f4f3f4'}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={item => item.id}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyMessage}>No notifications available</Text>}
            onEndReachedThreshold={0.5}
            onEndReached={() => console.log('End of list reached')}
            extraData={notifications} // Ensure FlatList is updated on state changes
          />
          {notifications.some(notification => !notification.read) && (
            <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  disturbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disturbText: {
    marginRight: 10,
    color: '#666',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6c4fff',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  menuButton: {
    padding: 5,
  },
  markAllButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  markAllText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'left',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});

export default NotificationsScreen;