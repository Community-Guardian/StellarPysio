import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AppointmentsScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'Payments',}} />
       <Stack.Screen name="pay_now" options={{ headerShown: true,headerTitle: 'Pay Now', headerBackVisible: true,}} />
    </Stack>
  )
}

export default AppointmentsScreenLayout

const styles = StyleSheet.create({})