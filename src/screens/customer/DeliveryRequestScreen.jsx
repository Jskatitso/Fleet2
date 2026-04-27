import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import colors from '../../constants/colors';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];
const currentYear = new Date().getFullYear();
const YEARS = [currentYear, currentYear + 1];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

const CyclePicker = ({ label, values, value, onChange }) => {
  const index = values.indexOf(value);
  const prev = () => onChange(values[(index - 1 + values.length) % values.length]);
  const next = () => onChange(values[(index + 1) % values.length]);
  return (
    <View style={cycleStyles.wrapper}>
      <Text style={cycleStyles.label}>{label}</Text>
      <View style={cycleStyles.row}>
        <TouchableOpacity onPress={prev} style={cycleStyles.arrow}>
          <Text style={cycleStyles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text style={cycleStyles.value}>{value}</Text>
        <TouchableOpacity onPress={next} style={cycleStyles.arrow}>
          <Text style={cycleStyles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const cycleStyles = StyleSheet.create({
  wrapper: { alignItems: 'center', flex: 1 },
  label: { color: colors.subtext, fontSize: 11, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 6,
  },
  arrow: { paddingHorizontal: 8 },
  arrowText: { color: colors.accent, fontSize: 22, fontWeight: 'bold' },
  value: { color: colors.text, fontSize: 15, fontWeight: 'bold', minWidth: 36, textAlign: 'center' },
});

const DeliveryRequestScreen = ({ navigation, route }) => {
  const initialPackageType = route?.params?.packageType || '';
  const [step, setStep] = useState(initialPackageType ? 2 : 1);
  const [form, setForm] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    packageType: initialPackageType,
    deliveryNote: '',
    recipientName: '',
    recipientPhone: '',
  });
  const [schedule, setSchedule] = useState({
    day: '01',
    month: 'Jan',
    year: String(currentYear),
    hour: '09',
    minute: '00',
    ampm: 'AM',
  });

  const updateField = (field, value) => setForm({ ...form, [field]: value });
  const updateSchedule = (field, value) => setSchedule({ ...schedule, [field]: value });

  const isScheduled = form.packageType === 'Scheduled Delivery';
  const confirmStep = isScheduled ? 4 : 3;
  const stepLabels = isScheduled
    ? ['Location', 'Package', 'Schedule', 'Confirm']
    : ['Location', 'Package', 'Confirm'];

  const scheduledDisplayStr = `${schedule.day} ${schedule.month} ${schedule.year}, ${schedule.hour}:${schedule.minute} ${schedule.ampm}`;

  const packageTypes = [
    { label: 'Small Package', icon: '📦', desc: 'Documents, small items' },
    { label: 'Heavy Load', icon: '🏋️', desc: 'Large or heavy items' },
    { label: 'Urgent Delivery', icon: '⚡', desc: 'Priority fast delivery' },
    { label: 'Scheduled Delivery', icon: '🗓️', desc: 'Choose your date & time' },
  ];

  const handleConfirm = () => {
    console.log('Delivery Request:', form, isScheduled ? schedule : null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>New Delivery</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Step Indicator */}
        <View style={styles.stepRow}>
          {stepLabels.map((label, index) => {
            const s = index + 1;
            return (
              <View key={label} style={styles.stepItem}>
                <View style={[styles.stepDot, step >= s && styles.stepDotActive]}>
                  <Text style={[styles.stepNum, step >= s && styles.stepNumActive]}>{s}</Text>
                </View>
                <Text style={[styles.stepLabel, step === s && styles.stepLabelActive]}>{label}</Text>
              </View>
            );
          })}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Step 1 - Locations */}
          {step === 1 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Where are we picking up from?</Text>

              <Text style={styles.label}>Pickup Location</Text>
              <View style={styles.locationInput}>
                <Text style={styles.locationDot}>🟢</Text>
                <TextInput
                  style={styles.locationTextInput}
                  placeholder="Enter pickup address"
                  placeholderTextColor={colors.subtext}
                  value={form.pickupLocation}
                  onChangeText={(val) => updateField('pickupLocation', val)}
                />
              </View>

              <Text style={styles.label}>Dropoff Location</Text>
              <View style={styles.locationInput}>
                <Text style={styles.locationDot}>🔴</Text>
                <TextInput
                  style={styles.locationTextInput}
                  placeholder="Enter dropoff address"
                  placeholderTextColor={colors.subtext}
                  value={form.dropoffLocation}
                  onChangeText={(val) => updateField('dropoffLocation', val)}
                />
              </View>

              <Text style={styles.label}>Recipient Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Who is receiving the package?"
                placeholderTextColor={colors.subtext}
                value={form.recipientName}
                onChangeText={(val) => updateField('recipientName', val)}
              />

              <Text style={styles.label}>Recipient Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 0241234567"
                placeholderTextColor={colors.subtext}
                value={form.recipientPhone}
                onChangeText={(val) => updateField('recipientPhone', val)}
                keyboardType="phone-pad"
              />

              <TouchableOpacity style={styles.nextButton} onPress={() => setStep(2)}>
                <Text style={styles.nextButtonText}>Next →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2 - Package Type */}
          {step === 2 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>What are you sending?</Text>

              {packageTypes.map((pkg) => (
                <TouchableOpacity
                  key={pkg.label}
                  style={[styles.packageCard, form.packageType === pkg.label && styles.packageCardActive]}
                  onPress={() => updateField('packageType', pkg.label)}
                >
                  <Text style={styles.packageIcon}>{pkg.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.packageLabel}>{pkg.label}</Text>
                    <Text style={styles.packageDesc}>{pkg.desc}</Text>
                  </View>
                  {form.packageType === pkg.label && <Text style={styles.checkMark}>✅</Text>}
                </TouchableOpacity>
              ))}

              <Text style={styles.label}>Delivery Note (optional)</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Any special instructions?"
                placeholderTextColor={colors.subtext}
                value={form.deliveryNote}
                onChangeText={(val) => updateField('deliveryNote', val)}
                multiline
              />

              <View style={styles.stepButtons}>
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => setStep(isScheduled ? 3 : confirmStep)}
                >
                  <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Step 3 - Schedule (only when Scheduled Delivery selected) */}
          {step === 3 && isScheduled && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>When should we deliver?</Text>

              <Text style={styles.label}>Date</Text>
              <View style={styles.pickerRow}>
                <CyclePicker label="Day" values={DAYS} value={schedule.day} onChange={(v) => updateSchedule('day', v)} />
                <CyclePicker label="Month" values={MONTHS} value={schedule.month} onChange={(v) => updateSchedule('month', v)} />
                <CyclePicker label="Year" values={YEARS.map(String)} value={schedule.year} onChange={(v) => updateSchedule('year', v)} />
              </View>

              <Text style={styles.label}>Time</Text>
              <View style={styles.pickerRow}>
                <CyclePicker label="Hour" values={HOURS} value={schedule.hour} onChange={(v) => updateSchedule('hour', v)} />
                <CyclePicker label="Min" values={MINUTES} value={schedule.minute} onChange={(v) => updateSchedule('minute', v)} />
                <CyclePicker label="AM/PM" values={['AM', 'PM']} value={schedule.ampm} onChange={(v) => updateSchedule('ampm', v)} />
              </View>

              <View style={styles.schedulePreview}>
                <Text style={styles.schedulePreviewLabel}>Scheduled for</Text>
                <Text style={styles.schedulePreviewValue}>🗓️  {scheduledDisplayStr}</Text>
              </View>

              <View style={styles.stepButtons}>
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(2)}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() => setStep(4)}>
                  <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Confirm Step */}
          {step === confirmStep && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Confirm your delivery</Text>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>📍 Pickup</Text>
                <Text style={styles.summaryValue}>{form.pickupLocation || 'Not set'}</Text>

                <View style={styles.divider} />

                <Text style={styles.summaryTitle}>📍 Dropoff</Text>
                <Text style={styles.summaryValue}>{form.dropoffLocation || 'Not set'}</Text>

                <View style={styles.divider} />

                <Text style={styles.summaryTitle}>📦 Package Type</Text>
                <Text style={styles.summaryValue}>{form.packageType || 'Not set'}</Text>

                {isScheduled && (
                  <>
                    <View style={styles.divider} />
                    <Text style={styles.summaryTitle}>🗓️ Scheduled For</Text>
                    <Text style={styles.summaryValue}>{scheduledDisplayStr}</Text>
                  </>
                )}

                <View style={styles.divider} />

                <Text style={styles.summaryTitle}>👤 Recipient</Text>
                <Text style={styles.summaryValue}>{form.recipientName || 'Not set'}</Text>

                <View style={styles.divider} />

                <Text style={styles.summaryTitle}>📞 Recipient Phone</Text>
                <Text style={styles.summaryValue}>{form.recipientPhone || 'Not set'}</Text>

                {form.deliveryNote ? (
                  <>
                    <View style={styles.divider} />
                    <Text style={styles.summaryTitle}>📝 Note</Text>
                    <Text style={styles.summaryValue}>{form.deliveryNote}</Text>
                  </>
                ) : null}
              </View>

              <View style={styles.stepButtons}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setStep(isScheduled ? 3 : 2)}
                >
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                  <Text style={styles.confirmButtonText}>
                    {isScheduled ? 'Schedule Delivery' : 'Request Rider'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  stepNum: {
    color: colors.subtext,
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepNumActive: {
    color: colors.primary,
  },
  stepLabel: {
    color: colors.subtext,
    fontSize: 10,
  },
  stepLabelActive: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  stepContent: {
    paddingBottom: 40,
  },
  stepTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  locationInput: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 8,
  },
  locationDot: {
    fontSize: 14,
  },
  locationTextInput: {
    flex: 1,
    color: colors.text,
    paddingVertical: 12,
    fontSize: 14,
  },
  packageCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  packageCardActive: {
    borderColor: colors.accent,
  },
  packageIcon: {
    fontSize: 28,
  },
  packageLabel: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  packageDesc: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 2,
  },
  checkMark: {
    fontSize: 18,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  schedulePreview: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    gap: 6,
  },
  schedulePreviewLabel: {
    color: colors.subtext,
    fontSize: 12,
  },
  schedulePreviewValue: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.subtext,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  summaryTitle: {
    color: colors.subtext,
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 12,
  },
});

export default DeliveryRequestScreen;
