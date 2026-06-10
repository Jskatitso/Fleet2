import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

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

// Admin
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token, userType, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  // If logged in, go straight to the right home screen
  const getInitialRoute = () => {
    if (token && userType === 'rider') return 'RiderHome';
    if (token && userType === 'customer') return 'CustomerHome';
    return 'Splash';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{ headerShown: false }}
      >
        {/* Onboarding */}
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