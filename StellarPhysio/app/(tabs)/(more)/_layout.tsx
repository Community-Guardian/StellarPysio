import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MoreScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: true,headerTitle: 'More' }}/>
       {/* <Stack.Screen name="profile"  />
       <Stack.Screen name="add-post"  /> */}

    </Stack>
  )
}

export default MoreScreenLayout

const styles = StyleSheet.create({})