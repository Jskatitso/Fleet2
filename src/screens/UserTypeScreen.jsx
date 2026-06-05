import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const UserTypeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Decorative dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
        <View style={[styles.dot, { backgroundColor: '#0F172A' }]} />
        <View style={[styles.dot, { backgroundColor: '#F97316' }]} />
      </View>

      {/* Logo + brand name */}
      <View style={styles.brand}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandName}>Fleet</Text>
      </View>

      {/* Hero text */}
      <View style={styles.heroContainer}>
        <Text style={styles.heroMain}>Deliver Anything.</Text>
        <Text style={styles.heroAccent}>Anywhere.</Text>
        <Text style={styles.heroSub}>
          Fast, reliable delivery across the city. We move what matters to you.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('CustomerSignup')}
        >
          <Text style={styles.primaryBtnText}>📦  Send a package  →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('RiderSignup')}
        >
          <Text style={styles.secondaryBtnText}>🏍️  Become a rider  →</Text>
        </TouchableOpacity>
      </View>

      {/* Pagination indicator */}
      <View style={styles.pageIndicator}>
        <View style={styles.pageBarActive} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  logo: {
    width: 32,
    height: 32,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heroMain: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  heroAccent: {
    fontSize: 36,
    fontWeight: '800',
    color: '#22C55E',
    letterSpacing: -0.5,
    lineHeight: 44,
    marginBottom: 16,
  },
  heroSub: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    maxWidth: '85%',
  },
  btnContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '500',
  },
  pageIndicator: {
    alignItems: 'center',
  },
  pageBarActive: {
    width: 40,
    height: 4,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },
});

export default UserTypeScreen;