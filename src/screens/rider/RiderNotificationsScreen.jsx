import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Delivery Request',
    message: 'You have a new delivery request from Accra Mall to East Legon.',
    time: '2 mins ago',
    read: false,
    icon: '📦',
    action: 'View Request',
  },
  {
    id: '2',
    title: 'Payment Received',
    message: '₵ 35.00 has been credited to your MoMo account for order #FLT-001.',
    time: '1 hour ago',
    read: false,
    icon: '💰',
    action: 'View Earnings',
  },
  {
    id: '3',
    title: 'Delivery Completed',
    message: 'Your delivery to Airport Residential has been marked complete.',
    time: '3 hours ago',
    read: true,
    icon: '✅',
    action: null,
  },
  {
    id: '4',
    title: 'New Rating',
    message: 'Efua Mensah gave you a 5 star rating. Keep it up!',
    time: 'Yesterday',
    read: true,
    icon: '⭐',
    action: null,
  },
  {
    id: '5',
    title: 'Account Verified',
    message: 'Your rider account has been verified by the Fleet team.',
    time: '2 days ago',
    read: true,
    icon: '🛡️',
    action: null,
  },
];

const RiderNotificationsScreen = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const dismiss = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderItem = ({ item }) => (
    <View style={[styles.card, !item.read && styles.cardUnread]}>
      {!item.read && <View style={styles.unreadBar} />}
      <View style={styles.cardInner}>
        <View style={[styles.iconBox, !item.read && styles.iconBoxUnread]}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardTopRow}>
            <Text style={[styles.cardTitle, !item.read && styles.cardTitleUnread]}>
              {item.title}
            </Text>
            <Text style={styles.cardTime}>{item.time}</Text>
          </View>
          <Text style={styles.cardMessage}>{item.message}</Text>
          <View style={styles.cardActions}>
            {item.action && (
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>{item.action} ›</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.dismissBtn} onPress={() => dismiss(item.id)}>
              <Text style={styles.dismissBtnText}>🗑 Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  markAllText: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardUnread: {
    borderColor: '#DCFCE7',
    backgroundColor: '#F0FDF4',
  },
  unreadBar: {
    height: 3,
    backgroundColor: '#22C55E',
  },
  cardInner: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconBoxUnread: {
    backgroundColor: '#DCFCE7',
  },
  icon: { fontSize: 18 },
  cardContent: { flex: 1, gap: 4 },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  cardTitleUnread: {
    color: '#16A34A',
  },
  cardTime: {
    fontSize: 10,
    color: '#94A3B8',
    flexShrink: 0,
  },
  cardMessage: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  dismissBtn: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  dismissBtnText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyIcon: { fontSize: 48 },
  emptyText: {
    fontSize: 15,
    color: '#94A3B8',
  },
});

export default RiderNotificationsScreen;