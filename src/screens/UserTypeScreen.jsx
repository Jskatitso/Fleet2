import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import colors from '../constants/colors';

const UserTypeScreen = ({ navigation, route }) => {
  const mode = route.params?.mode;
  const isSignup = mode === 'signup';

  const handleRider = () => {
    navigation.navigate(isSignup ? 'RiderSignup' : 'RiderLogin');
  };

  const handleCustomer = () => {
    navigation.navigate(isSignup ? 'CustomerSignup' : 'CustomerLogin');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        {isSignup ? 'Create an Account' : 'Welcome Back'}
      </Text>
      <Text style={styles.subtitle}>
        {isSignup ? 'What type of account do you want?' : 'Which account are you logging into?'}
      </Text>

      <TouchableOpacity style={styles.card} onPress={handleRider}>
        <Text style={styles.cardIcon}>🏍️</Text>
        <View>
          <Text style={styles.cardTitle}>Rider</Text>
          <Text style={styles.cardDesc}>I deliver parcels and packages</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleCustomer}>
        <Text style={styles.cardIcon}>📦</Text>
        <View>
          <Text style={styles.cardTitle}>Customer</Text>
          <Text style={styles.cardDesc}>I want to send or receive packages</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: colors.subtext,
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 12,
    padding: 18,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 14,
  },
  cardIcon: {
    fontSize: 30,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 2,
  },
  backText: {
    color: colors.accent,
    marginTop: 20,
    fontSize: 14,
  },
});

export default UserTypeScreen;