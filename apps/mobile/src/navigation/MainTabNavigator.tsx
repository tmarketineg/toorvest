import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { House, Buildings, Briefcase, ChartLineUp, User } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { HomeScreen } from '../screens/HomeScreen';
import { CountriesScreen } from '../screens/CountriesScreen';
import { CountryPavilionScreen } from '../screens/CountryPavilionScreen';
import { EmiratesDetailScreen } from '../screens/EmiratesDetailScreen';
import { BusinessHubScreen } from '../screens/BusinessHubScreen';
import { BidFormScreen } from '../screens/BidFormScreen';
import { CompanyDashboardScreen } from '../screens/CompanyDashboardScreen';
import { InvestmentTourismScreen } from '../screens/InvestmentTourismScreen';
import { SofiaScreen } from '../screens/SofiaScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { RewardsScreen } from '../screens/RewardsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const PavilionsStack = createNativeStackNavigator();
const BusinessStack = createNativeStackNavigator();
const InvestmentStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function PavilionsStackNavigator() {
  return (
    <PavilionsStack.Navigator screenOptions={{ headerShown: false }}>
      <PavilionsStack.Screen name="CountriesScreen" component={CountriesScreen} />
      <PavilionsStack.Screen name="CountryPavilion" component={CountryPavilionScreen} />
      <PavilionsStack.Screen name="EmiratesDetail" component={EmiratesDetailScreen} />
    </PavilionsStack.Navigator>
  );
}

function BusinessStackNavigator() {
  return (
    <BusinessStack.Navigator screenOptions={{ headerShown: false }}>
      <BusinessStack.Screen name="BusinessHub" component={BusinessHubScreen} />
      <BusinessStack.Screen name="BidForm" component={BidFormScreen} />
      <BusinessStack.Screen name="CompanyDashboard" component={CompanyDashboardScreen} />
    </BusinessStack.Navigator>
  );
}

function InvestmentStackNavigator() {
  return (
    <InvestmentStack.Navigator screenOptions={{ headerShown: false }}>
      <InvestmentStack.Screen name="InvestmentTourism" component={InvestmentTourismScreen} />
      <InvestmentStack.Screen name="Sofia" component={SofiaScreen} />
    </InvestmentStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Rewards" component={RewardsScreen} />
    </ProfileStack.Navigator>
  );
}

export function MainTabNavigator() {
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { paddingBottom: 4, height: 56 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => <House size={size} weight="light" color={color} />,
        }}
      />
      <Tab.Screen
        name="PavilionsTab"
        component={PavilionsStackNavigator}
        options={{
          tabBarLabel: t('pavilions'),
          tabBarIcon: ({ color, size }) => <Buildings size={size} weight="light" color={color} />,
        }}
      />
      <Tab.Screen
        name="BusinessTab"
        component={BusinessStackNavigator}
        options={{
          tabBarLabel: t('business'),
          tabBarIcon: ({ color, size }) => <Briefcase size={size} weight="light" color={color} />,
        }}
      />
      <Tab.Screen
        name="InvestmentTab"
        component={InvestmentStackNavigator}
        options={{
          tabBarLabel: t('investment'),
          tabBarIcon: ({ color, size }) => <ChartLineUp size={size} weight="light" color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color, size }) => <User size={size} weight="light" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
