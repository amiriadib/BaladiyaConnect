import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Shadows } from '../theme';

const MOCK_LEADERS = [
  { id: '1', name: 'Amine B.', points: 4850, rank: 1, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sarra M.', points: 4200, rank: 2, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Yassine K.', points: 3950, rank: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Selima T.', points: 2800, rank: 4, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Mohamed R.', points: 2450, rank: 5, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Ines A.', points: 2100, rank: 6, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Firas G.', points: 1950, rank: 7, avatar: 'https://i.pravatar.cc/150?u=7' },
];

const LeaderboardScreen = () => {
  const renderItem = ({ item }: { item: typeof MOCK_LEADERS[0] }) => {
    let rankIcon = null;
    let rankColor = Colors.textSecondary;

    if (item.rank === 1) {
      rankIcon = <Icon name="crown" size={24} color="#FFD700" />;
      rankColor = "#FFD700";
    } else if (item.rank === 2) {
      rankIcon = <Icon name="medal" size={24} color="#C0C0C0" />;
      rankColor = "#C0C0C0";
    } else if (item.rank === 3) {
      rankIcon = <Icon name="medal" size={24} color="#CD7F32" />;
      rankColor = "#CD7F32";
    }

    return (
      <View style={[styles.card, Shadows.light]}>
        <View style={styles.rankContainer}>
          {rankIcon ? rankIcon : <Text style={styles.rankText}>{item.rank}</Text>}
        </View>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.badge}>Citoyen Engagé</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>{item.points.toLocaleString()}</Text>
          <Text style={styles.pointsLabel}>PTS</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* Top Banner Section */}
      <View style={styles.topSection}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Le Bon Citoyen</Text>
          <TouchableOpacity style={styles.infoBtn}>
            <Icon name="information-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.podiumContainer}>
          {/* Rank 2 */}
          <View style={[styles.podiumItem, { marginTop: 40 }]}>
            <Image source={{ uri: MOCK_LEADERS[1].avatar }} style={[styles.podiumAvatar, { borderColor: '#C0C0C0' }]} />
            <View style={[styles.badgeSmall, { backgroundColor: '#C0C0C0' }]}>
              <Text style={styles.badgeTextSmall}>2</Text>
            </View>
            <Text style={styles.podiumName}>{MOCK_LEADERS[1].name}</Text>
            <Text style={styles.podiumPoints}>{MOCK_LEADERS[1].points} pts</Text>
          </View>

          {/* Rank 1 */}
          <View style={styles.podiumItem}>
            <View style={styles.crownContainer}>
              <Icon name="crown" size={30} color="#FFD700" />
            </View>
            <Image source={{ uri: MOCK_LEADERS[0].avatar }} style={[styles.podiumAvatar, { width: 90, height: 90, borderColor: '#FFD700' }]} />
            <View style={[styles.badgeSmall, { backgroundColor: '#FFD700', width: 28, height: 28 }]}>
              <Text style={styles.badgeTextSmall}>1</Text>
            </View>
            <Text style={[styles.podiumName, { fontSize: 16, fontWeight: 'bold' }]}>{MOCK_LEADERS[0].name}</Text>
            <Text style={[styles.podiumPoints, { color: '#FFD700' }]}>{MOCK_LEADERS[0].points} pts</Text>
          </View>

          {/* Rank 3 */}
          <View style={[styles.podiumItem, { marginTop: 50 }]}>
            <Image source={{ uri: MOCK_LEADERS[2].avatar }} style={[styles.podiumAvatar, { borderColor: '#CD7F32' }]} />
            <View style={[styles.badgeSmall, { backgroundColor: '#CD7F32' }]}>
              <Text style={styles.badgeTextSmall}>3</Text>
            </View>
            <Text style={styles.podiumName}>{MOCK_LEADERS[2].name}</Text>
            <Text style={styles.podiumPoints}>{MOCK_LEADERS[2].points} pts</Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Classement National des Citoyens</Text>
          <Text style={styles.listSubtitle}>Année 2024</Text>
        </View>
        
        <FlatList
          data={MOCK_LEADERS.slice(3)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  topSection: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 25,
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 30
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.white },
  infoBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  podiumContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  podiumItem: { alignItems: 'center', width: '30%' },
  podiumAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, marginBottom: 8 },
  crownContainer: { marginBottom: -10, zIndex: 1 },
  badgeSmall: { 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: -20,
    zIndex: 2,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  badgeTextSmall: { color: Colors.white, fontSize: 10, fontWeight: 'bold' },
  podiumName: { color: Colors.white, fontSize: 13, marginTop: 10, textAlign: 'center' },
  podiumPoints: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
  listContainer: { flex: 1, marginTop: -20, paddingHorizontal: 20 },
  listHeader: { marginBottom: 15, paddingHorizontal: 5 },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  listSubtitle: { fontSize: 12, color: Colors.textSecondary },
  listContent: { paddingBottom: 30 },
  card: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
  },
  rankContainer: { width: 40, alignItems: 'center' },
  rankText: { fontSize: 16, fontWeight: 'bold', color: Colors.textSecondary },
  avatar: { width: 50, height: 50, borderRadius: 25, marginLeft: 10 },
  infoContainer: { flex: 1, marginLeft: 15 },
  name: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  badge: { fontSize: 11, color: Colors.success, fontWeight: 'bold', marginTop: 2 },
  pointsContainer: { alignItems: 'flex-end' },
  pointsValue: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
  pointsLabel: { fontSize: 9, color: Colors.textSecondary, fontWeight: 'bold' },
});

export default LeaderboardScreen;
