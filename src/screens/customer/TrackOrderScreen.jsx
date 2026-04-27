import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';

const STEPS = [
  { key: 'placed',   label: 'Order Placed',       icon: '📋', desc: 'Your order has been received' },
  { key: 'assigned', label: 'Rider Assigned',      icon: '🏍️', desc: 'A rider has been assigned' },
  { key: 'pickup',   label: 'Package Picked Up',   icon: '📦', desc: 'Rider collected your package' },
  { key: 'transit',  label: 'In Transit',          icon: '🚚', desc: 'Your package is on the way' },
  { key: 'delivered',label: 'Delivered',           icon: '✅', desc: 'Package delivered successfully' },
];

const STATUS_STEP = {
  'Order Placed':   0,
  'Rider Assigned': 1,
  'Picked Up':      2,
  'In Transit':     3,
  'Delivered':      4,
};

const MOCK_TIMESTAMPS = [
  'Today, 8:00 AM',
  'Today, 8:12 AM',
  'Today, 8:45 AM',
  'Today, 9:10 AM',
  null,
];

const TrackOrderScreen = ({ navigation, route }) => {
  const order = route?.params?.order ?? {
    id: 'FLT-002',
    from: 'Tema Station',
    to: 'Madina Market',
    status: 'In Transit',
    price: 'GHS 80.00',
    packageType: 'Heavy Load',
    rider: 'Kofi B.',
    riderRating: '4.7',
    riderPhone: '0551234567',
  };

  const activeIndex = STATUS_STEP[order.status] ?? 3;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Track Order</Text>
        <Text style={styles.orderId}>{order.id}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Route Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <Text style={styles.routeDot}>🟢</Text>
            <View>
              <Text style={styles.routeLabel}>Pickup</Text>
              <Text style={styles.routeValue}>{order.from}</Text>
            </View>
          </View>
          <View style={styles.routeDivider} />
          <View style={styles.routeRow}>
            <Text style={styles.routeDot}>🔴</Text>
            <View>
              <Text style={styles.routeLabel}>Dropoff</Text>
              <Text style={styles.routeValue}>{order.to}</Text>
            </View>
          </View>
        </View>

        {/* ETA Banner */}
        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
          <View style={styles.etaBanner}>
            <Text style={styles.etaLabel}>Estimated Arrival</Text>
            <Text style={styles.etaValue}>~25 minutes</Text>
          </View>
        )}

        {/* Timeline */}
        <Text style={styles.sectionTitle}>Delivery Status</Text>
        <View style={styles.timeline}>
          {STEPS.map((step, index) => {
            const isCompleted = index < activeIndex;
            const isActive    = index === activeIndex;
            const isPending   = index > activeIndex;

            return (
              <View key={step.key} style={styles.timelineRow}>

                {/* Left column: dot + line */}
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.dot,
                    isCompleted && styles.dotCompleted,
                    isActive    && styles.dotActive,
                    isPending   && styles.dotPending,
                  ]}>
                    {isCompleted && <Text style={styles.dotCheck}>✓</Text>}
                    {isActive    && <View style={styles.dotPulse} />}
                  </View>
                  {index < STEPS.length - 1 && (
                    <View style={[styles.line, isCompleted && styles.lineCompleted]} />
                  )}
                </View>

                {/* Right column: text */}
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={[
                      styles.stepLabel,
                      isCompleted && styles.stepLabelDone,
                      isActive    && styles.stepLabelActive,
                      isPending   && styles.stepLabelPending,
                    ]}>
                      {step.icon}  {step.label}
                    </Text>
                    {isActive && (
                      <View style={styles.activeBadge}>
                        <Text style={styles.activeBadgeText}>Live</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.stepDesc}>
                    {isPending ? 'Pending' : MOCK_TIMESTAMPS[index] ?? step.desc}
                  </Text>
                </View>

              </View>
            );
          })}
        </View>

        {/* Rider Info */}
        {order.status !== 'Cancelled' && (
          <View style={styles.riderCard}>
            <Text style={styles.sectionTitle}>Your Rider</Text>
            <View style={styles.riderRow}>
              <View style={styles.riderAvatar}>
                <Text style={styles.riderAvatarText}>{order.rider?.charAt(0)}</Text>
              </View>
              <View style={styles.riderInfo}>
                <Text style={styles.riderName}>{order.rider}</Text>
                <Text style={styles.riderRating}>⭐ {order.riderRating ?? '4.8'} · {order.packageType}</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callIcon}>📞</Text>
              </TouchableOpacity>
            </View>
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
  backText: {
    color: colors.accent,
    fontSize: 14,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderId: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: 'bold',
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeDot: {
    fontSize: 14,
  },
  routeLabel: {
    color: colors.subtext,
    fontSize: 11,
    marginBottom: 2,
  },
  routeValue: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  routeDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.secondary,
    marginLeft: 7,
    marginVertical: 4,
  },
  etaBanner: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: 24,
  },
  etaLabel: {
    color: colors.subtext,
    fontSize: 13,
  },
  etaValue: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeline: {
    marginBottom: 24,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 28,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  dotCompleted: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  dotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
  },
  dotPending: {
    backgroundColor: colors.surface,
    borderColor: colors.secondary,
  },
  dotCheck: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  dotPulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 32,
    backgroundColor: colors.secondary,
    marginVertical: 2,
  },
  lineCompleted: {
    backgroundColor: colors.accent,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLabelDone: {
    color: colors.accent,
  },
  stepLabelActive: {
    color: colors.text,
  },
  stepLabelPending: {
    color: colors.subtext,
  },
  activeBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  stepDesc: {
    color: colors.subtext,
    fontSize: 12,
  },
  riderCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riderAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riderAvatarText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  riderRating: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 2,
  },
  callButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 10,
    padding: 10,
  },
  callIcon: {
    fontSize: 18,
  },
});

export default TrackOrderScreen;
