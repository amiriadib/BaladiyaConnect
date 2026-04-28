import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  SlideInDown, 
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

const { width, height } = Dimensions.get('window');

const FloatingMarker = ({ marker }: { marker: any }) => {
  const translateY = useSharedValue(0);
  const randomDelay = Math.random() * 2000;

  React.useEffect(() => {
    translateY.value = withDelay(
      randomDelay,
      withRepeat(
        withSequence(
          withTiming(-12, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Marker coordinate={marker.coords}>
      <Animated.View style={[styles.markerBase, { borderColor: marker.color }, animatedStyle]}>
        <View style={[styles.markerInner, { backgroundColor: marker.color }]}>
          <Icon name={marker.icon} size={14} color={Colors.white} />
        </View>
        <View style={[styles.markerGlow, { backgroundColor: marker.color }]} />
      </Animated.View>
    </Marker>
  );
};

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const panelTranslateY = useSharedValue(0);

  React.useEffect(() => {
    panelTranslateY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const panelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: panelTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Premium Header */}
      <View style={[styles.header, Shadows.light]}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingText}>BIENVENUE, CITOYEN</Text>
          <Text style={styles.appName}>BaladiyaConnect</Text>
        </View>
        <TouchableOpacity 
          style={[styles.pointsBadge, Shadows.medium]}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <View style={styles.crownIcon}>
            <Icon name="crown" size={16} color={Colors.white} />
          </View>
          <View style={styles.pointsContent}>
            <Text style={styles.pointsRank}>RANG #12</Text>
            <Text style={styles.pointsLevel}>NIVEAU OR</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modern Map */}
      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 34.7478,
            longitude: 10.7665,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={modernMapStyle}
        >
          {/* Active Incident Markers */}
          {INCIDENTS.map(marker => (
            <FloatingMarker key={marker.id} marker={marker} />
          ))}
        </MapView>

        {/* Floating Quick Action Panel */}
        <Animated.View 
          entering={SlideInDown.delay(700).springify().damping(12).stiffness(100)}
          style={[styles.statusPanel, Shadows.dark, panelAnimatedStyle]}
        >
          <View style={styles.panelDrag} />
          <View style={styles.panelContent}>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>1,240 <Text style={styles.statUnit}>PTS</Text></Text>
              <Text style={styles.statLabel}>IMPACT COMMUNAUTAIRE</Text>
            </View>
            <AnimatedButton 
              style={[styles.cameraLaunch, Shadows.medium]}
              onPress={() => navigation.navigate('ARLens')}
            >
              <Icon name="camera-iris" size={32} color={Colors.white} />
              <Text style={styles.cameraLabel}>Ouvrir l'AR Lens</Text>
            </AnimatedButton>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const INCIDENTS = [
  { id: '1', coords: { latitude: 34.7400, longitude: 10.7600 }, icon: 'trash-can', color: Colors.error },
  { id: '2', coords: { latitude: 34.7550, longitude: 10.7750 }, icon: 'road-variant', color: Colors.warning },
];

const modernMapStyle = [
  { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#7c93a3" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }] },
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    zIndex: 10,
  },
  headerLeft: { flex: 1 },
  greetingText: { fontSize: 10, fontWeight: '800', color: Colors.textSecondary, letterSpacing: 1.5 },
  appName: { fontSize: 24, fontWeight: '900', color: Colors.text, letterSpacing: -1 },
  pointsBadge: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: 8,
    paddingRight: 15,
    borderRadius: 18,
    alignItems: 'center',
  },
  crownIcon: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: Colors.accent, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 10,
  },
  pointsContent: { justifyContent: 'center' },
  pointsRank: { fontSize: 8, fontWeight: '800', color: 'rgba(255,255,255,0.6)' },
  pointsLevel: { fontSize: 10, fontWeight: '900', color: Colors.white },
  
  mapWrapper: { flex: 1 },
  map: { flex: 1 },
  
  markerBase: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    borderWidth: 2, 
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInner: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  markerGlow: { 
    position: 'absolute', 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    opacity: 0.2, 
    zIndex: 1 
  },
  
  statusPanel: {
    position: 'absolute',
    bottom: 110, // Avoid overlapping the tab bar
    left: 20,
    right: 20,
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 20,
  },
  panelDrag: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 15 },
  panelContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statInfo: { flex: 1 },
  statValue: { fontSize: 28, fontWeight: '900', color: Colors.primary },
  statUnit: { fontSize: 14, color: Colors.textSecondary, fontWeight: '600' },
  statLabel: { fontSize: 10, fontWeight: '800', color: Colors.accent, marginTop: 4, letterSpacing: 1 },
  
  cameraLaunch: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraLabel: { color: Colors.white, fontWeight: '800', fontSize: 14, marginLeft: 10 },
});

export default DashboardScreen;

