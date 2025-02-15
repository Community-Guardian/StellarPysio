import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      <Stack.Screen
        name="login" // Matches with the login.tsx screen
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="register" // Matches with the signup.tsx screen
        options={{ title: 'Sign Up' }}
      />      
      <Stack.Screen
      name="forgot-password" // Matches with the signup.tsx screen
      options={{ title: 'Sign Up' }}
    />
    </Stack>
  );
}