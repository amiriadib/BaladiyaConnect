import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming, 
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors, Shadows, Typography } from '../theme';

const { width, height } = Dimensions.get('window');

const FloatingDataFragment = ({ text, top, left, delay }: { text: string, top: any, left: any, delay: number }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withRepeat(withSequence(withTiming(0.6, { duration: 2000 }), withTiming(0, { duration: 2000 })), -1));
    translateY.value = withDelay(delay, withRepeat(withSequence(withTiming(-20, { duration: 4000 }), withTiming(0, { duration: 4000 })), -1));
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    top,
    left,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={style}>
      <Text style={{ color: Colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 }}>{text}</Text>
    </Animated.View>
  );
};

const ARMarker = ({ marker }: { marker: any }) => {
  const floatY = useSharedValue(0);
  const tilt = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(withSequence(withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.sin) }), withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) })), -1, true);
    tilt.value = withRepeat(withSequence(withTiming(3, { duration: 3000 }), withTiming(-3, { duration: 3000 })), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    top: marker.top,
    left: marker.left,
    transform: [
      { translateY: floatY.value },
      { rotateX: `${tilt.value}deg` },
      { rotateY: `${tilt.value * 2}deg` }
    ],
  }));

  return (
    <Animated.View style={[styles.markerContainer, animatedStyle]}>
      <View style={[styles.glassCard, Shadows.glass]}>
        <View style={[styles.iconBox, { backgroundColor: marker.color }]}>
          <Icon name={marker.icon} size={28} color={Colors.white} />
          {marker.status === 'Job Complete' && <View style={styles.checkMini}><Icon name="check" size={10} color={marker.color} /></View>}
        </View>
        <View style={styles.markerInfo}>
          <Text style={styles.markerType}>{marker.type}</Text>
          <View style={styles.statusRow}>
            <Text style={styles.markerStatus}>{marker.status}</Text>
            <Text style={styles.markerTime}>• {marker.time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.anchorLine} />
      <View style={[styles.anchorPoint, { borderColor: marker.color }]} />
    </Animated.View>
  );
};

const ARLensScreen = ({ navigation }: { navigation: any }) => {
  const [isScanning, setIsScanning] = useState(false);

  // Simulated incidents for the AR View
  const arMarkers = [
    { id: '1', type: 'Trash Reported', status: 'In Progress', icon: 'trash-can', color: Colors.warning, top: '40%', left: '25%', time: '8 mins ago' },
    { id: '2', type: 'Street Repaired!', status: 'Job Complete', icon: 'check-decagram', color: Colors.success, top: '55%', left: '55%', time: 'Verified Oct 26' },
  ];

  const scanY = useSharedValue(0);

  useEffect(() => {
    if (isScanning) {
      scanY.value = withRepeat(withSequence(withTiming(height * 0.4, { duration: 1500 }), withTiming(0, { duration: 1500 })), -1);
    } else {
      scanY.value = 0;
    }
  }, [isScanning]);

  const scanStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanY.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Real Camera Feed Mockup */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.camera}
      >
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topHeader}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={32} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.branding}>
              <View style={styles.logoBox}>
                <Icon name="flower-tulip" size={24} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.brandTitle}>BaladiyaConnect AR</Text>
                <Text style={styles.liveTag}>LIVE: Localisation GPS</Text>
              </View>
            </View>
          </View>

          {/* AR Markers */}
          {arMarkers.map(marker => (
            <ARMarker key={marker.id} marker={marker} />
          ))}

          {/* Floating Data Fragments */}
          <FloatingDataFragment text="TEMP: 24°C" top="20%" left="60%" delay={0} />
          <FloatingDataFragment text="HUMIDITY: 45%" top="30%" left="15%" delay={1000} />
          <FloatingDataFragment text="TRAFFIC: LOW" top="15%" left="40%" delay={500} />
          <FloatingDataFragment text="SIGNAL: 5G" top="45%" left="80%" delay={1500} />

          {/* AI Scanner Effect */}
          {isScanning && (
            <Animated.View style={[styles.scanLine, scanStyle]} />
          )}

          {/* Bottom Actions */}
          <View style={styles.controls}>
            <TouchableOpacity 
              style={[styles.captureBtn, isScanning && styles.captureBtnActive]}
              onPress={() => {
                setIsScanning(!isScanning);
                if (!isScanning) {
                  setTimeout(() => {
                    setIsScanning(false);
                    navigation.navigate('SignalementStack');
                  }, 3000);
                }
              }}
            >
              <View style={styles.captureInner}>
                <Icon name={isScanning ? "magnify-scan" : "camera"} size={32} color={isScanning ? Colors.accent : Colors.white} />
              </View>
            </TouchableOpacity>
            <Text style={styles.hintText}>
              {isScanning ? 'AI ANALYSING ENVIRONMENT...' : 'POINT AT A CITY PROBLEM'}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, padding: 20, justifyContent: 'space-between' },
  topHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
  backBtn: { marginRight: 10 },
  branding: { flexDirection: 'row', alignItems: 'center' },
  logoBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  brandTitle: { color: Colors.white, fontSize: 18, fontWeight: '800' },
  liveTag: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  
  // AR Marker Styles
  markerContainer: { position: 'absolute', alignItems: 'center' },
  glassCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.85)', 
    padding: 12, 
    borderRadius: 20, 
    width: 220,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  checkMini: { position: 'absolute', bottom: -5, right: -5, width: 18, height: 18, borderRadius: 9, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  markerInfo: { flex: 1 },
  markerType: { fontSize: 16, fontWeight: '800', color: Colors.text },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  markerStatus: { fontSize: 11, fontWeight: 'bold', color: Colors.textSecondary },
  markerTime: { fontSize: 11, color: Colors.textSecondary, marginLeft: 4 },
  anchorLine: { width: 2, height: 40, backgroundColor: 'rgba(255,255,255,0.5)' },
  anchorPoint: { width: 12, height: 12, borderRadius: 6, borderWidth: 3, backgroundColor: '#FFF' },

  // Scanner
  scanLine: { 
    position: 'absolute', 
    top: '30%', 
    left: 0, 
    right: 0, 
    height: 3, 
    backgroundColor: Colors.accent, 
    shadowColor: Colors.accent, 
    shadowRadius: 20, 
    shadowOpacity: 0.8, 
    elevation: 10 
  },

  // Controls
  controls: { alignItems: 'center', marginBottom: 40 },
  captureBtn: { 
    width: 84, 
    height: 84, 
    borderRadius: 42, 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 4, 
    borderColor: Colors.white 
  },
  captureBtnActive: { borderColor: Colors.accent },
  captureInner: { 
    width: 68, 
    height: 68, 
    borderRadius: 34, 
    backgroundColor: 'rgba(15, 23, 42, 0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  hintText: { 
    color: Colors.white, 
    fontSize: 12, 
    fontWeight: '900', 
    marginTop: 15, 
    letterSpacing: 2, 
    textShadowColor: 'rgba(0,0,0,0.5)', 
    textShadowRadius: 4,
    textTransform: 'uppercase'
  },
});

export default ARLensScreen;
