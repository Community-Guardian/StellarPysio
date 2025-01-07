import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ReportsScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'Profile' }}/>
       {/* <Stack.Screen name="profile"  />
       <Stack.Screen name="add-post"  /> */}

    </Stack>
  )
}

export default ReportsScreenLayout

const styles = StyleSheet.create({})