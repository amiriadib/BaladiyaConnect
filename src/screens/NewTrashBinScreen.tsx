import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Shadows } from '../theme';

const NewTrashBinScreen = ({ navigation }: { navigation: any }) => {
  const [binType, setBinType] = useState('Standard (240L)');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Waste Bin</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={[styles.heroIconBox, Shadows.medium]}>
            <Icon name="trash-can-outline" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Request a New Bin</Text>
          <Text style={styles.heroSubtitle}>Includes professional delivery and municipal registration fee.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>1. SELECT BIN SPECIFICATION</Text>
          {['Standard (240L)', 'Large (360L)', 'Recycling (Blue)'].map((type) => (
            <TouchableOpacity 
              key={type} 
              style={[
                styles.optionRow, 
                binType === type && { borderColor: Colors.primary, backgroundColor: Colors.primary + '08' }
              ]} 
              onPress={() => setBinType(type)}
            >
              <View style={styles.optionLeft}>
                <Icon 
                  name={binType === type ? "record-circle" : "circle-outline"} 
                  size={24} 
                  color={binType === type ? Colors.primary : Colors.border} 
                />
                <Text style={[styles.optionText, binType === type && { fontWeight: 'bold', color: Colors.primary }]}>
                  {type}
                </Text>
              </View>
              <Text style={styles.optionPrice}>{type.includes('360L') ? '$25.00' : '$15.00'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.priceSummary, Shadows.light]}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Base Processing Fee</Text>
            <Text style={styles.summaryValue}>$15.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery & Setup</Text>
            <Text style={styles.summaryValue}>Free (Included)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>{binType.includes('360L') ? '$25.00' : '$15.00'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>2. DELIVERY ADDRESS</Text>
          <View style={styles.inputContainer}>
            <Icon name="map-marker-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 10 Avenue Habib Bourguiba, Tunis"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.submitBtn, Shadows.medium]}>
          <Text style={styles.submitBtnText}>PLACE SECURE ORDER</Text>
          <Icon name="lock-check-outline" size={20} color={Colors.white} />
        </TouchableOpacity>
        
        <Text style={styles.disclaimer}>
          Billing will be applied to your municipal utility account.
        </Text>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1, 
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  scrollContent: { padding: 25 },
  heroSection: {
    alignItems: 'center',
    marginBottom: 35,
  },
  heroIconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  heroSubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  section: { marginBottom: 30 },
  label: { fontSize: 12, fontWeight: 'bold', color: Colors.primary, letterSpacing: 1.5, marginBottom: 15 },
  optionRow: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15, 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: '#F5F7FA', 
    marginBottom: 10 
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontSize: 15, color: Colors.text, marginLeft: 15 },
  optionPrice: { fontSize: 14, fontWeight: '700', color: Colors.text },
  priceSummary: {
    backgroundColor: '#F5F7FA',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: Colors.textSecondary },
  summaryValue: { fontSize: 13, color: Colors.text, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#DDD', marginVertical: 12 },
  totalLabel: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ECEFF1',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 14, color: Colors.text },
  submitBtn: { 
    backgroundColor: Colors.primary, 
    flexDirection: 'row',
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16, marginRight: 10, letterSpacing: 1 },
  disclaimer: { textAlign: 'center', fontSize: 11, color: Colors.textSecondary, marginTop: 15, fontStyle: 'italic' },
});

export default NewTrashBinScreen;
