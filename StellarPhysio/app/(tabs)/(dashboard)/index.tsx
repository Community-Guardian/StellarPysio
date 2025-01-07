import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
  const quickAccessTiles: QuickAccessTile[] = [
    { title: 'Book Appointment', icon: 'calendar', screen: 'book-appointment' },
    { title: 'My Appointments', icon: 'list', screen: 'appointments' },
    { title: 'Services', icon: 'medical', screen: 'services' },
    { title: 'Feedback', icon: 'star', screen: 'feedback' },
  ];

  const notifications: Notification[] = [
    { title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 2 PM.' },
    { title: 'New Service', message: 'Try our new sports therapy service!' },
  ];

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        <Text className="text-2xl font-bold text-text mb-6">Welcome, John!</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {quickAccessTiles.map((tile, index) => (
            <Link key={index} href={`/${tile.screen}`} asChild>
              <TouchableOpacity className="w-[48%] aspect-square bg-white rounded-xl p-4 items-center justify-center mb-4">
                <Ionicons name={tile.icon} size={32} color="#4A90E2" />
                <Text className="mt-2 text-sm font-bold text-text text-center">{tile.title}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
        <View className="bg-white rounded-xl p-4">
          <Text className="text-lg font-bold text-text mb-4">Notifications</Text>
          {notifications.map((notification, index) => (
            <View key={index} className="mb-4">
              <Text className="text-base font-bold text-text">{notification.title}</Text>
              <Text className="text-sm text-lightText">{notification.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex-row justify-around items-center bg-white py-2 border-t border-lightText">
        <Link href="/dashboard" asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="home" size={24} color="#4A90E2" />
            <Text className="text-xs text-text mt-1">Home</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/appointments" asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="calendar" size={24} color="#333333" />
            <Text className="text-xs text-text mt-1">Appointments</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/profile" asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="person" size={24} color="#333333" />
            <Text className="text-xs text-text mt-1">Profile</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/more" asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="menu" size={24} color="#333333" />
            <Text className="text-xs text-text mt-1">More</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default DashboardScreen;

