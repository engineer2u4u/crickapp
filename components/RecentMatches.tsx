import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Team = {
  name: string;
  short: string;
  score: string;
  color: string;
  isWinner: boolean;
};

type Match = {
  venue: string;
  status: string;
  team1: Team;
  team2: Team;
  result: string;
};

const MATCHES: Match[] = [
  {
    venue: 'WANKHEDE STADIUM, MUMBAI',
    status: 'COMPLETED',
    team1: {
      name: 'Mumbai Indians',
      short: 'MI',
      score: '184/4',
      color: '#004BA0',
      isWinner: true,
    },
    team2: {
      name: 'Gujarat Titans',
      short: 'GT',
      score: '180/7',
      color: '#1B2A4A',
      isWinner: false,
    },
    result: 'MI won by 4 runs',
  },
  {
    venue: 'EDEN GARDENS, KOLKATA',
    status: 'FINAL RESULT',
    team1: {
      name: 'Kolkata KR',
      short: 'KKR',
      score: '165/9',
      color: '#3A225D',
      isWinner: false,
    },
    team2: {
      name: 'RC Bangalore',
      short: 'RCB',
      score: '180/6',
      color: '#EC1C24',
      isWinner: true,
    },
    result: 'RCB won by 15 runs',
  },
];

function TeamLogo({ short, color }: { short: string; color: string }) {
  return (
    <View
      className="w-8 h-8 rounded-full items-center justify-center mr-3"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white text-xs font-bold">{short}</Text>
    </View>
  );
}

function TeamRow({ team }: { team: Team }) {
  return (
    <View className="flex-row items-center py-1.5">
      <TeamLogo short={team.short} color={team.color} />
      <Text className="text-foreground text-sm font-body flex-1">
        {team.name}
      </Text>
      <Text
        className={`text-lg font-bold font-heading ${
          team.isWinner ? 'text-primary' : 'text-foreground'
        }`}
      >
        {team.score}
      </Text>
    </View>
  );
}

function MatchCard({ match }: { match: Match }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="bg-card rounded-2xl p-4 mb-3"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('MatchDetail', {
          team1: match.team1.short,
          team2: match.team2.short,
        })
      }
    >
      {/* Venue & Status */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-muted text-xs tracking-widest font-body flex-1 mr-2">
          {match.venue}
        </Text>
        <View className="bg-surface rounded-full px-2.5 py-0.5">
          <Text className="text-muted text-xs font-bold">{match.status}</Text>
        </View>
      </View>

      <TeamRow team={match.team1} />
      <TeamRow team={match.team2} />

      <Text className="text-muted text-xs mt-2 font-body">{match.result}</Text>
    </TouchableOpacity>
  );
}

export default function RecentMatches() {
  return (
    <View className="px-4 mt-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-foreground text-lg font-bold font-heading">
          Recent Matches
        </Text>
        <TouchableOpacity>
          <Text className="text-tertiary text-xs font-bold tracking-widest">
            VIEW ALL
          </Text>
        </TouchableOpacity>
      </View>

      {MATCHES.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </View>
  );
}
