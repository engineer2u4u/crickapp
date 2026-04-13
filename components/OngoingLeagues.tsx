import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

type League = {
  country: string;
  name: string;
  stage: string;
  accentColor: string;
};

const LEAGUES: League[] = [
  {
    country: 'ENGLAND',
    name: 'Vitality T20 Blast',
    stage: 'Round 12 of 18',
    accentColor: '#1B5E20',
  },
  {
    country: 'AUSTRALIA',
    name: 'Big Bash League',
    stage: 'Semi Finals',
    accentColor: '#2E7D32',
  },
  {
    country: 'WEST INDIES',
    name: 'Caribbean Premier League',
    stage: 'Group Stage',
    accentColor: '#C62828',
  },
];

function LeagueCard({ league }: { league: League }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="bg-card rounded-2xl overflow-hidden mb-3 flex-row"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('TournamentDetail', {
          name: league.name,
          subtitle: league.country,
        })
      }
    >
      {/* Left Accent Bar */}
      <View className="w-1" style={{ backgroundColor: league.accentColor }} />

      {/* Content */}
      <View className="flex-1 p-4">
        <Text className="text-muted text-xs tracking-widest mb-1 font-body">
          {league.country}
        </Text>
        <Text className="text-foreground text-base font-bold font-heading">
          {league.name}
        </Text>
        <Text className="text-muted text-sm mt-1 font-body">{league.stage}</Text>
      </View>

      {/* Arrow */}
      <View className="items-center justify-center pr-4">
        <Icon name="arrow-forward" size={18} color="#9E9E9E" />
      </View>
    </TouchableOpacity>
  );
}

export default function OngoingLeagues() {
  return (
    <View className="px-4 mt-6">
      <Text className="text-foreground text-lg font-bold font-heading mb-3">
        Other Ongoing Leagues
      </Text>

      {LEAGUES.map((league) => (
        <LeagueCard key={league.name} league={league} />
      ))}
    </View>
  );
}
