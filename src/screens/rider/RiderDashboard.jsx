import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const INITIAL_DELIVERIES = [
  {
    id: '001',
    sender: 'Ama Asante',
    pickup: 'Accra Mall, Spintex',
    dropoff: 'East Legon, A&C Mall',
    package: 'Small Package',
    price: '₵ 35.00',
    distance: '4.2 km',
    eta: '12 min',
  },
  {
    id: '002',
    sender: 'Kofi Boateng',
    pickup: 'Tema Station',
    dropoff: 'Madina Market',
    package: 'Heavy Load',
    price: '₵ 80.00',
    distance: '8.1 km',
    eta: '22 min',
  },
  {
    id: '003',
    sender: 'Efua Mensah',
    pickup: 'Osu Oxford Street',
    dropoff: 'Airport Residential',
    package: 'Urgent Delivery',
    price: '₵ 55.00',
    distance: '5.7 km',
    eta: '15 min',
  },
];

const RiderDashboard = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES);

  const handleToggleOnline = (value) => {
    setIsOnline(value);
    if (value) {
      Alert.alert('You are Online', 'You will now receive delivery requests.');
    } else {
      Alert.alert('You are Offline', 'You will not receive delivery requests.');
    }
  };

  const handleReject = (id) => {
    Alert.alert(
      'Reject Delivery',
      'Are you sure you want to reject this request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => setDeliveries((prev) => prev.filter((d) => d.id !== id)),
        },
      ]
    );
  };

  const handleAccept = (delivery) => {
    setDeliveries((prev) => prev.filter((d) => d.id !== delivery.id));
    navigation.navigate('ActiveDelivery', { delivery });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 17) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  const firstName = user?.name?.split(' ')[0] || 'Rider';

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.riderName}>{firstName}</Text>
        </View>
        <View style={styles.onlineToggle}>
          <View style={[
            styles.onlinePill,
            { backgroundColor: isOnline ? '#F0FDF4' : '#F8FAFC' },
          ]}>
            <View style={[
              styles.onlineDot,
              { backgroundColor: isOnline ? '#22C55E' : '#CBD5E1' },
            ]} />
            <Text style={[
              styles.onlineText,
              { color: isOnline ? '#16A34A' : '#94A3B8' },
            ]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={handleToggleOnline}
              trackColor={{ false: '#E2E8F0', true: '#86EFAC' }}
              thumbColor={isOnline ? '#22C55E' : '#fff'}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={[styles.statCard, styles.statCardGreen]}>
          <Text style={[styles.statValue, { color: '#fff' }]}>₵ 420</Text>
          <Text style={[styles.statLabel, { color: '#BBF7D0' }]}>Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {user?.rating ? `${user.rating} ⭐` : '5.0 ⭐'}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Offline Banner */}
      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineIcon}>🏍️</Text>
          <View style={styles.offlineTextBox}>
            <Text style={styles.offlineTitle}>You're currently offline</Text>
            <Text style={styles.offlineSub}>
              Toggle online to start receiving delivery requests.
            </Text>
          </View>
        </View>
      )}

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {isOnline ? 'Pending Requests' : 'No Active Requests'}
        </Text>
        {isOnline && deliveries.length > 0 && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {isOnline ? (
          deliveries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>✅</Text>
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptySub}>No pending requests right now.</Text>
            </View>
          ) : (
            deliveries.map((delivery) => (
              <View key={delivery.id} style={styles.deliveryCard}>

                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.senderName}>{delivery.sender}</Text>
                    <Text style={styles.packageTag}>{delivery.package}</Text>
                  </View>
                  <View style={styles.priceBox}>
                    <Text style={styles.deliveryPrice}>{delivery.price}</Text>
                    <Text style={styles.deliveryMeta}>
                      {delivery.distance} · {delivery.eta}
                    </Text>
                  </View>
                </View>

                {/* Route */}
                <View style={styles.routeBox}>
                  <View style={styles.routeRow}>
                    <View style={styles.greenDot} />
                    <Text style={styles.routeText} numberOfLines={1}>
                      {delivery.pickup}
                    </Text>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routeRow}>
                    <View style={styles.redDot} />
                    <Text style={styles.routeText} numberOfLines={1}>
                      {delivery.dropoff}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => handleReject(delivery.id)}
                  >
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => handleAccept(delivery)}
                  >
                    <Text style={styles.acceptText}>Accept →</Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))
          )
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🛵</Text>
            <Text style={styles.emptyTitle}>Go online to get started</Text>
            <Text style={styles.emptySub}>Delivery requests will appear here</Text>
          </View>
        )}
      </ScrollView>

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
  greeting: {
    fontSize: 13,
    color: '#6B7280',
  },
  riderName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  onlineToggle: {
    alignItems: 'flex-end',
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statCardGreen: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  offlineIcon: { fontSize: 24 },
  offlineTextBox: { flex: 1 },
  offlineTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400E',
  },
  offlineSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  packageTag: {
    fontSize: 11,
    color: '#22C55E',
    fontWeight: '500',
    marginTop: 3,
  },
  priceBox: { alignItems: 'flex-end' },
  deliveryPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  deliveryMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  routeBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    gap: 6,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  routeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  routeLine: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  rejectText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 13,
  },
  acceptBtn: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    gap: 8,
  },
  emptyIcon: { fontSize: 52 },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  emptySub: {
    fontSize: 13,
    color: '#94A3B8',
  },
});

export default RiderDashboard;