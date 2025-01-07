import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '@/app/Screens/DashboardScreen';
import AdminDashboardScreen from '@/app/(admin)/(dashboard)';
import PatientDashboardScreen from '@/screens/PatientDashboardScreen';
import ServiceManagerScreen from '@/app/Screens/ServiceManagerScreen';
import PhysiotherapistScreen from '@/app/Screens/PhysiotherapistScreen';
import NutritionistScreen from '@/app/Screens/NutritionistScreen';
import WellnessCoachScreen from '@/app/Screens/WellnessCoachScreen';
import SupplierScreen from '@/app/Screens/SupplierScreen';
import InventoryManagerScreen from '@/app/Screens/InventoryManagerScreen';
import FinanceManagerScreen from '@/app/(tabs)/(finances)/FinanceManagerScreen';
import SchedulingScreen from '@/app/Screens/SchedulingScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import BookingScreen from '@/app/Screens/BookingScreen';
import CertificationScreen from '@/app/Screens/CertificationScreen';
import HelpScreen from '@/app/(tabs)/(more)/HelpScreen';
import SearchScreen from '@/app/Screens/SearchScreen';
import FeedbackScreen from '@/screens/FeedbackScreen';
import AboutUsScreen from '@/app/Screens/AboutUsScreen';
import ContactUsScreen from '@/app/(tabs)/(more)/ContactUsScreen';
import ReportsScreen from '@/app/Screens/ReportsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Booking') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'More') {
          iconName = focused ? 'menu' : 'menu-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Booking" component={BookingScreen} />
    <Tab.Screen name="Profile" component={PatientDashboardScreen} />
    <Tab.Screen name="More" component={MoreStack} />
  </Tab.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Services" component={ServiceManagerScreen} />
    <Stack.Screen name="Physiotherapist" component={PhysiotherapistScreen} />
    <Stack.Screen name="Nutritionist" component={NutritionistScreen} />
    <Stack.Screen name="WellnessCoach" component={WellnessCoachScreen} />
    <Stack.Screen name="Supplier" component={SupplierScreen} />
    <Stack.Screen name="InventoryManager" component={InventoryManagerScreen} />
    <Stack.Screen name="FinanceManager" component={FinanceManagerScreen} />
    <Stack.Screen name="Scheduling" component={SchedulingScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Certification" component={CertificationScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Feedback" component={FeedbackScreen} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    <Stack.Screen name="Reports" component={ReportsScreen} />
  </Stack.Navigator>
);

const MainNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen name="Admin" component={AdminDashboardScreen} />
  </Stack.Navigator>
);

export default MainNavigation;

