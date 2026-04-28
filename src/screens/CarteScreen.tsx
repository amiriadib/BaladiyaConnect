import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Shadows } from '../theme';

const CarteScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Incident Map</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="tune" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 34.7478,
          longitude: 10.7665,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={mapStyle}
      >
        <Marker
          coordinate={{ latitude: 34.7400, longitude: 10.7600 }}
          title="Road Damage"
          description="Assigned to maintenance team"
        >
          <View style={[styles.markerBox, { backgroundColor: Colors.error }, Shadows.medium]}>
            <Icon name="road-variant" size={20} color={Colors.white} />
          </View>
        </Marker>

        <Marker
          coordinate={{ latitude: 34.7550, longitude: 10.7750 }}
          title="Sanitation Fixed"
          description="Resolved by Municipality"
        >
          <View style={[styles.markerBox, { backgroundColor: Colors.success }, Shadows.medium]}>
            <Icon name="trash-can-outline" size={20} color={Colors.white} />
          </View>
        </Marker>

        <Marker
          coordinate={{ latitude: 34.7350, longitude: 10.7800 }}
          title="Lighting Issue"
          description="In Queue for dispatch"
        >
          <View style={[styles.markerBox, { backgroundColor: Colors.warning }, Shadows.medium]}>
            <Icon name="lightbulb-outline" size={20} color={Colors.white} />
          </View>
        </Marker>
      </MapView>

      <View style={styles.overlay}>
        <View style={[styles.statusCard, Shadows.dark]}>
          <Text style={styles.cardTitle}>Incident Tracker</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.error }]} />
              <Text style={styles.legendLabel}>New</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.warning }]} />
              <Text style={styles.legendLabel}>Active</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.success }]} />
              <Text style={styles.legendLabel}>Solved</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.reportFab, Shadows.dark]}
          onPress={() => navigation.navigate('SignalementStack')}
        >
          <Icon name="plus" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "stylers": [{ "visibility": "off" }]
  }
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  filterBtn: { padding: 5 },
  map: { flex: 1 },
  markerBox: {
    padding: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  reportFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CarteScreen;