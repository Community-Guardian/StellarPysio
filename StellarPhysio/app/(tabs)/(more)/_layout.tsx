import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MoreScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'More' }}/>
       <Stack.Screen name="feedback" options={{ headerShown: true,headerTitle: 'Feedback' ,headerBackVisible: true,}}/>
       <Stack.Screen name="AboutUsScreen" options={{ headerShown: true,headerTitle: 'About Us' ,headerBackVisible: true ,}}/>
       <Stack.Screen name="ContactUsScreen" options={{ headerShown: true,headerTitle: 'Contact Us',headerBackVisible: true ,}}/>
       <Stack.Screen name="HelpScreen" options={{ headerShown: true,headerTitle: 'Help',headerBackVisible: true ,}}/>
       <Stack.Screen name="logout" options={{ headerShown: true,headerTitle: 'Logout',headerBackVisible: true ,}}/>
    </Stack>
  )
}

export default MoreScreenLayout

const styles = StyleSheet.create({})