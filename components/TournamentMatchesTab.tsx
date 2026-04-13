import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Match = {
  team1: { short: string; color: string; score?: string };
  team2: { short: string; color: string; score?: string };
  venue: string;
  status: 'completed' | 'live' | 'upcoming';
  result?: string;
  time?: string;
};

const MATCHES: { date: string; matches: Match[] }[] = [
  {
    date: 'Today, Apr 13',
    matches: [
      {
        team1: { short: 'MI', color: '#004BA0', score: '186/8' },
        team2: { short: 'CSK', color: '#FFCB05', score: '142/3' },
        venue: 'Wankhede Stadium, Mumbai',
        status: 'live',
      },
    ],
  },
  {
    date: 'Tomorrow, Apr 14',
    matches: [
      {
        team1: { short: 'KKR', color: '#3A225D' },
        team2: { short: 'DC', color: '#004C93' },
        venue: 'Eden Gardens, Kolkata',
        status: 'upcoming',
        time: '3:30 PM',
      },
      {
        team1: { short: 'RR', color: '#E73895' },
        team2: { short: 'SRH', color: '#FF822A' },
        venue: 'SMS Stadium, Jaipur',
        status: 'upcoming',
        time: '7:30 PM',
      },
    ],
  },
  {
    date: 'Apr 12',
    matches: [
      {
        team1: { short: 'CSK', color: '#FFCB05', score: '190/4' },
        team2: { short: 'DC', color: '#004C93', score: '186/8' },
        venue: 'MA Chidambaram, Chennai',
        status: 'completed',
        result: 'CSK won by 4 runs',
      },
      {
        team1: { short: 'RCB', color: '#EC1C24', score: '180/6' },
        team2: { short: 'KKR', color: '#3A225D', score: '165/9' },
        venue: 'M. Chinnaswamy, Bangalore',
        status: 'completed',
        result: 'RCB won by 15 runs',
      },
    ],
  },
  {
    date: 'Apr 11',
    matches: [
      {
        team1: { short: 'GT', color: '#1B2A4A', score: '172/7' },
        team2: { short: 'MI', color: '#004BA0', score: '176/4' },
        venue: 'Narendra Modi Stadium, Ahmedabad',
        status: 'completed',
        result: 'MI won by 6 wickets',
      },
    ],
  },
];

function TeamBadge({ short, color }: { short: string; color: string }) {
  return (
    <View
      className="w-8 h-8 rounded-full items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white text-xs font-bold">{short}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: Match['status'] }) {
  const config = {
    live: { bg: 'bg-live/15', text: 'text-live', label: 'LIVE' },
    upcoming: { bg: 'bg-primary/15', text: 'text-primary', label: 'UPCOMING' },
    completed: { bg: 'bg-surface', text: 'text-muted', label: 'COMPLETED' },
  }[status];

  return (
    <View className={`rounded-full px-2.5 py-0.5 ${config.bg}`}>
      <Text className={`text-xs font-bold ${config.text}`}>{config.label}</Text>
    </View>
  );
}

function MatchCard({ match }: { match: Match }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="bg-card rounded-2xl p-4 mb-2"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('MatchDetail', {
          team1: match.team1.short,
          team2: match.team2.short,
        })
      }
    >
      {/* Top: venue + status */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-muted text-xs font-body flex-1 mr-2" numberOfLines={1}>
          {match.venue}
        </Text>
        <StatusBadge status={match.status} />
      </View>

      {/* Teams row */}
      <View className="flex-row items-center">
        {/* Team 1 */}
        <View className="flex-row items-center flex-1">
          <TeamBadge short={match.team1.short} color={match.team1.color} />
          <Text className="text-foreground font-bold text-sm font-body ml-2">
            {match.team1.short}
          </Text>
          {match.team1.score && (
            <Text className="text-foreground text-base font-bold font-heading ml-auto">
              {match.team1.score}
            </Text>
          )}
        </View>

        <Text className="text-muted text-xs font-bold mx-3">vs</Text>

        {/* Team 2 */}
        <View className="flex-row items-center flex-1">
          {match.team2.score && (
            <Text className="text-foreground text-base font-bold font-heading mr-auto">
              {match.team2.score}
            </Text>
          )}
          <Text className="text-foreground font-bold text-sm font-body mr-2 ml-auto">
            {match.team2.short}
          </Text>
          <TeamBadge short={match.team2.short} color={match.team2.color} />
        </View>
      </View>

      {/* Result or Time */}
      {match.result && (
        <Text className="text-muted text-xs font-body mt-2">{match.result}</Text>
      )}
      {match.time && (
        <Text className="text-primary text-xs font-bold font-body mt-2">
          {match.time}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default function TournamentMatchesTab() {
  return (
    <View className="px-4 mt-4 mb-4">
      {MATCHES.map((group) => (
        <View key={group.date} className="mb-4">
          {/* Date Header */}
          <Text className="text-muted text-xs font-bold tracking-widest mb-2 font-body">
            {group.date.toUpperCase()}
          </Text>

          {group.matches.map((match, i) => (
            <MatchCard key={i} match={match} />
          ))}
        </View>
      ))}
    </View>
  );
}
