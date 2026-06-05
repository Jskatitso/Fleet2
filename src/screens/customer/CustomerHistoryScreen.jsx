import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';

const ALL_DELIVERIES = [
  {
    id: 'FLT-001',
    from: 'Accra Mall, Spintex',
    to: 'East Legon, A&C Mall',
    status: 'Delivered',
    date: 'Today, 10:30 AM',
    price: '₵ 35.00',
    packageType: 'Small Package',
    rider: 'Kwame A.',
  },
  {
    id: 'FLT-002',
    from: 'Tema Station',
    to: 'Madina Market',
    status: 'In Transit',
    date: 'Today, 8:00 AM',
    price: '₵ 80.00',
    packageType: 'Heavy Load',
    rider: 'Kofi B.',
  },
  {
    id: 'FLT-003',
    from: 'Osu Oxford Street',
    to: 'Airport Residential',
    status: 'Delivered',
    date: 'Yesterday, 3:00 PM',
    price: '₵ 55.00',
    packageType: 'Urgent Delivery',
    rider: 'Ama S.',
  },
  {
    id: 'FLT-004',
    from: 'Kaneshie Market',
    to: 'Lapaz, Shell Junction',
    status: 'Cancelled',
    date: 'Apr 25, 1:15 PM',
    price: '₵ 40.00',
    packageType: 'Small Package',
    rider: 'N/A',
  },
  {
    id: 'FLT-005',
    from: 'University of Ghana',
    to: 'Adenta Housing Down',
    status: 'Delivered',
    date: 'Apr 24, 11:00 AM',
    price: '₵ 60.00',
    packageType: 'Small Package',
    rider: 'Yaw M.',
  },
];

const FILTERS = ['All', 'Delivered', 'In Transit', 'Cancelled'];

const statusConfig = {
  Delivered:  { color: '#22C55E', bg: '#F0FDF4', icon: '✅' },
  'In Transit': { color: '#F97316', bg: '#FFF7ED', icon: '🚚' },
  Cancelled:  { color: '#EF4444', bg: '#FEF2F2', icon: '❌' },
};

const CustomerHistoryScreen = ({ route, navigation }) => {
  const [activeFilter, setActiveFilter] = useState(route?.params?.filter || 'All');
  const [expanded, setExpanded] = useState(null);

  const filtered = activeFilter === 'All'
    ? ALL_DELIVERIES
    : ALL_DELIVERIES.filter((d) => d.status === activeFilter);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const renderItem = ({ item }) => {
    const isOpen = expanded === item.id;
    const cfg = statusConfig[item.status] || {};

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.85}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.cardRight}>
            <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
              <Text style={[styles.statusText, { color: cfg.color }]}>
                {cfg.icon} {item.status}
              </Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>

        {/* Route */}
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <View style={styles.greenDot} />
            <Text style={styles.routeText} numberOfLines={1}>{item.from}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}>
            <View style={styles.redDot} />
            <Text style={styles.routeText} numberOfLines={1}>{item.to}</Text>
          </View>
        </View>

        {/* Expanded Details */}
        {isOpen && (
          <View style={styles.details}>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Package Type</Text>
              <Text style={styles.detailValue}>{item.packageType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Rider</Text>
              <Text style={styles.detailValue}>{item.rider}</Text>
            </View>
            {item.status === 'In Transit' && (
              <TouchableOpacity
                style={styles.trackBtn}
                onPress={() => navigation.navigate('TrackOrder', { order: item })}
              >
                <Text style={styles.trackBtnText}>📍  Track Order</Text>
              </TouchableOpacity>
            )}
            {item.status === 'Delivered' && (
              <TouchableOpacity style={styles.reorderBtn}>
                <Text style={styles.reorderBtnText}>🔁  Reorder</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.pageTitle}>Delivery History</Text>

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

      <Text style={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? 'delivery' : 'deliveries'}
      </Text>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No deliveries found</Text>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
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
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  filterText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultCount: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  orderId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22C55E',
  },
  date: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  routeContainer: {
    gap: 4,
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
    fontSize: 13,
    color: '#374151',
    flex: 1,
    fontWeight: '500',
  },
  routeLine: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    marginLeft: 4,
  },
  details: {
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  trackBtn: {
    marginTop: 10,
    backgroundColor: '#0F172A',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  reorderBtn: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reorderBtnText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 13,
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
    fontSize: 15,
    color: '#94A3B8',
  },
});

export default CustomerHistoryScreen;