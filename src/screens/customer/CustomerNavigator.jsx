import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

import CustomerDashboard from './CustomerDashboard';

import DeliveryRequestScreen from './DeliveryRequestScreen';
import CustomerHistoryScreen from './CustomerHistoryScreen';
import CustomerProfileScreen from './CustomerProfileScreen';
import CustomerNotificationsScreen from './CustomerNotificationsScreen';
import { View, Text } from 'react-native';

const PlaceholderScreen = ({ route }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
    <Text style={{ color: colors.text, fontSize: 18 }}>{route.name}</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const CustomerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.secondary,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.subtext,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Request: 'add-circle',
            History: 'time',
            Profile: 'person',
            Notifications: 'notifications',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={CustomerDashboard} />
      <Tab.Screen name="Request" component={DeliveryRequestScreen} />
      <Tab.Screen name="History" component={CustomerHistoryScreen} />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
      <Tab.Screen name="Notifications" component={CustomerNotificationsScreen} />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;