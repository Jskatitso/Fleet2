import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Rider Assigned',
    message: 'Kwame A. has been assigned to your delivery FLT-002. He is on his way to pick up your package.',
    time: '2 mins ago',
    read: false,
    icon: '🏍️',
    type: 'order',
  },
  {
    id: '2',
    title: 'Delivery Completed',
    message: 'Your order FLT-001 from Accra Mall has been delivered successfully. Tap to rate your rider.',
    time: '1 hour ago',
    read: false,
    icon: '✅',
    type: 'order',
  },
  {
    id: '3',
    title: 'Package Picked Up',
    message: 'Your package for FLT-002 has been picked up from Tema Station and is now in transit.',
    time: '2 hours ago',
    read: false,
    icon: '📦',
    type: 'order',
  },
  {
    id: '4',
    title: 'Weekend Promo 🎉',
    message: 'Get 20% off all deliveries this weekend. Use code FLEET20 at checkout.',
    time: 'Yesterday',
    read: true,
    icon: '🏷️',
    type: 'promo',
  },
  {
    id: '5',
    title: 'Delivery Cancelled',
    message: 'Your order FLT-004 was cancelled. A full refund has been processed to your MoMo account.',
    time: 'Apr 25',
    read: true,
    icon: '❌',
    type: 'order',
  },
  {
    id: '6',
    title: 'Payment Confirmed',
    message: 'Payment of GHS 35.00 for order FLT-001 has been confirmed.',
    time: 'Apr 24',
    read: true,
    icon: '💳',
    type: 'payment',
  },
  {
    id: '7',
    title: 'Welcome to Fleet!',
    message: 'Your account is set up and ready. Request your first delivery anytime.',
    time: 'Apr 20',
    read: true,
    icon: '🛡️',
    type: 'system',
  },
];

const FILTERS = ['All', 'Orders', 'Payments', 'Promos'];

const typeMap = {
  All: null,
  Orders: 'order',
  Payments: 'payment',
  Promos: 'promo',
};

const CustomerNotificationsScreen = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('All');

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = activeFilter === 'All'
    ? notifications
    : notifications.filter((n) => n.type === typeMap[activeFilter]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, !item.read && styles.unreadCard]}
      onPress={() => markRead(item.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.cardMessage}>{item.message}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadLabel}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>No notifications here</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
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
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  unreadLabel: {
    color: colors.accent,
    fontSize: 12,
    marginTop: 2,
  },
  markAllText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  filterTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    color: colors.subtext,
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  unreadCard: {
    borderColor: colors.accent,
  },
  cardIcon: {
    fontSize: 26,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginLeft: 8,
  },
  cardMessage: {
    color: colors.subtext,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  cardTime: {
    color: colors.subtext,
    fontSize: 11,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    color: colors.subtext,
    fontSize: 16,
  },
});

export default CustomerNotificationsScreen;
