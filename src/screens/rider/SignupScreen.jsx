import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../constants/colors';
import regions from '../../constants/regions';

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
    confirmPassword: '',
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignup = () => {
    console.log('Signup form:', form);
    // API call will go here later
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Rider Account</Text>
        <Text style={styles.subtitle}>Fill in your details to get started</Text>

        <Text style={styles.label}>Full Name (as on Ghana Card)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Kwame Mensah"
          placeholderTextColor={colors.subtext}
          value={form.fullName}
          onChangeText={(val) => updateField('fullName', val)}
        />

        <Text style={styles.label}>Ghana Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. GHA-XXXXXXXXX-X"
          placeholderTextColor={colors.subtext}
          value={form.ghanaCardNumber}
          onChangeText={(val) => updateField('ghanaCardNumber', val)}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Telephone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 0241234567"
          placeholderTextColor={colors.subtext}
          value={form.telephone}
          onChangeText={(val) => updateField('telephone', val)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>MoMo Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 0241234567"
          placeholderTextColor={colors.subtext}
          value={form.momoNumber}
          onChangeText={(val) => updateField('momoNumber', val)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Region</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.region}
            onValueChange={(val) => updateField('region', val)}
            style={styles.picker}
            dropdownIconColor={colors.accent}
          >
            <Picker.Item label="Select your region..." value="" color="#888888" />
            {regions.map((region) => (
           <Picker.Item key={region} label={region} value={region} color="#000000" />
          ))}
          </Picker>
        </View>

        <Text style={styles.label}>Vehicle Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.vehicleType}
            onValueChange={(val) => updateField('vehicleType', val)}
            style={styles.picker}
            dropdownIconColor={colors.accent}
          >
            <Picker.Item label="Select vehicle type..." value="" color="#888888" />
            <Picker.Item label="Motorbike" value="motorbike" color="#000000" />
            <Picker.Item label="Truck" value="truck" color="#000000" />
            <Picker.Item label="Van / Minitruck" value="van" color="#000000" />
          </Picker>
        </View>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. kwame@email.com"
          placeholderTextColor={colors.subtext}
          value={form.email}
          onChangeText={(val) => updateField('email', val)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor={colors.subtext}
          value={form.password}
          onChangeText={(val) => updateField('password', val)}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor={colors.subtext}
          value={form.confirmPassword}
          onChangeText={(val) => updateField('confirmPassword', val)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkBold}>Log in</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: colors.subtext,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  pickerWrapper: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    textAlign: 'center',
    color: colors.subtext,
    marginTop: 16,
    fontSize: 14,
  },
  loginLinkBold: {
    color: colors.accent,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
