import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      {/* Logo Card */}
      <View style={styles.center}>
        <View style={styles.logoCard}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>Fleet</Text>
        <Text style={styles.tagline}>Moving what matters</Text>
      </View>

      {/* Tap to continue */}
      <TouchableOpacity onPress={handleContinue} style={styles.tapBtn}>
        <Text style={styles.tapText}>TAP TO CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logoCard: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 8,
  },
  logo: {
    width: 52,
    height: 52,
  },
  appName: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: '#94A3B8',
    letterSpacing: 0.2,
  },
  tapBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  tapText: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },
});

export default SplashScreen;