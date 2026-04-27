import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch
} from 'react-native';
import colors from '../../constants/colors';

const RiderDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  const pendingDeliveries = [
    {
      id: '001',
      sender: 'Ama Asante',
      pickup: 'Accra Mall, Spintex',
      dropoff: 'East Legon, A&C Mall',
      package: 'Small Package',
      price: 'GHS 35.00',
    },
    {
      id: '002',
      sender: 'Kofi Boateng',
      pickup: 'Tema Station',
      dropoff: 'Madina Market',
      package: 'Heavy Load',
      price: 'GHS 80.00',
    },
    {
      id: '003',
      sender: 'Efua Mensah',
      pickup: 'Osu Oxford Street',
      dropoff: 'Airport Residential',
      package: 'Urgent Delivery',
      price: 'GHS 55.00',
    },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.riderName}>Rider Dashboard</Text>
        </View>
        <View style={styles.onlineToggle}>
          <Text style={[styles.onlineText, { color: isOnline ? colors.accent : colors.subtext }]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: colors.surface, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>GHS 420</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.8 ⭐</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Status Banner */}
      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineBannerText}>
            You are offline. Go online to receive delivery requests.
          </Text>
        </View>
      )}

      {/* Pending Deliveries */}
      <Text style={styles.sectionTitle}>Pending Requests</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isOnline ? (
          pendingDeliveries.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Text style={styles.senderName}>{delivery.sender}</Text>
                <Text style={styles.deliveryPrice}>{delivery.price}</Text>
              </View>

              <View style={styles.deliveryRoute}>
                <View style={styles.routeItem}>
                  <View style={[styles.routeDot, { backgroundColor: colors.accent }]} />
                  <Text style={styles.routeText}>{delivery.pickup}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeItem}>
                  <View style={[styles.routeDot, { backgroundColor: colors.error }]} />
                  <Text style={styles.routeText}>{delivery.dropoff}</Text>
                </View>
              </View>

              <View style={styles.packageTag}>
                <Text style={styles.packageTagText}>{delivery.package}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.rejectButton}>
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏍️</Text>
            <Text style={styles.emptyText}>Go online to see delivery requests</Text>
          </View>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: colors.subtext,
    fontSize: 13,
  },
  riderName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  onlineToggle: {
    alignItems: 'center',
    gap: 4,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  statValue: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.subtext,
    fontSize: 11,
    marginTop: 4,
  },
  offlineBanner: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
  },
  offlineBannerText: {
    color: colors.subtext,
    fontSize: 13,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deliveryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  senderName: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  deliveryPrice: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 15,
  },
  deliveryRoute: {
    marginBottom: 10,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  routeText: {
    color: colors.text,
    fontSize: 12,
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.secondary,
    marginLeft: 5,
    marginBottom: 4,
  },
  packageTag: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  packageTagText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  rejectText: {
    color: colors.error,
    fontWeight: 'bold',
    fontSize: 14,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  acceptText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 12,
  },
  emptyText: {
    color: colors.subtext,
    fontSize: 14,
  },
});

export default RiderDashboard;