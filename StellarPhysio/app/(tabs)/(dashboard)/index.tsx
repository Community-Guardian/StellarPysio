import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import { useAuth } from '@/context/AuthContext';
interface QuickAccessTile {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

interface WellnessTip {
  id: string;
  tip: string;
}

interface LastAppointment {
  id: string;
  service: string;
  date: string;
}

const DashboardScreen: React.FC = () => {
  const { user } = useAuth()
  const quickAccessTiles: QuickAccessTile[] = [
    { title: 'My Appointments', icon: 'list', screen: 'appointments' },
    { title: 'Services', icon: 'medical', screen: 'services' },
    { title: 'Book Appointment', icon: 'calendar', screen: 'book_appointment' },
    { title: 'Payment History', icon: 'document-text', screen: 'payment_history' },
  ];

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Appointment Reminder',
      message: 'You have an appointment tomorrow at 2 PM.',
      read: false,
    },
    {
      id: '2',
      title: 'New Service',
      message: 'Try our new sports therapy service!',
      read: false,
    },
  ]);

  const [wellnessTip, setWellnessTip] = useState<WellnessTip | null>(null);
  const [lastAppointment, setLastAppointment] = useState<LastAppointment | null>(null);

  useEffect(() => {
    // Simulating API calls
    setWellnessTip({
      id: '1',
      tip: 'Remember to stay hydrated throughout the day for better physical performance and overall health.',
    });
    setLastAppointment({
      id: '1',
      service: 'Manual Therapy',
      date: '2023-05-01',
    });
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {user?.details?.usernamer}!</Text>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.quickMenuTitle}>Quick Menu</Text>
          <View style={styles.tilesContainer}>
            {quickAccessTiles.map((tile, index) => (
              <Link key={index} href={`/${tile.screen}`} asChild>
                <TouchableOpacity style={styles.tile}>
                  <Ionicons name={tile.icon} size={32} color={colors.primary} />
                  <Text style={styles.tileText}>{tile.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
        <View style={styles.notificationsContainer}>
          <View style={styles.notificationsHeader}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <Link href="/notifications">
              <Text style={styles.seeAllText}>See All</Text>
            </Link>
          </View>
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notification,
                notification.read && styles.notificationRead,
              ]}
            >
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              {!notification.read && (
                <TouchableOpacity
                  onPress={() => markAsRead(notification.id)}
                  style={styles.markAsReadButton}
                >
                  <Text style={styles.markAsReadText}>Mark as Read</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        {wellnessTip && (
          <View style={styles.wellnessTipContainer}>
            <Text style={styles.sectionTitle}>Wellness Tip of the Day</Text>
            <Text style={styles.wellnessTipText}>{wellnessTip.tip}</Text>
          </View>
        )}
        {lastAppointment && (
          <View style={styles.lastAppointmentContainer}>
            <Text style={styles.sectionTitle}>Quick Rebook</Text>
            <Text style={styles.lastAppointmentText}>
              Your last appointment was {lastAppointment.service} on {lastAppointment.date}
            </Text>
            <TouchableOpacity
              onPress={() => console.log('Rebooking last appointment')}
              style={styles.rebookButton}
            >
              <Text style={styles.rebookButtonText}>Rebook Last Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 24,
  },
  scrollView: {
    paddingBottom: 24,
    paddingHorizontal: 24,
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  quickMenuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tile: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tileText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  notificationsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  notification: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  notificationRead: {
    backgroundColor: colors.background,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.lightText,
  },
  markAsReadButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  markAsReadText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  wellnessTipContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  wellnessTipText: {
    fontSize: 16,
    color: colors.white,
    fontStyle: 'italic',
  },
  lastAppointmentContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  lastAppointmentText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },
  rebookButton: {
    alignSelf: 'flex-start',
  },
  rebookButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default DashboardScreen;
