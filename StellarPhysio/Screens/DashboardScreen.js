import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const quickAccessTiles = [
    { title: 'Book Appointment', icon: 'calendar', screen: 'BookAppointment' },
    { title: 'My Appointments', icon: 'list', screen: 'Appointments' },
    { title: 'Services', icon: 'medical', screen: 'Services' },
    { title: 'Feedback', icon: 'star', screen: 'Feedback' },
  ];

  const notifications = [
    { title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 2 PM.' },
    { title: 'New Service', message: 'Try our new sports therapy service!' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greeting}>Welcome, John!</Text>
        <View style={styles.tilesContainer}>
          {quickAccessTiles.map((tile, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tile}
              onPress={() => navigation.navigate(tile.screen)}
            >
              <Ionicons name={tile.icon} size={32} color={colors.primary} />
              <Text style={styles.tileText}>{tile.title}</Text>
            </TouchableOpacity>
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
      </ScrollView>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color={colors.primary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Appointments')}>
          <Ionicons name="calendar" size={24} color={colors.text} />
          <Text style={styles.navText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={24} color={colors.text} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('More')}>
          <Ionicons name="menu" size={24} color={colors.text} />
          <Text style={styles.navText}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
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
});

export default DashboardScreen;

