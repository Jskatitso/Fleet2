import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const CustomerProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const accountItems = [
    {
      icon: '🛡️',
      title: 'Identity Verification',
      subtitle: 'Ghana Card linked securely',
      right: <Text style={styles.verifiedTag}>Verified</Text>,
    },
    {
      icon: '📞',
      title: 'Phone Number',
      subtitle: '+233 55 123 4567',
      right: null,
    },
  ];

  const preferenceItems = [
    {
      icon: '💳',
      title: 'Payment Methods',
      subtitle: 'Manage cards & mobile money',
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      subtitle: null,
      right: <Text style={styles.enabledTag}>Enabled</Text>,
    },
  ];

  const supportItems = [
    {
      icon: '❓',
      title: 'Help & Support',
      subtitle: 'FAQ and contact us',
      onPress: () => {},
    },
    {
      icon: '📄',
      title: 'Terms & Privacy Policy',
      subtitle: null,
      onPress: () => {},
    },
  ];

  const renderItem = (item, index, arr) => (
    <TouchableOpacity
      key={item.title}
      style={[styles.menuItem, index < arr.length - 1 && styles.menuItemBorder]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconBox}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
      </View>
      <View style={styles.menuText}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        {item.subtitle && (
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      {item.right ? item.right : <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <Text style={styles.pageTitle}>My Profile</Text>

      {/* Avatar & Info */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>KM</Text>
          <View style={styles.verifiedDot}>
            <Text style={{ fontSize: 8 }}>✓</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Kwame Mensah</Text>
          <Text style={styles.profileEmail}>kwame.mensah@example.com</Text>
        </View>
      </View>

      {/* ACCOUNT Section */}
      <Text style={styles.sectionLabel}>ACCOUNT</Text>
      <View style={styles.menuCard}>
        {accountItems.map((item, i) => renderItem(item, i, accountItems))}
      </View>

      {/* PREFERENCES Section */}
      <Text style={styles.sectionLabel}>PREFERENCES</Text>
      <View style={styles.menuCard}>
        {preferenceItems.map((item, i) => renderItem(item, i, preferenceItems))}
      </View>

      {/* SUPPORT Section */}
      <Text style={styles.sectionLabel}>SUPPORT</Text>
      <View style={styles.menuCard}>
        {supportItems.map((item, i) => renderItem(item, i, supportItems))}
      </View>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutIcon}>→</Text>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={styles.deleteText}>🗑  Delete Account</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 60,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 28,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#475569',
  },
  verifiedDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  profileEmail: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
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
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: '#CBD5E1',
  },
  verifiedTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
  },
  enabledTag: {
    fontSize: 12,
    color: '#94A3B8',
  },
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
  logoutIcon: {
    fontSize: 16,
    color: '#374151',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  deleteBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
});

export default CustomerProfileScreen;