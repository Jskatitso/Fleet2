import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput
} from 'react-native';
import colors from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

const RiderProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: 'Kwame Mensah',
    telephone: '0241234567',
    momoNumber: '0241234567',
    email: 'kwame@email.com',
    region: 'Greater Accra',
    vehicleType: 'Motorbike',
    ghanaCardNumber: 'GHA-123456789-0',
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {form.fullName.charAt(0)}
          </Text>
        </View>
        <Text style={styles.profileName}>{form.fullName}</Text>
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>✅ Verified Rider</Text>
        </View>
      </View>

      {/* Edit Toggle */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setEditing(!editing)}
      >
        <Text style={styles.editButtonText}>
          {editing ? 'Cancel' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      {/* Profile Fields */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Info</Text>

        {[
          { label: 'Full Name', key: 'fullName' },
          { label: 'Telephone', key: 'telephone' },
          { label: 'MoMo Number', key: 'momoNumber' },
          { label: 'Email', key: 'email' },
          { label: 'Region', key: 'region' },
          { label: 'Vehicle Type', key: 'vehicleType' },
          { label: 'Ghana Card Number', key: 'ghanaCardNumber' },
        ].map((field) => (
          <View key={field.key} style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            {editing ? (
              <TextInput
                style={styles.fieldInput}
                value={form[field.key]}
                onChangeText={(val) => updateField(field.key, val)}
                placeholderTextColor={colors.subtext}
              />
            ) : (
              <Text style={styles.fieldValue}>{form[field.key]}</Text>
            )}
          </View>
        ))}
      </View>

      {editing && (
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      {/* Rating */}
      <View style={styles.ratingCard}>
        <Text style={styles.ratingTitle}>Your Rating</Text>
        <Text style={styles.ratingValue}>4.8 ⭐</Text>
        <Text style={styles.ratingSubtext}>Based on 120 deliveries</Text>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  verifiedBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  verifiedText: {
    color: colors.accent,
    fontSize: 12,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 14,
  },
  fieldRow: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: colors.subtext,
    fontSize: 12,
    marginBottom: 4,
  },
  fieldValue: {
    color: colors.text,
    fontSize: 14,
  },
  fieldInput: {
    backgroundColor: colors.primary,
    color: colors.text,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  saveButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  ratingCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  ratingTitle: {
    color: colors.subtext,
    fontSize: 13,
    marginBottom: 6,
  },
  ratingValue: {
    color: colors.accent,
    fontSize: 32,
    fontWeight: 'bold',
  },
  ratingSubtext: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 4,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.error,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.error,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default RiderProfileScreen;