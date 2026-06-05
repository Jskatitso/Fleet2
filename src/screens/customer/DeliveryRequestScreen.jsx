import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';

const packageTypes = [
  { label: 'Document', icon: '📄' },
  { label: 'Package/Box', icon: '📦' },
  { label: 'Food', icon: '🍔' },
  { label: 'Fragile', icon: '⚠️' },
];

const DeliveryRequestScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    pickupLocation: 'Current Location',
    dropoffLocation: '',
    packageType: 'Package/Box',
    weight: '',
    size: '',
    notes: '',
  });

  const updateField = (field, value) => setForm({ ...form, [field]: value });

  const handleContinue = () => {
    console.log('Delivery form:', form);
    // navigate to vehicle selection or estimates
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Delivery</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Location Details */}
          <Text style={styles.sectionTitle}>Location Details</Text>
          <View style={styles.locationCard}>

            {/* Pickup */}
            <View style={styles.locationRow}>
              <View style={styles.greenDot} />
              <View style={styles.locationInputBox}>
                <Text style={styles.locationLabel}>Pickup Location</Text>
                <TextInput
                  style={styles.locationInput}
                  value={form.pickupLocation}
                  onChangeText={(val) => updateField('pickupLocation', val)}
                  placeholder="Enter pickup location"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text style={styles.locationArrow}>⊙</Text>
            </View>

            {/* Restaurant badge */}
            <TouchableOpacity style={styles.restaurantBadge}>
              <Text style={styles.restaurantBadgeText}>🏬  Top restaurants (nearest within 100m)</Text>
            </TouchableOpacity>

            <View style={styles.locationDivider} />

            {/* Dropoff */}
            <View style={styles.locationRow}>
              <View style={styles.redDot} />
              <View style={styles.locationInputBox}>
                <Text style={styles.locationLabel}>Drop-off Location</Text>
                <TextInput
                  style={styles.locationInput}
                  value={form.dropoffLocation}
                  onChangeText={(val) => updateField('dropoffLocation', val)}
                  placeholder="Where are we delivering to?"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Package Details */}
          <Text style={styles.sectionTitle}>Package Details</Text>
          <View style={styles.card}>
            <Text style={styles.cardSubLabel}>What are you sending?</Text>

            <View style={styles.packageGrid}>
              {packageTypes.map((pkg) => (
                <TouchableOpacity
                  key={pkg.label}
                  style={[
                    styles.packageTypeBtn,
                    form.packageType === pkg.label && styles.packageTypeBtnActive,
                  ]}
                  onPress={() => updateField('packageType', pkg.label)}
                >
                  <Text style={styles.packageTypeIcon}>{pkg.icon}</Text>
                  <Text style={[
                    styles.packageTypeLabel,
                    form.packageType === pkg.label && styles.packageTypeLabelActive,
                  ]}>
                    {pkg.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Weight & Size */}
            <View style={styles.twoColRow}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Est. Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 5"
                  placeholderTextColor="#9CA3AF"
                  value={form.weight}
                  onChangeText={(val) => updateField('weight', val)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Size (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="L x W x H"
                  placeholderTextColor="#9CA3AF"
                  value={form.size}
                  onChangeText={(val) => updateField('size', val)}
                />
              </View>
            </View>
          </View>

          {/* Additional Information */}
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <View style={styles.card}>

            {/* Photos */}
            <Text style={styles.inputLabel}>Package Photos (Optional)</Text>
            <TouchableOpacity style={styles.photoUploadBox}>
              <Text style={styles.photoUploadIcon}>📷</Text>
              <Text style={styles.photoUploadTitle}>Add Photos</Text>
              <Text style={styles.photoUploadSub}>Help the rider identify the package</Text>
            </TouchableOpacity>

            {/* Notes */}
            <Text style={[styles.inputLabel, { marginTop: 16 }]}>Notes for Rider</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="e.g. Handle with care, call upon arrival..."
              placeholderTextColor="#9CA3AF"
              value={form.notes}
              onChangeText={(val) => updateField('notes', val)}
              multiline
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueBtnText}>Continue to Estimates</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
  scroll: {
    padding: 20,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
    marginTop: 20,
  },
  locationCard: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },
  redDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  locationInputBox: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 2,
  },
  locationInput: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  locationArrow: {
    fontSize: 18,
    color: '#22C55E',
  },
  restaurantBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginLeft: 22,
  },
  restaurantBadgeText: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '500',
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
  },
  cardSubLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  packageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  packageTypeBtn: {
    width: '47%',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
  },
  packageTypeBtnActive: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  packageTypeIcon: {
    fontSize: 22,
  },
  packageTypeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  packageTypeLabelActive: {
    color: '#16A34A',
    fontWeight: '700',
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  photoUploadBox: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
  },
  photoUploadIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  photoUploadTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  photoUploadSub: {
    fontSize: 11,
    color: '#94A3B8',
  },
  notesInput: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
    height: 80,
    textAlignVertical: 'top',
  },
  continueBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DeliveryRequestScreen;