import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import colors from '../../constants/colors';

const RiderNotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Delivery Request',
      message: 'You have a new delivery request from Accra Mall to East Legon.',
      time: '2 mins ago',
      read: false,
      icon: '📦',
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'GHS 35.00 has been credited to your MoMo account.',
      time: '1 hour ago',
      read: false,
      icon: '💰',
    },
    {
      id: '3',
      title: 'Delivery Completed',
      message: 'Your delivery to Airport Residential has been marked complete.',
      time: '3 hours ago',
      read: true,
      icon: '✅',
    },
    {
      id: '4',
      title: 'New Rating',
      message: 'Efua Mensah gave you a 5 star rating. Keep it up!',
      time: 'Yesterday',
      read: true,
      icon: '⭐',
    },
    {
      id: '5',
      title: 'Account Verified',
      message: 'Your rider account has been verified by the Fleet admin team.',
      time: '2 days ago',
      read: true,
      icon: '🛡️',
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        ) : (
          notifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.notifCard, !item.read && styles.unreadCard]}
              onPress={() => markRead(item.id)}
            >
              <Text style={styles.notifIcon}>{item.icon}</Text>
              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notifMessage}>{item.message}</Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  unreadCount: {
    color: colors.accent,
    fontSize: 12,
    marginTop: 2,
  },
  markAllText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: 'bold',
  },
  notifCard: {
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
  notifIcon: {
    fontSize: 26,
    marginTop: 2,
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  notifMessage: {
    color: colors.subtext,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  notifTime: {
    color: colors.subtext,
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 16,
  },
  emptyText: {
    color: colors.subtext,
    fontSize: 14,
  },
});

export default RiderNotificationsScreen;