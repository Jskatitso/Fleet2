import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';

const ALL_DELIVERIES = [
  {
    id: 'FLT-001',
    from: 'Accra Mall, Spintex',
    to: 'East Legon, A&C Mall',
    status: 'Delivered',
    date: 'Today, 10:30 AM',
    price: 'GHS 35.00',
    packageType: 'Small Package',
    rider: 'Kwame A.',
  },
  {
    id: 'FLT-002',
    from: 'Tema Station',
    to: 'Madina Market',
    status: 'In Transit',
    date: 'Today, 8:00 AM',
    price: 'GHS 80.00',
    packageType: 'Heavy Load',
    rider: 'Kofi B.',
  },
  {
    id: 'FLT-003',
    from: 'Osu Oxford Street',
    to: 'Airport Residential',
    status: 'Delivered',
    date: 'Yesterday, 3:00 PM',
    price: 'GHS 55.00',
    packageType: 'Urgent Delivery',
    rider: 'Ama S.',
  },
  {
    id: 'FLT-004',
    from: 'Kaneshie Market',
    to: 'Lapaz, Shell Junction',
    status: 'Cancelled',
    date: 'Apr 25, 1:15 PM',
    price: 'GHS 40.00',
    packageType: 'Small Package',
    rider: 'N/A',
  },
  {
    id: 'FLT-005',
    from: 'University of Ghana',
    to: 'Adenta Housing Down',
    status: 'Delivered',
    date: 'Apr 24, 11:00 AM',
    price: 'GHS 60.00',
    packageType: 'Small Package',
    rider: 'Yaw M.',
  },
];

const FILTERS = ['All', 'Delivered', 'In Transit', 'Cancelled'];

const statusColor = (status) => {
  if (status === 'Delivered') return colors.accent;
  if (status === 'In Transit') return '#F5A623';
  if (status === 'Cancelled') return colors.error;
  return colors.subtext;
};

const statusIcon = (status) => {
  if (status === 'Delivered') return '✅';
  if (status === 'In Transit') return '🚚';
  if (status === 'Cancelled') return '❌';
  return '📦';
};

const CustomerHistoryScreen = ({ route, navigation }) => {
  const [activeFilter, setActiveFilter] = useState(route?.params?.filter || 'All');
  const [expanded, setExpanded] = useState(null);

  const filtered = activeFilter === 'All'
    ? ALL_DELIVERIES
    : ALL_DELIVERIES.filter((d) => d.status === activeFilter);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isOpen = expanded === item.id;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.85}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={[styles.statusBadge, { color: statusColor(item.status) }]}>
              {statusIcon(item.status)} {item.status}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>

        <View style={styles.routeRow}>
          <Text style={styles.routeDot}>🟢</Text>
          <Text style={styles.routeText} numberOfLines={1}>{item.from}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}>
          <Text style={styles.routeDot}>🔴</Text>
          <Text style={styles.routeText} numberOfLines={1}>{item.to}</Text>
        </View>

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
                style={styles.trackButton}
                onPress={() => navigation.navigate('TrackOrder', { order: item })}
              >
                <Text style={styles.trackText}>📍 Track Order</Text>
              </TouchableOpacity>
            )}
            {item.status === 'Delivered' && (
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderText}>🔁 Reorder</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery History</Text>

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

      {/* Summary */}
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
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
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
  resultCount: {
    color: colors.subtext,
    fontSize: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLeft: {
    gap: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  orderId: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 13,
  },
  date: {
    color: colors.subtext,
    fontSize: 11,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 13,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDot: {
    fontSize: 10,
  },
  routeText: {
    color: colors.text,
    fontSize: 13,
    flex: 1,
  },
  routeLine: {
    width: 1,
    height: 10,
    backgroundColor: colors.secondary,
    marginLeft: 6,
    marginVertical: 2,
  },
  details: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: colors.subtext,
    fontSize: 13,
  },
  detailValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: 'bold',
  },
  trackButton: {
    marginTop: 10,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  trackText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  reorderButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  reorderText: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 14,
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

export default CustomerHistoryScreen;
