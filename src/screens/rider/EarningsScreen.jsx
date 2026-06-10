import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';

const history = [
  { id: '001', sender: 'Ama Asante', from: 'Accra Mall', to: 'East Legon', price: '₵ 35.00', date: 'Today, 10:30 AM', status: 'Completed' },
  { id: '002', sender: 'Kofi Boateng', from: 'Tema Station', to: 'Madina', price: '₵ 80.00', date: 'Today, 8:00 AM', status: 'Completed' },
  { id: '003', sender: 'Efua Mensah', from: 'Osu', to: 'Airport', price: '₵ 55.00', date: 'Yesterday, 3:00 PM', status: 'Completed' },
  { id: '004', sender: 'Yaw Darko', from: 'Kaneshie', to: 'Lapaz', price: '₵ 25.00', date: 'Yesterday, 1:00 PM', status: 'Cancelled' },
];

const EarningsScreen = () => {
  const [activeTab, setActiveTab] = useState('earnings');

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.pageTitle}>Earnings</Text>

      {/* Tab Switch */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'earnings' && styles.tabActive]}
          onPress={() => setActiveTab('earnings')}
        >
          <Text style={[styles.tabText, activeTab === 'earnings' && styles.tabTextActive]}>
            Earnings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'earnings' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>₵ 420.00</Text>
            <View style={styles.balanceBtnRow}>
              <TouchableOpacity style={styles.balanceBtn}>
                <Text style={styles.balanceBtnText}>＋  Withdraw</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceBtn}>
                <Text style={styles.balanceBtnText}>↓  Cash Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Deliveries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₵ 1,240</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₵ 4,800</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </View>

          {/* Payout Info */}
          <Text style={styles.sectionTitle}>Payout Method</Text>
          <View style={styles.payoutCard}>
            <View style={styles.payoutRow}>
              <View style={styles.payoutIconBox}>
                <Text style={styles.payoutIcon}>💛</Text>
              </View>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutName}>MTN Mobile Money</Text>
                <Text style={styles.payoutNumber}>054 ••• 4567</Text>
              </View>
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            </View>
          </View>

          {/* Next Payout */}
          <View style={styles.nextPayoutCard}>
            <Text style={styles.nextPayoutIcon}>📅</Text>
            <View>
              <Text style={styles.nextPayoutTitle}>Next Payout</Text>
              <Text style={styles.nextPayoutDate}>Friday, 30 Apr</Text>
            </View>
          </View>

        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyIconBox}>
                <Text style={styles.historyIcon}>
                  {item.status === 'Completed' ? '📦' : '❌'}
                </Text>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historySender}>{item.sender}</Text>
                <Text style={styles.historyRoute}>{item.from} → {item.to}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={[
                  styles.historyPrice,
                  { color: item.status === 'Cancelled' ? '#EF4444' : '#0F172A' },
                ]}>
                  {item.status === 'Cancelled' ? '-' : '+'}{item.price}
                </Text>
                <Text style={[
                  styles.historyStatus,
                  { color: item.status === 'Completed' ? '#22C55E' : '#EF4444' },
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#0F172A',
  },
  tabText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  balanceCard: {
    backgroundColor: '#16A34A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  balanceLabel: {
    color: '#BBF7D0',
    fontSize: 13,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  balanceBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  balanceBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  balanceBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  payoutCard: {
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  payoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  payoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FEF9C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payoutIcon: { fontSize: 18 },
  payoutInfo: { flex: 1 },
  payoutName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  payoutNumber: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
  },
  nextPayoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  nextPayoutIcon: { fontSize: 22 },
  nextPayoutTitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  nextPayoutDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  historyIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyIcon: { fontSize: 18 },
  historyDetails: { flex: 1 },
  historySender: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  historyRoute: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  historyDate: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  historyRight: { alignItems: 'flex-end' },
  historyPrice: {
    fontSize: 13,
    fontWeight: '700',
  },
  historyStatus: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
});

export default EarningsScreen;