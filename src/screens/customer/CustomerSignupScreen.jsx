import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const CustomerSignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => setForm({ ...form, [field]: value });

  const handleSignup = () => {
    console.log('Customer signup:', form);
    // API call goes here
    navigation.navigate('CustomerHome');
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
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        {/* First Name */}
        <Text style={styles.label}>First Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Kwame"
            placeholderTextColor="#9CA3AF"
            value={form.firstName}
            onChangeText={(val) => updateField('firstName', val)}
          />
        </View>

        {/* Last Name */}
        <Text style={styles.label}>Last Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Mensah"
            placeholderTextColor="#9CA3AF"
            value={form.lastName}
            onChangeText={(val) => updateField('lastName', val)}
          />
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

        {/* Phone */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>📱</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 054 123 4567"
            placeholderTextColor="#9CA3AF"
            value={form.phone}
            onChangeText={(val) => updateField('phone', val)}
            keyboardType="phone-pad"
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

        {/* Login link */}
        <TouchableOpacity onPress={() => navigation.navigate('CustomerLogin')}>
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
    marginBottom: 28,
    marginTop: 16,
    gap: 8,
  },
  backBtn: {
    padding: 4,
  },
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
  inputIcon: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },
  eyeIcon: {
    fontSize: 15,
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
  legalLink: {
    color: '#22C55E',
  },
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

export default CustomerSignupScreen;