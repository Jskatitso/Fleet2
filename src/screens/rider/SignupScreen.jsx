import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import regions from '../../constants/regions';

const vehicleTypes = [
  { label: 'Motorbike', value: 'motorbike' },
  { label: 'Standard Car', value: 'car' },
  { label: 'Van / Mini Truck', value: 'van' },
];

const SignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: '',
    ghanaCardNumber: '',
    telephone: '',
    momoNumber: '',
    region: '',
    vehicleType: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => setForm({ ...form, [field]: value });

  const handleSignup = () => {
    console.log('Rider signup:', form);
    // API call goes here
    navigation.navigate('RiderHome');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Rider Account</Text>
        </View>

        <Text style={styles.subtitle}>Fill in your details to get started</Text>

        {/* Full Name */}
        <Text style={styles.label}>Full Name (as on Ghana Card)</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Kwame Mensah"
            placeholderTextColor="#9CA3AF"
            value={form.fullName}
            onChangeText={(val) => updateField('fullName', val)}
          />
        </View>

        {/* Ghana Card Number */}
        <Text style={styles.label}>Ghana Card Number</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🪪</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. GHA-XXXXXXXXX-X"
            placeholderTextColor="#9CA3AF"
            value={form.ghanaCardNumber}
            onChangeText={(val) => updateField('ghanaCardNumber', val)}
            autoCapitalize="characters"
          />
        </View>

        {/* Telephone */}
        <Text style={styles.label}>Telephone Number</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>📱</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 054 123 4567"
            placeholderTextColor="#9CA3AF"
            value={form.telephone}
            onChangeText={(val) => updateField('telephone', val)}
            keyboardType="phone-pad"
          />
        </View>

        {/* MoMo Number */}
        <Text style={styles.label}>MoMo Number</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>💛</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 054 123 4567"
            placeholderTextColor="#9CA3AF"
            value={form.momoNumber}
            onChangeText={(val) => updateField('momoNumber', val)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Region */}
        <Text style={styles.label}>Region</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.region}
            onValueChange={(val) => updateField('region', val)}
            style={styles.picker}
          >
            <Picker.Item label="Select your region..." value="" />
            {regions.map((r) => (
              <Picker.Item key={r} label={r} value={r} />
            ))}
          </Picker>
        </View>

        {/* Vehicle Type */}
        <Text style={styles.label}>Vehicle Type</Text>
        <View style={styles.vehicleRow}>
          {vehicleTypes.map((v) => (
            <TouchableOpacity
              key={v.value}
              style={[
                styles.vehicleBtn,
                form.vehicleType === v.value && styles.vehicleBtnActive,
              ]}
              onPress={() => updateField('vehicleType', v.value)}
            >
              <Text style={styles.vehicleIcon}>
                {v.value === 'motorbike' ? '🏍️' : v.value === 'car' ? '🚗' : '🚐'}
              </Text>
              <Text style={[
                styles.vehicleLabel,
                form.vehicleType === v.value && styles.vehicleLabelActive,
              ]}>
                {v.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>✉</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. kwame@mail.com"
            placeholderTextColor="#9CA3AF"
            value={form.email}
            onChangeText={(val) => updateField('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#9CA3AF"
            value={form.password}
            onChangeText={(val) => updateField('password', val)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Legal */}
        <Text style={styles.legal}>
          By proceeding, you agree to Fleet's{' '}
          <Text style={styles.legalLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.legalLink}>Privacy Policy</Text>
        </Text>

        {/* Login link — FIXED: was 'Login', now 'RiderLogin' */}
        <TouchableOpacity onPress={() => navigation.navigate('RiderLogin')}>
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Sign in</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
    gap: 8,
  },
  backBtn: { padding: 4 },
  backIcon: {
    fontSize: 28,
    color: '#0F172A',
    lineHeight: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  inputIcon: { fontSize: 15 },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },
  eyeIcon: { fontSize: 15 },
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: '#374151',
    height: 50,
  },
  vehicleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  vehicleBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
  },
  vehicleBtnActive: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  vehicleIcon: { fontSize: 22 },
  vehicleLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  vehicleLabelActive: {
    color: '#16A34A',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#0F172A',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  legal: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 16,
    lineHeight: 18,
  },
  legalLink: { color: '#22C55E' },
  loginLink: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 16,
    fontSize: 13,
  },
  loginLinkBold: {
    color: '#22C55E',
    fontWeight: '600',
  },
});

export default SignupScreen;