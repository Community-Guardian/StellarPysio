import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import { Link } from 'expo-router';

const PREFERENCES_KEY = 'user_preferences';

const MoreScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPreferences = await AsyncStorage.getItem(PREFERENCES_KEY);
        if (savedPreferences) {
          const { notificationsEnabled, darkModeEnabled } = JSON.parse(savedPreferences);
          setNotificationsEnabled(notificationsEnabled);
          setDarkModeEnabled(darkModeEnabled);
        } else {
          // Set default values if no preferences found
          setNotificationsEnabled(true); // Default as true
          setDarkModeEnabled(false); // Default as false
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };
    loadPreferences();
  }, []); // Empty dependency array to run only on mount

  const savePreferences = async (key: string, value: boolean) => {
    try {
      const updatedPreferences = {
        notificationsEnabled,
        darkModeEnabled,
        [key]: value,
      };
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const toggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    savePreferences('notificationsEnabled', value);
    Alert.alert('Notifications', value ? 'Enabled' : 'Disabled');
  };

  const toggleDarkMode = (value: boolean) => {
    setDarkModeEnabled(value);
    savePreferences('darkModeEnabled', value);
    Alert.alert('Dark Mode', value ? 'Enabled' : 'Disabled');
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Account Settings', route: '/account-settings' },
    { icon: 'card-outline', title: 'Payment Methods', route: '/payment-methods' },
    { icon: 'star-outline', title: 'Feedback', route: '/feedback' },
    { icon: 'help-circle-outline', title: 'Help & Support', route: '/help-support' },
    { icon: 'document-text-outline', title: 'Terms & Conditions', route: '/terms-conditions' },
    { icon: 'shield-checkmark-outline', title: 'Privacy Policy', route: '/privacy-policy' },
    { icon: 'log-out-outline', title: 'Log Out', route: '/logout' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: colors.lightText, true: colors.primary }}
            thumbColor={notificationsEnabled ? colors.white : colors.background}
          />
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.lightText, true: colors.primary }}
            thumbColor={darkModeEnabled ? colors.white : colors.background}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loyalty Program</Text>
        <View style={styles.loyaltyCard}>
          <Text style={styles.loyaltyTitle}>StellarPhysio Rewards</Text>
          <Text style={styles.loyaltyPoints}>250 points</Text>
          <Text style={styles.loyaltyInfo}>Earn 1 point for every $1 spent</Text>
          <TouchableOpacity style={styles.loyaltyButton}>
            <Text style={styles.loyaltyButtonText}>View Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.route} asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name={item.icon as any} size={24} color={colors.primary} />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.lightText} />
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightText,
  },
  preferenceText: {
    fontSize: 16,
    color: colors.text,
  },
  loyaltyCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  loyaltyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  loyaltyPoints: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  loyaltyInfo: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 16,
  },
  loyaltyButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loyaltyButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightText,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
});

export default MoreScreen;
