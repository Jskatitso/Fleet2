import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';

const RiderProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || 'Kwame Mensah',
    email: user?.email || 'kwame.mensah@example.com',
    phone: user?.phone || '+233 24 123 4567',
    momoNumber: user?.momoNumber || '054 ••• 4567',
    region: user?.region || 'Greater Accra',
    vehicleType: user?.vehicleType || 'Motorbike',
    vehiclePlate: user?.vehiclePlate || 'M-22-GR-1234',
    ghanaCardNumber: user?.ghanaCardNumber || 'GHA-123456789-0',
  });

  const updateField = (field, value) => setForm({ ...form, [field]: value });

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Needed', 'Please allow camera access.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handlePhotoOptions = () => {
    Alert.alert('Profile Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: handleTakePhoto },
      { text: 'Choose from Gallery', onPress: handlePickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = () => {
    // API call to save changes goes here
    Alert.alert('Saved', 'Your profile has been updated.');
    setEditing(false);
  };

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent and cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const fields = [
    { label: 'Full Name', key: 'name', icon: '👤' },
    { label: 'Email Address', key: 'email', icon: '✉️', keyboardType: 'email-address' },
    { label: 'Phone Number', key: 'phone', icon: '📞', keyboardType: 'phone-pad' },
    { label: 'MoMo Number', key: 'momoNumber', icon: '💛', keyboardType: 'phone-pad' },
    { label: 'Region', key: 'region', icon: '📍' },
    { label: 'Vehicle Type', key: 'vehicleType', icon: '🏍️' },
    { label: 'Vehicle Plate', key: 'vehiclePlate', icon: '🪪' },
    { label: 'Ghana Card Number', key: 'ghanaCardNumber', icon: '🪪' },
  ];

  const supportItems = [
    { icon: '❓', title: 'Help & Support', subtitle: 'FAQ and contact us' },
    { icon: '📄', title: 'Terms & Privacy Policy', subtitle: null },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Profile</Text>
        <TouchableOpacity
          style={[styles.editToggleBtn, editing && styles.editToggleBtnActive]}
          onPress={() => editing ? handleSave() : setEditing(true)}
        >
          <Text style={[styles.editToggleText, editing && styles.editToggleTextActive]}>
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={handlePhotoOptions} style={styles.avatarWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {form.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.cameraBadge}>
            <Text style={styles.cameraBadgeIcon}>📷</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.avatarName}>{form.name}</Text>
        <Text style={styles.avatarEmail}>{form.email}</Text>
      </View>

      {/* Rating Banner */}
      <View style={styles.ratingBanner}>
        <View style={styles.ratingItem}>
          <Text style={styles.ratingValue}>4.8 ⭐</Text>
          <Text style={styles.ratingLabel}>Rating</Text>
        </View>
        <View style={styles.ratingDivider} />
        <View style={styles.ratingItem}>
          <Text style={styles.ratingValue}>120</Text>
          <Text style={styles.ratingLabel}>Deliveries</Text>
        </View>
        <View style={styles.ratingDivider} />
        <View style={styles.ratingItem}>
          <Text style={styles.ratingValue}>{form.region}</Text>
          <Text style={styles.ratingLabel}>Region</Text>
        </View>
      </View>

      {/* Editable Fields */}
      <Text style={styles.sectionLabel}>ACCOUNT INFORMATION</Text>
      <View style={styles.fieldsCard}>
        {fields.map((field, index) => (
          <View
            key={field.key}
            style={[
              styles.fieldRow,
              index < fields.length - 1 && styles.fieldRowBorder,
            ]}
          >
            <View style={styles.fieldIconBox}>
              <Text style={styles.fieldIcon}>{field.icon}</Text>
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              {editing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={form[field.key]}
                  onChangeText={(val) => updateField(field.key, val)}
                  keyboardType={field.keyboardType || 'default'}
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.fieldValue}>{form[field.key]}</Text>
              )}
            </View>
            {editing && <Text style={styles.editChevron}>✏️</Text>}
          </View>
        ))}
      </View>

      {/* Identity Verification */}
      <Text style={styles.sectionLabel}>VERIFICATION</Text>
      <View style={styles.verificationCard}>
        <View style={styles.verificationRow}>
          <View style={styles.fieldIconBox}>
            <Text style={styles.fieldIcon}>🛡️</Text>
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Identity Status</Text>
            <Text style={styles.fieldValue}>Ghana Card Verified</Text>
          </View>
          <Text style={styles.verifiedTag}>Verified</Text>
        </View>
      </View>

      {/* Support */}
      <Text style={styles.sectionLabel}>SUPPORT</Text>
      <View style={styles.menuCard}>
        {supportItems.map((item, i) => (
          <TouchableOpacity
            key={item.title}
            style={[styles.menuItem, i < supportItems.length - 1 && styles.menuItemBorder]}
          >
            <View style={styles.fieldIconBox}>
              <Text style={styles.fieldIcon}>{item.icon}</Text>
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cancel Edit */}
      {editing && (
        <TouchableOpacity
          style={styles.cancelEditBtn}
          onPress={() => setEditing(false)}
        >
          <Text style={styles.cancelEditText}>Cancel</Text>
        </TouchableOpacity>
      )}

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutIcon}>→</Text>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>🗑  Delete Account</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 60 },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  pageTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  editToggleBtn: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  editToggleBtnActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  editToggleText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  editToggleTextActive: { color: '#FFFFFF' },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatarWrapper: { position: 'relative', marginBottom: 10 },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#22C55E',
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#22C55E',
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: '#475569' },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraBadgeIcon: { fontSize: 12 },
  avatarName: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  avatarEmail: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  ratingBanner: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ratingItem: { flex: 1, alignItems: 'center', gap: 4 },
  ratingValue: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  ratingLabel: { fontSize: 10, color: '#94A3B8' },
  ratingDivider: { width: 1, backgroundColor: '#E2E8F0' },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
  fieldsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 20,
    overflow: 'hidden',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  fieldRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fieldIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldIcon: { fontSize: 16 },
  fieldContent: { flex: 1 },
  fieldLabel: { fontSize: 11, color: '#94A3B8', marginBottom: 2 },
  fieldValue: { fontSize: 14, fontWeight: '500', color: '#0F172A' },
  fieldInput: {
    fontSize: 14,
    color: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#22C55E',
    paddingVertical: 2,
  },
  editChevron: { fontSize: 14 },
  verificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 20,
    overflow: 'hidden',
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  verifiedTag: { fontSize: 12, fontWeight: '600', color: '#22C55E' },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  menuTitle: { fontSize: 14, fontWeight: '500', color: '#0F172A' },
  menuSubtitle: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  chevron: { fontSize: 20, color: '#CBD5E1' },
  cancelEditBtn: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelEditText: { fontSize: 14, fontWeight: '600', color: '#94A3B8' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  logoutIcon: { fontSize: 16, color: '#374151' },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  deleteBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
  },
  deleteText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
});

export default RiderProfileScreen;