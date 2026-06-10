import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert, Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const { height } = Dimensions.get('window');

const DELIVERY_STEPS = [
  { key: 'heading',    label: 'Heading to Pickup',  icon: '🏍️', desc: 'On the way to pick up package' },
  { key: 'arrived',   label: 'Arrived at Pickup',   icon: '📍', desc: 'Arrived at pickup location' },
  { key: 'picked_up', label: 'Package Picked Up',   icon: '📦', desc: 'Package collected from sender' },
  { key: 'delivered', label: 'Delivered',            icon: '✅', desc: 'Package delivered successfully' },
];

const ActiveDeliveryScreen = ({ navigation, route }) => {
  const delivery = route?.params?.delivery ?? {
    id: '001',
    sender: 'Ama Asante',
    pickup: 'Accra Mall, Spintex',
    dropoff: 'East Legon, A&C Mall',
    package: 'Small Package',
    price: '₵ 35.00',
    distance: '4.2 km',
    eta: '12 min',
    senderPhone: '+233 24 123 4567',
  };

  const [currentStep, setCurrentStep] = useState(0);
  const mapRef = useRef(null);

  // Mock coordinates for Accra area
  // Replace with real geocoded coordinates from API later
  const pickupCoord  = { latitude: 5.6037, longitude: -0.1870 };
  const dropoffCoord = { latitude: 5.6367, longitude: -0.1654 };
  const riderCoord   = { latitude: 5.6100, longitude: -0.1800 };

  const midRegion = {
    latitude: (pickupCoord.latitude + dropoffCoord.latitude) / 2,
    longitude: (pickupCoord.longitude + dropoffCoord.longitude) / 2,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  };

  const nextBtnLabel = () => {
    if (currentStep === 0) return 'Arrived at Pickup ›';
    if (currentStep === 1) return 'Package Picked Up ›';
    if (currentStep === 2) return 'Mark as Delivered ›';
    return 'Complete Delivery';
  };

  const handleNextStep = () => {
    if (currentStep < DELIVERY_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      Alert.alert(
        '🎉 Delivery Complete!',
        `Great job! You earned ${delivery.price} for this delivery.`,
        [{
          text: 'Done',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'RiderTabs' }],
          }),
        }]
      );
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this delivery? Frequent cancellations affect your rating.',
      [
        { text: 'Keep Order', style: 'cancel' },
        {
          text: 'Cancel Order',
          style: 'destructive',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'RiderTabs' }],
          }),
        },
      ]
    );
  };

  const handleFitMap = () => {
    mapRef.current?.fitToCoordinates(
      [pickupCoord, dropoffCoord, riderCoord],
      { edgePadding: { top: 80, right: 40, bottom: 40, left: 40 }, animated: true }
    );
  };

  return (
    <View style={styles.container}>

      {/* ── MAP ── */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={midRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        onMapReady={handleFitMap}
      >
        {/* Rider current position */}
        <Marker coordinate={riderCoord} title="You">
          <View style={styles.riderMarker}>
            <Text style={styles.riderMarkerText}>🏍️</Text>
          </View>
        </Marker>

        {/* Pickup */}
        <Marker coordinate={pickupCoord} title="Pickup" description={delivery.pickup}>
          <View style={styles.pickupMarker}>
            <View style={styles.markerDot} />
          </View>
        </Marker>

        {/* Dropoff */}
        <Marker coordinate={dropoffCoord} title="Drop-off" description={delivery.dropoff}>
          <View style={styles.dropoffMarker}>
            <Text style={styles.dropoffMarkerText}>📍</Text>
          </View>
        </Marker>

        {/* Route line rider → pickup */}
        <Polyline
          coordinates={[riderCoord, pickupCoord]}
          strokeColor="#22C55E"
          strokeWidth={3}
          lineDashPattern={[6, 3]}
        />

        {/* Route line pickup → dropoff */}
        <Polyline
          coordinates={[pickupCoord, dropoffCoord]}
          strokeColor="#0F172A"
          strokeWidth={3}
          lineDashPattern={[6, 3]}
        />
      </MapView>

      {/* ── HEADER OVERLAY ── */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Delivery</Text>
        <View style={styles.orderIdBadge}>
          <Text style={styles.orderIdText}>#{delivery.id}</Text>
        </View>
      </View>

      {/* Fit map button */}
      <TouchableOpacity style={styles.fitMapBtn} onPress={handleFitMap}>
        <Text style={styles.fitMapIcon}>⊕</Text>
      </TouchableOpacity>

      {/* ── BOTTOM SHEET ── */}
      <View style={styles.bottomSheet}>

        {/* Current step banner */}
        <View style={styles.currentStepBanner}>
          <Text style={styles.currentStepIcon}>
            {DELIVERY_STEPS[currentStep].icon}
          </Text>
          <View style={styles.currentStepText}>
            <Text style={styles.currentStepLabel}>
              {DELIVERY_STEPS[currentStep].label}
            </Text>
            <Text style={styles.currentStepDesc}>
              {DELIVERY_STEPS[currentStep].desc}
            </Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* ETA Row */}
          <View style={styles.etaRow}>
            <View style={styles.etaItem}>
              <Text style={styles.etaValue}>{delivery.eta}</Text>
              <Text style={styles.etaLabel}>Est. Time</Text>
            </View>
            <View style={styles.etaDivider} />
            <View style={styles.etaItem}>
              <Text style={styles.etaValue}>{delivery.distance}</Text>
              <Text style={styles.etaLabel}>Distance</Text>
            </View>
            <View style={styles.etaDivider} />
            <View style={styles.etaItem}>
              <Text style={[styles.etaValue, { color: '#22C55E' }]}>
                {delivery.price}
              </Text>
              <Text style={styles.etaLabel}>Earnings</Text>
            </View>
          </View>

          {/* Sender info */}
          <View style={styles.senderCard}>
            <View style={styles.senderAvatar}>
              <Text style={styles.senderAvatarText}>
                {delivery.sender.charAt(0)}
              </Text>
            </View>
            <View style={styles.senderInfo}>
              <Text style={styles.senderName}>{delivery.sender}</Text>
              <Text style={styles.senderPackage}>{delivery.package}</Text>
            </View>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnIcon}>📞</Text>
              <Text style={styles.actionBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnGreen]}>
              <Text style={styles.actionBtnIcon}>💬</Text>
              <Text style={[styles.actionBtnText, { color: '#fff' }]}>Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Route */}
          <View style={styles.routeCard}>
            <View style={styles.routeRow}>
              <View style={styles.greenDot} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeValue}>{delivery.pickup}</Text>
              </View>
            </View>
            <View style={styles.routeConnector} />
            <View style={styles.routeRow}>
              <View style={styles.redDot} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>Drop-off</Text>
                <Text style={styles.routeValue}>{delivery.dropoff}</Text>
              </View>
            </View>
          </View>

          {/* Progress Steps */}
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.stepsCard}>
            {DELIVERY_STEPS.map((step, index) => {
              const isDone   = index < currentStep;
              const isActive = index === currentStep;
              return (
                <View key={step.key} style={styles.stepRow}>
                  <View style={styles.stepLeft}>
                    <View style={[
                      styles.stepDot,
                      isDone   && styles.stepDotDone,
                      isActive && styles.stepDotActive,
                    ]}>
                      {isDone
                        ? <Text style={styles.stepCheck}>✓</Text>
                        : <Text style={styles.stepEmoji}>{step.icon}</Text>
                      }
                    </View>
                    {index < DELIVERY_STEPS.length - 1 && (
                      <View style={[
                        styles.stepLine,
                        isDone && styles.stepLineDone,
                      ]} />
                    )}
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[
                      styles.stepLabel,
                      isDone   && styles.stepLabelDone,
                      isActive && styles.stepLabelActive,
                      !isDone && !isActive && styles.stepLabelPending,
                    ]}>
                      {step.label}
                    </Text>
                    <Text style={styles.stepDesc}>
                      {isDone ? '✓ Completed' : isActive ? '● In progress' : 'Pending'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>✕  Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
              <Text style={styles.nextBtnText}>{nextBtnLabel()}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  // Map
  map: { height: height * 0.45, width: '100%' },

  // Header overlay on map
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 10,
  },
  backBtn: { padding: 4 },
  backIcon: { fontSize: 28, color: '#0F172A', lineHeight: 28 },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#0F172A' },
  orderIdBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  orderIdText: { fontSize: 11, fontWeight: '700', color: '#16A34A' },

  // Fit map button
  fitMapBtn: {
    position: 'absolute',
    top: height * 0.45 - 52,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  fitMapIcon: { fontSize: 20, color: '#0F172A' },

  // Markers
  riderMarker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  riderMarkerText: { fontSize: 20 },
  pickupMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  dropoffMarker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dropoffMarkerText: { fontSize: 24 },

  // Bottom sheet
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Current step banner
  currentStepBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  currentStepIcon: { fontSize: 22 },
  currentStepText: { flex: 1 },
  currentStepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  currentStepDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  liveText: { fontSize: 11, fontWeight: '600', color: '#16A34A' },

  // ETA
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  etaItem: { flex: 1, alignItems: 'center' },
  etaValue: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  etaLabel: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  etaDivider: { width: 1, height: 36, backgroundColor: '#E2E8F0' },

  // Sender
  senderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 14,
  },
  senderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  senderAvatarText: { fontSize: 16, fontWeight: '700', color: '#475569' },
  senderInfo: { flex: 1 },
  senderName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  senderPackage: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  actionBtn: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 2,
  },
  actionBtnGreen: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  actionBtnIcon: { fontSize: 14 },
  actionBtnText: { fontSize: 9, fontWeight: '600', color: '#374151' },

  // Route
  routeCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  greenDot: {
    width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E',
  },
  redDot: {
    width: 12, height: 12, borderRadius: 3, backgroundColor: '#EF4444',
  },
  routeConnector: {
    width: 1, height: 16, backgroundColor: '#CBD5E1', marginLeft: 5, marginVertical: 4,
  },
  routeInfo: { flex: 1 },
  routeLabel: { fontSize: 10, color: '#94A3B8' },
  routeValue: { fontSize: 13, fontWeight: '600', color: '#0F172A' },

  // Steps
  sectionTitle: {
    fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 12,
  },
  stepsCard: { marginBottom: 20 },
  stepRow: { flexDirection: 'row', gap: 12 },
  stepLeft: { alignItems: 'center', width: 32 },
  stepDot: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 2, borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  stepDotActive: { borderColor: '#22C55E', backgroundColor: '#F0FDF4' },
  stepCheck: { color: '#fff', fontWeight: '700', fontSize: 13 },
  stepEmoji: { fontSize: 14 },
  stepLine: {
    width: 2, flex: 1, minHeight: 24,
    backgroundColor: '#E2E8F0', marginVertical: 2,
  },
  stepLineDone: { backgroundColor: '#22C55E' },
  stepContent: { flex: 1, paddingBottom: 20 },
  stepLabel: { fontSize: 13, fontWeight: '600' },
  stepLabelDone: { color: '#22C55E' },
  stepLabelActive: { color: '#0F172A' },
  stepLabelPending: { color: '#94A3B8' },
  stepDesc: { fontSize: 11, color: '#94A3B8', marginTop: 2 },

  // Action buttons
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 50,
    borderWidth: 1.5, borderColor: '#FEE2E2',
    backgroundColor: '#FFF5F5', alignItems: 'center',
  },
  cancelBtnText: { fontSize: 13, fontWeight: '600', color: '#EF4444' },
  nextBtn: {
    flex: 2, paddingVertical: 14, borderRadius: 50,
    backgroundColor: '#0F172A', alignItems: 'center',
  },
  nextBtnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
});

export default ActiveDeliveryScreen;