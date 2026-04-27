import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

import RiderDashboard from '../screens/rider/RiderDashboard';
import RiderProfileScreen from '../screens/rider/RiderProfileScreen';
import RiderNotificationsScreen from '../screens/rider/RiderNotificationsScreen';
import EarningsScreen from '../screens/rider/EarningsScreen';

const Tab = createBottomTabNavigator();

const RiderNavigator = () => {
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
            History: 'time',
            Profile: 'person',
            Notifications: 'notifications',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={RiderDashboard} />
      <Tab.Screen name="History" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={RiderProfileScreen} />
      <Tab.Screen name="Notifications" component={RiderNotificationsScreen} />
    </Tab.Navigator>
  );
};

export default RiderNavigator;