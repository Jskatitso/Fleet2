import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import colors from '../../constants/colors';

const EarningsScreen = () => {
  const [activeTab, setActiveTab] = useState('earnings');

  const history = [
    { id: '001', sender: 'Ama Asante', from: 'Accra Mall', to: 'East Legon', price: 'GHS 35.00', date: 'Today, 10:30AM', status: 'Completed' },
    { id: '002', sender: 'Kofi Boateng', from: 'Tema Station', to: 'Madina', price: 'GHS 80.00', date: 'Today, 8:00AM', status: 'Completed' },
    { id: '003', sender: 'Efua Mensah', from: 'Osu', to: 'Airport', price: 'GHS 55.00', date: 'Yesterday, 3:00PM', status: 'Completed' },
    { id: '004', sender: 'Yaw Darko', from: 'Kaneshie', to: 'Lapaz', price: 'GHS 25.00', date: 'Yesterday, 1:00PM', status: 'Cancelled' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Earnings & History</Text>

      {/* Tab Switch */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'earnings' && styles.activeTab]}
          onPress={() => setActiveTab('earnings')}
        >
          <Text style={[styles.tabText, activeTab === 'earnings' && styles.activeTabText]}>
            Earnings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'earnings' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Earnings Summary */}
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>Total Earnings Today</Text>
            <Text style={styles.earningsValue}>GHS 420.00</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Deliveries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>GHS 1,240</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>GHS 4,800</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </View>

          {/* Payout Info */}
          <View style={styles.payoutCard}>
            <Text style={styles.payoutTitle}>💰 Payout Info</Text>
            <Text style={styles.payoutText}>MoMo Number: 024 123 4567</Text>
            <Text style={styles.payoutText}>Next Payout: Friday, 30 Apr</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historySender}>{item.sender}</Text>
                <Text style={[
                  styles.historyStatus,
                  { color: item.status === 'Completed' ? colors.accent : colors.error }
                ]}>
                  {item.status}
                </Text>
              </View>
              <Text style={styles.historyRoute}>{item.from} → {item.to}</Text>
              <View style={styles.historyFooter}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyPrice}>{item.price}</Text>
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
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.accent,
  },
  tabText: {
    color: colors.subtext,
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeTabText: {
    color: colors.primary,
  },
  earningsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  earningsLabel: {
    color: colors.subtext,
    fontSize: 13,
    marginBottom: 8,
  },
  earningsValue: {
    color: colors.accent,
    fontSize: 36,
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
    color: colors.text,
    fontSize: 13,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.subtext,
    fontSize: 11,
    marginTop: 4,
  },
  payoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 6,
  },
  payoutTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  payoutText: {
    color: colors.subtext,
    fontSize: 13,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  historySender: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  historyStatus: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  historyRoute: {
    color: colors.subtext,
    fontSize: 12,
    marginBottom: 8,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyDate: {
    color: colors.subtext,
    fontSize: 11,
  },
  historyPrice: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default EarningsScreen;