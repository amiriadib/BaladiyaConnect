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

const HistoryScreen = ({ navigation }: { navigation: any }) => {
  const signalements = [
    { 
      id: '1', 
      type: 'Déchets', 
      date: '24 Mars 2026', 
      status: 'Réparée', 
      location: 'Avenue de la République, Tunis', 
      points: '+120 pts',
      icon: 'trash-can',
      color: Colors.error
    },
    { 
      id: '2', 
      type: 'Route', 
      date: '25 Mars 2026', 
      status: 'En cours', 
      location: 'Avenue Habib Bourguiba, Sousse', 
      points: '+10 pts',
      icon: 'road-variant',
      color: Colors.warning
    },
    { 
      id: '3', 
      type: 'Éclairage', 
      date: '26 Mars 2026', 
      status: 'Signalé', 
      location: 'Centre Ville, Bizerte', 
      points: '+5 pts',
      icon: 'lightbulb',
      color: '#FFD600'
    },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Réparée': return { bg: '#E8F5E9', text: Colors.success, icon: 'check-circle' };
      case 'En cours': return { bg: '#FFF3E0', text: Colors.warning, icon: 'clock-outline' };
      default: return { bg: '#F5F5F5', text: Colors.textSecondary, icon: 'alert-circle-outline' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Suivi Citoyen</Text>
          <Text style={styles.headerSubtitle}>Impact des signalements</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.statsRow, Shadows.light]}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>32</Text>
            <Text style={styles.statLabel}>Envoyés</Text>
          </View>
          <View style={[styles.statBox, styles.statBorder]}>
            <Text style={styles.statVal}>14</Text>
            <Text style={styles.statLabel}>Traités</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>840</Text>
            <Text style={styles.statLabel}>Pts Gagnés</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Historique Récent</Text>

        {signalements.map((item) => {
          const statusStyle = getStatusStyle(item.status);
          return (
            <View key={item.id} style={[styles.card, Shadows.medium]}>
              <View style={[styles.cardAccent, { backgroundColor: item.color }]} />
              
              <View style={styles.cardHeader}>
                <View style={styles.typeRow}>
                  <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                    <Icon name={item.icon} size={20} color={item.color} />
                  </View>
                  <Text style={styles.typeName}>{item.type}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Icon name={statusStyle.icon} size={14} color={statusStyle.text} />
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
                <View style={styles.dateRow}>
                  <Icon name="calendar-clock" size={12} color={Colors.textSecondary} />
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.pointsBadge}>
                  <Icon name="medal-outline" size={14} color={Colors.accent} />
                  <Text style={styles.points}>{item.points}</Text>
                </View>
                <TouchableOpacity style={styles.viewBtn}>
                  <Text style={styles.viewBtnText}>VOIR PHOTO</Text>
                  <Icon name="chevron-right" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFBFB' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 20, 
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  backBtn: { marginRight: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  headerSubtitle: { fontSize: 12, color: Colors.textSecondary },
  scrollContent: { padding: 20 },
  statsRow: { 
    flexDirection: 'row', 
    backgroundColor: Colors.primary, 
    borderRadius: 25, 
    padding: 20, 
    marginBottom: 30,
    justifyContent: 'space-around'
  },
  statBox: { alignItems: 'center', flex: 1 },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  statVal: { fontSize: 22, fontWeight: 'bold', color: Colors.white },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 15, marginLeft: 5 },
  card: { 
    backgroundColor: Colors.white, 
    borderRadius: 22, 
    marginBottom: 15, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardAccent: { height: 4, width: '100%' },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingTop: 15 
  },
  typeRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  typeName: { fontSize: 15, fontWeight: 'bold', color: Colors.text, marginLeft: 10 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  statusText: { fontSize: 10, fontWeight: 'bold', marginLeft: 5, textTransform: 'uppercase' },
  cardBody: { paddingHorizontal: 15, marginTop: 15 },
  location: { fontSize: 14, fontWeight: '600', color: Colors.text },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  date: { fontSize: 12, color: Colors.textSecondary, marginLeft: 5 },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#FAFAFA', 
    marginTop: 15 
  },
  pointsBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Colors.white, 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  points: { fontSize: 12, fontWeight: 'bold', color: Colors.text, marginLeft: 5 },
  viewBtn: { flexDirection: 'row', alignItems: 'center' },
  viewBtnText: { fontSize: 11, fontWeight: 'bold', color: Colors.primary, marginRight: 5 },
});

export default HistoryScreen;
