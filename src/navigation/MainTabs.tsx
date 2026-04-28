import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Shadows } from '../theme';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import SignalementScreen from '../screens/SignalementScreen';
import CarteScreen from '../screens/CarteScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Signalement') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            size = 32; // Special size for central button
          } else if (route.name === 'Carte') {
            iconName = focused ? 'map-marker-radius' : 'map-marker-radius-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          } else {
            iconName = 'help-circle-outline';
          }
          return (
            <View style={route.name === 'Signalement' ? styles.actionButton : null}>
              <Icon name={iconName} size={size} color={route.name === 'Signalement' ? Colors.white : color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Carte" component={CarteScreen} />
      <Tab.Screen name="Signalement" component={SignalementScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    height: 80,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    ...Shadows.dark,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 5,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 25 : 30,
    ...Shadows.medium,
  },
});

export default MainTabs;
