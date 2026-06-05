import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const CustomerDashboard = ({ navigation }) => {
  const recentOrders = [
    {
      id: '1',
      icon: '📦',
      title: 'Package delivery to Osu',
      time: 'Today, 10:30 AM',
      price: '₵ 45.00',
      status: 'Delivered',
    },
    {
      id: '2',
      icon: '📍',
      title: 'Food from Burger King',
      time: 'Yesterday, 1:15 PM',
      price: '₵ 62.50',
      status: 'Delivered',
    },
    {
      id: '3',
      icon: '🚗',
      title: 'Ride to Kotoka Airport',
      time: 'Oct 24, 08:00 AM',
      price: '₵ 80.00',
      status: 'Completed',
    },
  ];

  const restaurants = [
    {
      id: '1',
      name: 'Burger King',
      type: 'Fast Food',
      distance: '50m',
      rating: '4.8',
      image: require('../../../assets/burger.png'),
    },
    {
      id: '2',
      name: 'KFC Osu',
      type: 'Chicken',
      distance: '80m',
      rating: '4.5',
      image: require('../../../assets/kfc.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>Kwame Mensah</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>KM</Text>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Request')}
          activeOpacity={0.8}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <View style={styles.searchTextContainer}>
            <Text style={styles.searchLabel}>Where to?</Text>
            <Text style={styles.searchSub}>Enter drop-off destination</Text>
          </View>
          <Text style={styles.locationPin}>📍</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionCardGreen}
            onPress={() => navigation.navigate('Request')}
          >
            <Text style={styles.actionIconGreen}>📦</Text>
            <Text style={styles.actionTitleGreen}>Send Package</Text>
            <Text style={styles.actionSubGreen}>Fast & Secure</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCardWhite}>
            <Text style={styles.actionIconWhite}>🚗</Text>
            <Text style={styles.actionTitleWhite}>Book Ride</Text>
            <Text style={styles.actionSubWhite}>Travel anywhere</Text>
          </TouchableOpacity>
        </View>

        {/* Top Restaurants */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionTitle}>Top Restaurants</Text>
            <View style={styles.nearYouBadge}>
              <Text style={styles.nearYouText}>Near You</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantRow}>
          {restaurants.map((r) => (
            <View key={r.id} style={styles.restaurantCard}>
              <View style={styles.restaurantImage}>
                <Image
                  source={r.image}
                  style={styles.restaurantImg}
                  resizeMode="cover"
                />
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {r.rating}</Text>
                </View>
              </View>
              <Text style={styles.restaurantName}>{r.name}</Text>
              <Text style={styles.restaurantType}>{r.type}</Text>
              <Text style={styles.restaurantDist}>📍 {r.distance}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Recent Orders */}
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Recent Orders</Text>
        {recentOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('TrackOrder')}
          >
            <View style={styles.orderIconBox}>
              <Text style={styles.orderIcon}>{order.icon}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderTitle}>{order.title}</Text>
              <Text style={styles.orderTime}>{order.time}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderPrice}>{order.price}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Request')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 100,
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
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    gap: 10,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  searchSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  locationPin: {
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionCardGreen: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 14,
    padding: 16,
    gap: 4,
  },
  actionIconGreen: {
    fontSize: 22,
    marginBottom: 4,
  },
  actionTitleGreen: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionSubGreen: {
    fontSize: 11,
    color: '#BBF7D0',
  },
  actionCardWhite: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionIconWhite: {
    fontSize: 22,
    marginBottom: 4,
  },
  actionTitleWhite: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  actionSubWhite: {
    fontSize: 11,
    color: '#94A3B8',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  nearYouBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  nearYouText: {
    fontSize: 10,
    color: '#22C55E',
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '500',
  },
  restaurantRow: {
    marginBottom: 24,
  },
  restaurantCard: {
    width: 140,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  restaurantImage: {
    height: 80,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  restaurantImg: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: '600',
  },
  restaurantName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  restaurantType: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  restaurantDist: {
    fontSize: 10,
    color: '#22C55E',
    marginTop: 3,
    fontWeight: '500',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  orderIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderIcon: {
    fontSize: 18,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  orderTime: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  orderStatus: {
    fontSize: 11,
    color: '#22C55E',
    marginTop: 2,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 26,
  },
});

export default CustomerDashboard;