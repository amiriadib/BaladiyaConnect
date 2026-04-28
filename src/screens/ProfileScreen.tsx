import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Shadows } from '../theme';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* Header: User & Points Banner */}
      <View style={styles.header}>
        <View style={[styles.avatarBox, Shadows.medium]}>
          <Text style={styles.avatarText}>AA</Text>
        </View>
        <Text style={styles.userName}>Adib Amiri</Text>
        <Text style={styles.userLocation}>République Tunisienne</Text>
        
        <View style={styles.badgeRow}>
          <Icon name="medal" size={24} color={Colors.accent} />
          <Text style={styles.badgeText}>Candidat : Bon Citoyen 2026</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Civic Progress Card */}
        <View style={[styles.pointsCard, Shadows.medium]}>
          <Text style={styles.pointsTitle}>Votre Score Civique</Text>
          <Text style={styles.pointsValue}>1,240 <Text style={styles.pointsUnit}>POINTS</Text></Text>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '75%' }]} />
          </View>
          <Text style={styles.progressLabel}>Plus que 260 pts pour le rang "Or"</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>18</Text>
            <Text style={styles.statLabel}>Signalements</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>14</Text>
            <Text style={styles.statLabel}>Validés</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Réparés</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <MenuButton icon="history" label="Historique des signalements" onPress={() => navigation.navigate('History')} />
          <MenuButton icon="trophy-outline" label="Classement annuel" onPress={() => navigation.navigate('Leaderboard')} />
          <MenuButton icon="shield-check-outline" label="Certificats obtenus" />
          <MenuButton icon="cog-outline" label="Paramètres du compte" />
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutBtnText}>SE DÉCONNECTER</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerVersion}>BaladiyaConnect v2.0 • Plateforme Nationale</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuButton = ({ icon, label, onPress }: { icon: string, label: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Icon name={icon} size={24} color={Colors.primary} />
      <Text style={styles.menuText}>{label}</Text>
    </View>
    <Icon name="chevron-right" size={24} color={Colors.border} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  avatarBox: { width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: Colors.primary },
  userName: { fontSize: 24, fontWeight: 'bold', color: Colors.white, marginBottom: 5 },
  userLocation: { fontSize: 14, color: Colors.white, opacity: 0.8 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  badgeText: { marginLeft: 10, color: Colors.white, fontWeight: '600', fontSize: 13 },
  scrollContent: { padding: 20 },
  pointsCard: { backgroundColor: Colors.white, borderRadius: 20, padding: 25, marginTop: -30, alignItems: 'center' },
  pointsTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  pointsValue: { fontSize: 32, fontWeight: '900', color: Colors.primary, marginBottom: 20 },
  pointsUnit: { fontSize: 14, color: Colors.textSecondary },
  progressBarBg: { height: 10, width: '100%', backgroundColor: '#F0F0F0', borderRadius: 5, marginBottom: 8 },
  progressBarFill: { height: 10, backgroundColor: Colors.success, borderRadius: 5 },
  progressLabel: { fontSize: 11, color: Colors.textSecondary },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statBox: { backgroundColor: Colors.white, flex: 1, marginRight: 10, padding: 15, borderRadius: 15, alignItems: 'center', ...Shadows.light },
  statNum: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 5 },
  menuSection: { backgroundColor: Colors.white, borderRadius: 20, padding: 15, marginTop: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F8F9FA' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { marginLeft: 15, fontSize: 15, color: Colors.text, fontWeight: '500' },
  logoutBtn: { backgroundColor: '#FF8A80', marginTop: 25, paddingVertical: 18, borderRadius: 20, alignItems: 'center' },
  logoutBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  footerVersion: { textAlign: 'center', marginTop: 30, color: Colors.textSecondary, fontSize: 11, marginBottom: 30 },
});

export default ProfileScreen;
