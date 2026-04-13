import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import TournamentDetailScreen from '../screens/TournamentDetailScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';
import Navbar from '../components/Navbar';

export type RootStackParamList = {
  Main: undefined;
  TournamentDetail: { name: string; subtitle?: string };
  MatchDetail: { team1: string; team2: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainScreen() {
  return (
    <View className="flex-1">
      <Navbar />
      <BottomTabNavigator />
    </View>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="TournamentDetail"
        component={TournamentDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MatchDetail"
        component={MatchDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
