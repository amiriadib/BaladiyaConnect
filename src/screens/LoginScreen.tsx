import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { Colors, Shadows } from '../theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('Succès', 'Compte créé avec succès !');
      } else {
        await auth().signInWithEmailAndPassword(email, password);
      }
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Une erreur est survenue.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Cet email est déjà utilisé.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email invalide.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email ou mot de passe incorrect.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Le mot de passe est trop court.';
      }
      
      Alert.alert('Erreur', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000' }}
        style={styles.heroBackground}
      >
        <View style={styles.overlay}>
          <View style={styles.headerHero}>
            <View style={styles.logoBadge}>
               <Icon name="flower-tulip" size={40} color={Colors.white} />
            </View>
            <Text style={styles.heroTitle}>Baladiya-Connect</Text>
            <Text style={styles.heroSubtitle}>L'EXPÉRIENCE CIVIQUE DU FUTUR</Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formArea}
          >
            <View style={[styles.glassCard, Shadows.dark]}>
              <Text style={styles.loginTitle}>
                {isSignUp ? 'Créer un Compte' : 'Connexion Citoyenne'}
              </Text>
              
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Icon name="at" size={20} color={Colors.primary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Icon name="key-variant" size={20} color={Colors.primary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.loginBtn, Shadows.medium, loading && { opacity: 0.7 }]}
                onPress={handleAuth}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <>
                    <Text style={styles.loginBtnText}>
                      {isSignUp ? 'REJOINDRE LA CITÉ' : 'ENTRER DANS LA CITÉ'}
                    </Text>
                    <View style={styles.arrowCircle}>
                       <Icon name="chevron-right" size={20} color={Colors.primary} />
                    </View>
                  </>
                )}
              </TouchableOpacity>

              <View style={styles.footerLinks}>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                  <Text style={styles.linkText}>
                    {isSignUp ? 'DÉJÀ UN COMPTE ? SE CONNECTER' : 'PAS ENCORE DE COMPTE ? S\'INSCRIRE'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.legalLabel}>
            <Text style={styles.legalText}>PASSRELLE OFFICIELLE • RÉPUBLIQUE TUNISIENNE</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBackground: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 25, justifyContent: 'space-between' },
  headerHero: { marginTop: 60, alignItems: 'center' },
  logoBadge: { width: 80, height: 80, borderRadius: 25, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 20, ...Shadows.medium },
  heroTitle: { fontSize: 36, fontWeight: '900', color: Colors.white, letterSpacing: -1 },
  heroSubtitle: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 2, marginTop: 5 },
  
  formArea: { flex: 1, justifyContent: 'center' },
  glassCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: 35, 
    padding: 30, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.3)' 
  },
  loginTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: 25, textAlign: 'center' },
  inputGroup: { marginBottom: 30 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8F9FA', 
    borderRadius: 20, 
    paddingHorizontal: 20, 
    height: 65, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: '600', color: Colors.text },
  
  loginBtn: { 
    backgroundColor: Colors.text, 
    height: 70, 
    borderRadius: 25, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnText: { color: Colors.white, fontWeight: '900', fontSize: 13, letterSpacing: 1, marginRight: 15 },
  arrowCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  
  footerLinks: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  linkText: { fontSize: 13, fontWeight: '800', color: Colors.primary, textAlign: 'center' },
  
  legalLabel: { alignItems: 'center', marginBottom: 20 },
  legalText: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.5)', letterSpacing: 1 },
});

export default LoginScreen;

