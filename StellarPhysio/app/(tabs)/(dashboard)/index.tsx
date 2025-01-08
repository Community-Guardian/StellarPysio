// StellarPhysio/app/(tabs)/(dashboard)/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import { useNotifications } from '@/context/NotificationContext';
import SearchBar from '@/components/SearchBar'; // Import the SearchBar component
import {useAuth} from '@/context/AuthContext';
interface QuickAccessTile {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
}

interface Notification {
  id: number;
  notification_type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  user: string;
}

const DashboardScreen: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { notifications, fetchNotifications, markNotificationAsRead, loading } = useNotifications();
  const unreadNotifications = notifications.filter(notification => !notification.is_read).length;
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    fetchNotifications();
  }, []);

  const quickAccessTiles: QuickAccessTile[] = [
    { title: 'My Appointments', icon: 'list', screen: 'appointments' },
    { title: 'Services', icon: 'medical', screen: 'services' },
    { title: 'My Achievements', icon: 'star', screen: 'CertificationScreen' },
    { title: 'Articles', icon: 'book', screen: 'articles' },
  ];

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.is_read) {
        markNotificationAsRead(notification.id);
      }
    });
  };

  const markAsRead = (id: number) => {
    markNotificationAsRead(id);
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
        onPress={() => markAsRead(item.id)} // Mark as read when the dots are pressed
      >
        <MaterialCommunityIcons name="dots-vertical" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search and Menu */}
        <View style={styles.headerContainer}>
          <SearchBar /> {/* Integrate the SearchBar component */}
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
            {unreadNotifications > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadNotifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Welcome, {user?.details?.username}!</Text>
        <View style={styles.tilesContainer}>
          {quickAccessTiles.map((tile, index) => (
            <Link key={index} href={`/${tile.screen}`} asChild>
              <TouchableOpacity style={styles.tile}>
                <Ionicons name={tile.icon} size={32} color="#4A90E2" />
                <Text style={styles.tileText}>{tile.title}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
        {/* Notifications */}
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notifications</Text>
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
              />
              {unreadNotifications > 0 && (
                <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
                  <Text style={styles.markAllText}>Mark all as read</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
      {/* Dropdown Menu Modal */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={toggleMenu} />
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              setMenuVisible(false); // Close the menu
              await new Promise(resolve => setTimeout(resolve, 100)); // Slight delay for smooth UI transition
              router.push('/(tabs)/(dashboard)/NotificationsScreen'); // Redirect to the desired screen
            }}
          >
            <Ionicons name="notifications" size={20} color="#333" />
            <Text style={styles.menuText}>Notifications</Text>
            {unreadNotifications > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadNotifications}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
            <Ionicons name="information-circle" size={20} color="#333" />
            <Text style={styles.menuText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
            <Ionicons name="help-circle" size={20} color="#333" />
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tile: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tileText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  notificationsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  list: {
    maxHeight: 200,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
});

export default DashboardScreen;