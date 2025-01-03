import { Link, Stack } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Coming Soon', headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Ionicons name="construct-outline" size={80} color={colors.primary} />
            <Text style={styles.title}>Future Features</Text>
            <Text style={styles.description}>
              We're working hard to bring you new and exciting features. Stay tuned!
            </Text>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Go to Home Screen</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>StellarPhysio v1.0</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Replace 'bg-background'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff', // Replace 'bg-white'
    borderRadius: 16, // Replace 'rounded-2xl'
    padding: 32, // Replace 'p-8'
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  title: {
    fontSize: 24, // Replace 'text-2xl'
    fontWeight: 'bold',
    color: '#212529', // Replace 'text-text'
    marginTop: 24, // Replace 'mt-6'
    marginBottom: 8, // Replace 'mb-2'
    textAlign: 'center',
  },
  description: {
    fontSize: 16, // Replace 'text-base'
    color: '#6c757d', // Replace 'text-lightText'
    marginBottom: 24, // Replace 'mb-6'
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary, // Replace 'bg-primary'
    paddingVertical: 12, // Replace 'py-3'
    paddingHorizontal: 24, // Replace 'px-6'
    borderRadius: 9999, // Replace 'rounded-full'
  },
  buttonText: {
    fontSize: 16, // Replace 'text-base'
    color: '#ffffff', // Replace 'text-white'
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16, // Replace 'pb-8'
  },
  footerText: {
    fontSize: 14, // Replace 'text-sm'
    color: '#6c757d', // Replace 'text-lightText'
  },
});
