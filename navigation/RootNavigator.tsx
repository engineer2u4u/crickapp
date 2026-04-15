import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import TournamentDetailScreen from '../screens/TournamentDetailScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import RemindersScreen from '../screens/RemindersScreen';
import Navbar from '../components/Navbar';

export type RootStackParamList = {
  Main: undefined;
  TournamentDetail: { seriesId: number; name: string; subtitle?: string };
  MatchDetail: { matchId: number; team1: string; team2: string };
  NewsDetail: { storyId: number };
  Reminders: undefined;
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
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
