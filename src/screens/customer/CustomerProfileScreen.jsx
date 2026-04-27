import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput,
} from 'react-native';
import colors from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

const CustomerProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: 'Ama Owusu',
    email: 'ama@email.com',
    telephone: '0241234567',
    defaultAddress: 'East Legon, A&C Mall Area',
    region: 'Greater Accra',
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

  const stats = [
    { label: 'Total Orders', value: '24' },
    { label: 'Delivered', value: '21' },
    { label: 'Cancelled', value: '3' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Avatar & Name */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{form.fullName.charAt(0)}</Text>
        </View>
        <Text style={styles.profileName}>{form.fullName}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ Verified Customer</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Edit Toggle */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setEditing(!editing)}
      >
        <Text style={styles.editButtonText}>{editing ? 'Cancel' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        {[
          { label: 'Full Name', key: 'fullName' },
          { label: 'Email', key: 'email' },
          { label: 'Telephone', key: 'telephone' },
          { label: 'Default Address', key: 'defaultAddress' },
          { label: 'Region', key: 'region' },
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
        <TouchableOpacity style={styles.saveButton} onPress={() => setEditing(false)}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentIcon}>📱</Text>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentName}>MTN Mobile Money</Text>
            <Text style={styles.paymentNumber}>0241234567</Text>
          </View>
          <View style={styles.defaultTag}>
            <Text style={styles.defaultTagText}>Default</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addPaymentButton}>
          <Text style={styles.addPaymentText}>+ Add Payment Method</Text>
        </TouchableOpacity>
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
  badge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  statValue: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.subtext,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
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
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  paymentIcon: {
    fontSize: 28,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  paymentNumber: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 2,
  },
  defaultTag: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultTagText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
  addPaymentButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  addPaymentText: {
    color: colors.subtext,
    fontSize: 13,
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

export default CustomerProfileScreen;
