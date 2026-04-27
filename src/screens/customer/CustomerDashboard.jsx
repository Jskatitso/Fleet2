import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity
} from 'react-native';
import colors from '../../constants/colors';

const CustomerDashboard = ({ navigation }) => {
  const recentDeliveries = [
    {
      id: '001',
      from: 'Accra Mall, Spintex',
      to: 'East Legon, A&C Mall',
      status: 'Delivered',
      date: 'Today, 10:30AM',
      price: 'GHS 35.00',
    },
    {
      id: '002',
      from: 'Tema Station',
      to: 'Madina Market',
      status: 'In Transit',
      date: 'Today, 8:00AM',
      price: 'GHS 80.00',
    },
    {
      id: '003',
      from: 'Osu Oxford Street',
      to: 'Airport Residential',
      status: 'Delivered',
      date: 'Yesterday, 3:00PM',
      price: 'GHS 55.00',
    },
  ];

  const statusColor = (status) => {
    if (status === 'Delivered') return colors.accent;
    if (status === 'In Transit') return '#F5A623';
    return colors.error;
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.name}>Welcome to Fleet</Text>
        </View>
        <TouchableOpacity style={styles.notifIcon} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.notifEmoji}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Request')} activeOpacity={0.8}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Where are you sending to?</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Request')}>
          <Text style={styles.actionIcon}>📦</Text>
          <Text style={styles.actionLabel}>Send Package</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Request', { packageType: 'Urgent Delivery' })}>
          <Text style={styles.actionIcon}>⚡</Text>
          <Text style={styles.actionLabel}>Urgent Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Request', { packageType: 'Scheduled' })}>
          <Text style={styles.actionIcon}>🗓️</Text>
          <Text style={styles.actionLabel}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('TrackOrder')}>
          <Text style={styles.actionIcon}>📍</Text>
          <Text style={styles.actionLabel}>Track Order</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Deliveries */}
      <Text style={styles.sectionTitle}>Recent Deliveries</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {recentDeliveries.map((item) => (
          <TouchableOpacity key={item.id} style={styles.deliveryCard} onPress={() => navigation.navigate('History')}>
            <View style={styles.deliveryHeader}>
              <Text style={styles.deliveryRoute}>{item.from}</Text>
              <Text style={[styles.deliveryStatus, { color: statusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.deliveryArrow}>↓</Text>
            <Text style={styles.deliveryRoute}>{item.to}</Text>
            <View style={styles.deliveryFooter}>
              <Text style={styles.deliveryDate}>{item.date}</Text>
              <Text style={styles.deliveryPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: colors.subtext,
    fontSize: 13,
  },
  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  notifIcon: {
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  notifEmoji: {
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchPlaceholder: {
    flex: 1,
    color: colors.subtext,
    fontSize: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    color: colors.text,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deliveryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryRoute: {
    color: colors.text,
    fontSize: 13,
    fontWeight: 'bold',
  },
  deliveryStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryArrow: {
    color: colors.subtext,
    fontSize: 14,
    marginVertical: 4,
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deliveryDate: {
    color: colors.subtext,
    fontSize: 11,
  },
  deliveryPrice: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default CustomerDashboard;