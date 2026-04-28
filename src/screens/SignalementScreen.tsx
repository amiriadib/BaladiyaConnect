import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera } from 'react-native-image-picker';
import Animated, { 
  FadeInDown, 
  Layout, 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming, 
  withDelay,
  Easing
} from 'react-native-reanimated';
import { Colors, Shadows, Typography } from '../theme';
import { AnimatedButton } from '../components/AnimatedButton';
import { ReportingService } from '../services/reportingService';

const SignalementScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const [description, setDescription] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isDeduplicating, setIsDeduplicating] = useState<boolean>(false);
  const [duplicateFound, setDuplicateFound] = useState<boolean>(false);

  const handleCameraCapture = async () => {
    // Mode démo statique pour montrer l'IA sans crasher sur les émulateurs/vieux téléphones
    setIsScanning(true);
    setTimeout(() => {
      setImageUri('https://images.unsplash.com/photo-1595278455139-4cedb72ebce6?q=80&w=1000');
      startAIScan();
    }, 800);
  };

  const startAIScan = () => {
    setIsScanning(true);
    // Simulate AI Detection (Mocked for Demo)
    setTimeout(() => {
      setSelectedType('Déchets');
      setDescription('Analyse AI : Zone de déchets détectée avec précision.');
      setIsScanning(false);
      
      setIsDeduplicating(true);
    }, 1500);
  };

  const scanLineY = useSharedValue(0);
  const badgeScale = useSharedValue(1);

  useEffect(() => {
    if (isScanning) {
      scanLineY.value = withRepeat(
        withSequence(
          withTiming(220, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
      badgeScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        true
      );
    } else {
      scanLineY.value = 0;
      badgeScale.value = 1;
    }
  }, [isScanning]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
    opacity: isScanning ? 1 : 0,
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const incidentTypes = [
    { id: '1', label: 'Déchets', icon: 'trash-can-outline', color: Colors.error },
    { id: '2', label: 'Routes', icon: 'road-variant', color: Colors.warning },
    { id: '3', label: 'Éclairage', icon: 'lightbulb-outline', color: '#FFD600' },
    { id: '4', label: 'Autre', icon: 'dots-horizontal', color: Colors.textSecondary },
  ];

  const handleSubmit = () => {
    Alert.alert(
      'Merci Citoyen !',
      'Votre signalement a été envoyé avec succès. Vous avez gagné +50 points civiques.',
      [{ text: 'Super !', onPress: () => navigation.navigate('Map') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" size={32} color={Colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Validation AI</Text>
          <Text style={styles.headerSubtitle}>Veuillez confirmer le signalement</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step 1: AI Proof Preview */}
        <Animated.View layout={Layout.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>1. Preuve Capturée</Text>
            {isScanning && (
              <Animated.View style={[styles.aiBadge, { backgroundColor: Colors.accent }, badgeStyle]}>
                <Icon name="auto-fix" size={14} color={Colors.white} />
                <Text style={styles.aiBadgeText}>AI SCANNING</Text>
              </Animated.View>
            )}
          </View>
          
          <View style={[styles.cameraPreview, Shadows.medium]}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.noImagePlaceholder}>
                <Icon name="camera-off" size={48} color="#CBD5E1" />
                <Text style={styles.noImageText}>Aucune image capturée</Text>
              </View>
            )}
            
            {isScanning && (
              <View style={styles.scanningOverlay}>
                <Animated.View style={[styles.scanLine, scanLineStyle]} />
                <ActivityIndicator size="large" color={Colors.white} />
              </View>
            )}
            
            {imageUri && !isScanning && (
              <View style={styles.successOverlay}>
                <Icon name="check-circle" size={40} color={Colors.success} />
              </View>
            )}

            {!imageUri && !isScanning && (
              <AnimatedButton style={styles.captureOverlayBtn} onPress={handleCameraCapture}>
                <Icon name="camera" size={32} color={Colors.white} />
                <Text style={styles.captureOverlayText}>CAPTURER</Text>
              </AnimatedButton>
            )}
          </View>

          {imageUri && !isScanning && (
            <TouchableOpacity style={styles.retakeBtn} onPress={handleCameraCapture}>
              <Icon name="refresh" size={16} color={Colors.accent} />
              <Text style={styles.retakeText}>Changer la photo</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Step 2: Auto-filled Type */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.label}>2. Type d'Incident (Détecté)</Text>
          <View style={styles.typeGrid}>
            {incidentTypes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.typeCard,
                  selectedType === item.label && { 
                    borderColor: Colors.primary, 
                    backgroundColor: Colors.primary + '08',
                    ...Shadows.light 
                  },
                ]}
                onPress={() => setSelectedType(item.label)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                  <Icon name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={[styles.typeLabel, selectedType === item.label && { color: Colors.primary, fontWeight: 'bold' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Step 3: Location */}
        <View style={styles.section}>
          <Text style={styles.label}>3. Localisation BaladiyaConnect</Text>
          <View style={[styles.locationCard, Shadows.light]}>
            <View style={styles.locIconBox}>
              <Icon name="map-marker-check" size={24} color={Colors.primary} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Validation par Satellite</Text>
              <Text style={styles.locationDesc}>Validation GPS en cours... (Précision : 2m)</Text>
            </View>
          </View>
        </View>

        {/* Step 4: Details */}
        <View style={styles.section}>
          <Text style={styles.label}>4. Description (AI Generated)</Text>
          <TextInput
            style={[styles.input, Shadows.light]}
            placeholder="Détails supplémentaires..."
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <AnimatedButton 
          style={[styles.submitBtn, (isScanning || isDeduplicating) && { opacity: 0.5 }, { backgroundColor: Colors.primary }, Shadows.dark]}
          disabled={isScanning || isDeduplicating}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>CONFIRMER LE SIGNALEMENT</Text>
          <View style={styles.sendIconBox}>
             <Icon name="send" size={20} color={Colors.primary} />
          </View>
        </AnimatedButton>
        
        <View style={{ height: 120 }} />
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  scrollContent: { padding: 25 },
  section: { marginBottom: 35 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '800', color: Colors.text, textTransform: 'uppercase', letterSpacing: 0.5 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  aiBadgeText: { color: Colors.white, fontSize: 10, fontWeight: 'bold', marginLeft: 5 },
  
  cameraPreview: { backgroundColor: '#F8F9FA', borderRadius: 25, height: 220, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center' },
  previewImage: { width: '100%', height: '100%' },
  noImagePlaceholder: { alignItems: 'center', justifyContent: 'center' },
  noImageText: { color: '#94A3B8', fontSize: 13, fontWeight: '600', marginTop: 10 },
  scanningOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  successOverlay: { position: 'absolute', bottom: 15, right: 15, backgroundColor: Colors.white, borderRadius: 20, padding: 5 },
  captureOverlayBtn: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,122,255,0.6)', justifyContent: 'center', alignItems: 'center' },
  captureOverlayText: { color: Colors.white, fontWeight: '900', fontSize: 12, marginTop: 8, letterSpacing: 1 },
  retakeBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 10, marginRight: 5 },
  retakeText: { color: Colors.primary, fontSize: 12, fontWeight: '700', marginLeft: 5 },
  
  typeGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  typeCard: { backgroundColor: Colors.white, padding: 12, borderRadius: 20, width: '23%', alignItems: 'center', borderWidth: 2, borderColor: '#F1F5F9' },
  iconBox: { width: 48, height: 48, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  typeLabel: { fontSize: 11, textAlign: 'center', color: Colors.textSecondary, fontWeight: '600' },
  
  locationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', padding: 18, borderRadius: 22, borderWidth: 1, borderColor: '#E2E8F0' },
  locIconBox: { width: 45, height: 45, borderRadius: 12, backgroundColor: Colors.primary + '15', justifyContent: 'center', alignItems: 'center' },
  locationTextContainer: { marginLeft: 15 },
  locationTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  locationDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  
  input: { backgroundColor: '#F8F9FA', borderRadius: 22, padding: 20, height: 120, textAlignVertical: 'top', color: Colors.text, fontSize: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  
  submitBtn: { 
    height: 75, 
    borderRadius: 25, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  submitBtnText: { color: Colors.white, fontWeight: '900', fontSize: 16, marginRight: 20, letterSpacing: 0.5 },
  sendIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  scanLine: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 4, 
    backgroundColor: Colors.accent, 
    shadowColor: Colors.accent, 
    shadowRadius: 15, 
    shadowOpacity: 1, 
    elevation: 8,
    zIndex: 10 
  },
});

export default SignalementScreen;