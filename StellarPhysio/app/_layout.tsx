import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

import { AuthProvider } from '@/context/AuthContext';
import { PaymentProvider } from '@/context/PaymentContext';
import { AppointmentProvider } from '@/context/AppointmentContext';
import { ServicesProvider } from '@/context/ServicesContext';
import { ArticlesProvider } from '@/context/ArticlesContext';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AchievementsProvider } from '@/context/AchievementsContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Retrieve the current color scheme (dark/light)
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Show nothing until fonts are loaded
  }

  return (
    <ThemeProvider>
        <AuthProvider>
          <PaymentProvider>
            <AppointmentProvider>
              <ServicesProvider>
                <ArticlesProvider>
                  <FeedbackProvider>
                    <NotificationProvider>
                      <AchievementsProvider>
                        <Stack>
                          <Stack.Screen name="index" options={{ headerShown: false }} />
                          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                          <Stack.Screen name="+not-found" />
                        </Stack>
                      </AchievementsProvider>
                    </NotificationProvider>
                  </FeedbackProvider>
                </ArticlesProvider>
              </ServicesProvider>
            </AppointmentProvider>
          </PaymentProvider>
        </AuthProvider>
        <StatusBar style="auto" />
    </ThemeProvider>
  );
}
