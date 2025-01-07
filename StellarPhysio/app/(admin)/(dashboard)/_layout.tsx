import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DashboardLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'Dashboard' }}/>
       <Stack.Screen name="ApproveAccountsScreen" options={{ headerShown: true,headerTitle: 'Profile' }}/>
       <Stack.Screen name="ManageUsersScreen" options={{ headerShown: true,headerTitle: 'Profile' }}/>
       <Stack.Screen name="ServicesManagerScreen" options={{ headerShown: true,headerTitle: 'Profile' }}/>
    </Stack>
  )
}

export default DashboardLayout

const styles = StyleSheet.create({})