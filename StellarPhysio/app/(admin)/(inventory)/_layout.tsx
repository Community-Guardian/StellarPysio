import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const InventoryLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'Dashboard' }}/>
       <Stack.Screen name="SuppliersScreen" options={{ headerShown: true,headerTitle: 'Profile' }}/>
    </Stack>
  )
}

export default InventoryLayout

const styles = StyleSheet.create({})