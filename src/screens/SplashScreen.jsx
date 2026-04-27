import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Moving what matters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
  tagline: {
    color: colors.text,
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 16,
    letterSpacing: 1,
  },
});

export default SplashScreen;