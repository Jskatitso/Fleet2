import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';

const TrackOrderScreen = ({ navigation, route }) => {
  const order = route?.params?.order ?? {
    id: 'FLT-8923-XYZ',
    from: '124 Accra Rd, Central',
    to: 'East Legon, near A&C Mall',
    status: 'In Transit',
    price: 'GHS 37.50',
    packageType: 'Package/Box',
    rider: 'Samuel Ofori',
    riderVehicle: 'Toyota Hiace',
    riderPlate: 'GR-452-22',
    riderRating: '4.8',
    riderTrips: '1.2k',
    eta: '12 min',
    distance: '3.5 km',
  };

  const trackingUpdates = [
    {
      id: '1',
      label: 'Order Placed',
      time: '10:23 AM',
      desc: order.from,
      done: true,
    },
    {
      id: '2',
      label: 'Driver Assigned',
      time: '10:25 AM',
      desc: `${order.rider} (${order.riderVehicle})`,
      done: true,
    },
    {
      id: '3',
      label: 'Package Picked Up',
      time: '',
      desc: 'Pending',
      done: false,
    },
    {
      id: '4',
      label: 'Delivered',
      time: '',
      desc: 'Pending',
      done: false,
    },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Tracking</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapPin}>
          <Text style={styles.mapPinIcon}>📍</Text>
          <Text style={styles.mapPinLabel}>Drop-off</Text>
        </View>
        <Text style={styles.mapLabel}>Map View</Text>
      </View>

      {/* Bottom Sheet */}
      <ScrollView style={styles.bottomSheet} showsVerticalScrollIndicator={false}>

        {/* ETA Row */}
        <View style={styles.etaRow}>
          <View>
            <Text style={styles.etaTime}>{order.eta}</Text>
            <Text style={styles.etaSubLabel}>Estimated delivery time</Text>
          </View>
          <View style={styles.etaDivider} />
          <View>
            <Text style={styles.etaTime}>{order.distance}</Text>
            <Text style={styles.etaSubLabel}>Distance remaining</Text>
          </View>
        </View>

        {/* Rider Info */}
        <View style={styles.riderRow}>
          <View style={styles.riderAvatar}>
            <Text style={styles.riderAvatarText}>
              {order.rider.charAt(0)}
            </Text>
          </View>
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>{order.rider}</Text>
            <Text style={styles.riderDetails}>
              {order.riderVehicle} · {order.riderPlate}
            </Text>
            <Text style={styles.riderRating}>⭐ {order.riderRating} · {order.riderTrips} trips</Text>
          </View>
          <View style={styles.riderActions}>
            <TouchableOpacity style={styles.riderActionBtn}>
              <Text style={styles.riderActionIcon}>📞</Text>
              <Text style={styles.riderActionLabel}>Call Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.riderActionBtn, styles.riderActionBtnGreen]}>
              <Text style={styles.riderActionIcon}>💬</Text>
              <Text style={[styles.riderActionLabel, { color: '#fff' }]}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order ID */}
        <View style={styles.orderIdRow}>
          <View style={styles.orderIdLeft}>
            <Text style={styles.orderIdIcon}>📦</Text>
            <Text style={styles.orderIdText}>#{order.id}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.orderIdMenu}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Tracking Updates */}
        <Text style={styles.sectionTitle}>Tracking Updates</Text>
        <View style={styles.timeline}>
          {trackingUpdates.map((update, index) => (
            <View key={update.id} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View style={[
                  styles.timelineDot,
                  update.done ? styles.timelineDotDone : styles.timelineDotPending,
                ]}>
                  {update.done && <Text style={styles.timelineDotCheck}>✓</Text>}
                </View>
                {index < trackingUpdates.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    update.done && styles.timelineLineDone,
                  ]} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineTopRow}>
                  <Text style={[
                    styles.timelineLabel,
                    update.done ? styles.timelineLabelDone : styles.timelineLabelPending,
                  ]}>
                    {update.label}
                  </Text>
                  {update.time ? (
                    <Text style={styles.timelineTime}>{update.time}</Text>
                  ) : null}
                </View>
                <Text style={styles.timelineDesc}>{update.desc}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  backBtn: { padding: 4 },
  backIcon: {
    fontSize: 28,
    color: '#0F172A',
    lineHeight: 28,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
  },
  mapPlaceholder: {
    height: 260,
    backgroundColor: '#E2E8F0',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    right: 80,
  },
  mapPinIcon: {
    fontSize: 28,
  },
  mapPinLabel: {
    fontSize: 10,
    color: '#0F172A',
    fontWeight: '600',
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  mapLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  etaTime: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  etaSubLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  etaDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 14,
  },
  riderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  riderDetails: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  riderRating: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  riderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  riderActionBtn: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 2,
  },
  riderActionBtnGreen: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  riderActionIcon: {
    fontSize: 14,
  },
  riderActionLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#374151',
  },
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  orderIdLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderIdIcon: {
    fontSize: 16,
  },
  orderIdText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  orderIdMenu: {
    fontSize: 18,
    color: '#94A3B8',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  timeline: {
    paddingBottom: 40,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotDone: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  timelineDotPending: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  timelineDotCheck: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  timelineLineDone: {
    backgroundColor: '#22C55E',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
  },
  timelineTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  timelineLabelDone: {
    color: '#0F172A',
  },
  timelineLabelPending: {
    color: '#94A3B8',
  },
  timelineTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  timelineDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default TrackOrderScreen;