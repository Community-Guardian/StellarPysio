import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
interface QuickAccessTile {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
}

interface Notification {
  title: string;
  message: string;
}

const DashboardScreen: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const unreadNotifications = 2; // Example unread notifications count
  const router = useRouter();
  const quickAccessTiles: QuickAccessTile[] = [
    { title: 'My Appointments', icon: 'list', screen: 'appointments' },
    { title: 'Services', icon: 'medical', screen: 'services' },
    { title: 'My Archievments', icon: 'star', screen: 'CertificationScreen' },
    { title: 'Articles', icon: 'book', screen: 'articles' },
  ];

  const notifications: Notification[] = [
    { title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 2 PM.' },
    { title: 'New Service', message: 'Try our new sports therapy service!' },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search and Menu */}
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for places..."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons name="more-vert" size={24} color="#333" />
            {unreadNotifications > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadNotifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Welcome, John!</Text>
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
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notifications</Text>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          ))}
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
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  notification: {
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#999',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
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
