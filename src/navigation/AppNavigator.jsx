import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/rider/WelcomeScreen';
import UserTypeScreen from '../screens/UserTypeScreen';

// Rider screens
import RiderSignupScreen from '../screens/rider/SignupScreen';
import RiderLoginScreen from '../screens/rider/LoginScreen';
import RiderNavigator from './RiderNavigator';

// Customer screens
import CustomerSignupScreen from '../screens/customer/CustomerSignupScreen';
import CustomerLoginScreen from '../screens/customer/CustomerLoginScreen';
import CustomerNavigator from '../screens/customer/CustomerNavigator';
import TrackOrderScreen from '../screens/customer/TrackOrderScreen';

// Admin screens
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';

import colors from '../constants/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="UserType" component={UserTypeScreen} />

        {/* Rider */}
        <Stack.Screen name="RiderSignup" component={RiderSignupScreen} />
        <Stack.Screen name="RiderLogin" component={RiderLoginScreen} />
        <Stack.Screen name="RiderHome" component={RiderNavigator} />

        {/* Customer */}
        <Stack.Screen name="CustomerSignup" component={CustomerSignupScreen} />
        <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerNavigator} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        {/* Admin */}
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;