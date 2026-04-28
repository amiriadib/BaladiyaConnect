import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Shadows } from '../theme';

const { width } = Dimensions.get('window');

const ServiceDetailScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const service = {
    title: 'Public Safety & Fire',
    description: 'Services de secours, prévention d\'incendie et programmes de sécurité communautaire gérés par les divisions municipales nationales.',
    status: 'OPERATIONAL',
    hours: '24 / 7 Emergency Response',
    contact: 'Call 911 or Municipal Hotline',
    highlights: [
      'Rapid Fire Response',
      'Community Safety Patrols',
      'Disaster Readiness',
      'Hydrant Maintenance',
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <Icon name="shield-check" size={60} color={Colors.white} />
          <Text style={styles.heroTitle}>{service.title}</Text>
          <View style={styles.statusBadge}>
            <Icon name="check-circle" size={14} color={Colors.white} />
            <Text style={styles.statusText}>{service.status}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.descriptionText}>{service.description}</Text>
        </View>

        <View style={styles.cardRow}>
          <View style={[styles.infoCard, Shadows.light]}>
            <Icon name="clock-outline" size={24} color={Colors.primary} />
            <Text style={styles.infoLabel}>AVAILABILITY</Text>
            <Text style={styles.infoValue}>{service.hours}</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={[styles.infoCard, Shadows.light]}>
            <Icon name="phone-outline" size={24} color={Colors.primary} />
            <Text style={styles.infoLabel}>CONTACT</Text>
            <Text style={styles.infoValue}>{service.contact}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Highlights</Text>
          {service.highlights.map((item, idx) => (
            <View key={idx} style={styles.highlightItem}>
              <Icon name="check-bold" size={18} color={Colors.success} />
              <Text style={styles.highlightText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.primaryBtn, Shadows.medium]}>
          <Text style={styles.primaryBtnText}>REQUEST SAFETY INSPECTION</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>DOWNLOAD SAFETY GUIDES</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 15,
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  cardRow: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    marginTop: 10,
    marginBottom: 5,
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 15,
    color: Colors.text,
    marginLeft: 15,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  primaryBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  secondaryBtn: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ServiceDetailScreen;
