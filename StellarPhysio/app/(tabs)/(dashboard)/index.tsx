import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import Button from '@/components/Button';

interface QuickAccessTile {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
}

interface Notification {
  title: string;
  message: string;
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
  const quickAccessTiles: QuickAccessTile[] = [
    { title: 'Book Appointment', icon: 'calendar', screen: 'book_appointment' },
    { title: 'My Appointments', icon: 'list', screen: 'appointments' },
    { title: 'Services', icon: 'medical', screen: 'services' },
    { title: 'Prescriptions & Charges', icon: 'document-text', screen: 'prescriptions-charges' },
  ];

  const notifications: Notification[] = [
    { title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 2 PM.' },
    { title: 'New Service', message: 'Try our new sports therapy service!' },
  ];

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

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, John!</Text>
      <ScrollView style={styles.scrollView}>
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
        <View style={styles.notificationsContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
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
            <Button
              title="Rebook Last Appointment"
              onPress={() => console.log('Rebooking last appointment')}
              style={styles.rebookButton}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.navbar}>
        <Link href="/dashboard" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={colors.primary} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/appointments" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="calendar" size={24} color={colors.text} />
            <Text style={styles.navText}>Appointments</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color={colors.text} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/more" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="menu" size={24} color={colors.text} />
            <Text style={styles.navText}>More</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  notification: {
    marginBottom: 12,
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
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.lightText,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
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
});

export default DashboardScreen;

