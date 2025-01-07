import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DashboardScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: false }}/>
       <Stack.Screen name="appointments"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'My appointments', // Removes the title
            headerBackVisible: true, // Displays only the back button
          }}
        />
       <Stack.Screen name="book_appointment"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'Book Appointment', // Removes the title
            headerBackVisible: true, // Displays only the back button
          }}
        />
       <Stack.Screen name="payment_history"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'Prescriptions & Charges', // Removes the title
            headerBackVisible: true, // Displays only the back button
          }}
        />
       <Stack.Screen name="services"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'Our Services', // Removes the title
            headerBackVisible: true, // Displays only the back button
          }}
        />
        <Stack.Screen name="CertificationScreen"    options={{ headerShown: true, // Ensures the header is shown
          headerTitle: 'My Archievements', // Removes the title
          headerBackVisible: true, // Displays only the back button
        }}
      />
    </Stack>
  )
}

export default DashboardScreenLayout

const styles = StyleSheet.create({})