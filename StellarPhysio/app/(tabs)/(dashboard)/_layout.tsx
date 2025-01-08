import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DashboardScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'Dashboard' }}/>
       <Stack.Screen name="appointments"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'My appointments',
            headerBackVisible: true, // displays the back button
          }}
        />
       <Stack.Screen name="book_appointment"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'Book Appointment',
            headerBackVisible: true, // displays the back button
          }}
        />
       <Stack.Screen name="payment_history"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'Prescriptions & Charges',
            headerBackVisible: true, // displays the back button
          }}
        />
       <Stack.Screen name="services"    options={{ headerShown: true, // Ensures the header is shown
            headerTitle: 'Our Services',
            headerBackVisible: true, // displays the back button
          }}
        />
        <Stack.Screen name="CertificationScreen"    options={{ headerShown: true, // Ensures the header is shown
          headerTitle: 'My Archievements',
          headerBackVisible: true, // displays the back button
        }}
      />
    </Stack>
  )
}

export default DashboardScreenLayout

const styles = StyleSheet.create({})