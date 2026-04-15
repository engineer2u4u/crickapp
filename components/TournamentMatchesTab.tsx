import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { SeriesMatchDetail } from '../hooks/useCricketData';
import MatchCardApi from './MatchCardApi';

type Props = {
  matchGroups: SeriesMatchDetail[];
  loading: boolean;
};

export default function TournamentMatchesTab({ matchGroups, loading }: Props) {
  if (loading) {
    return (
      <View className="py-12 items-center">
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  if (matchGroups.length === 0) {
    return (
      <View className="items-center justify-center py-20">
        <Icon name="calendar-outline" size={48} color="#9E9E9E" />
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-body mt-4 text-center">
          No matches found for this tournament
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 mt-4 mb-4">
      {matchGroups.map((group, idx) => (
        <View key={`${group.date}-${idx}`} className="mb-4">
          {/* Date Header */}
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-widest mb-2 font-body">
            {group.date.toUpperCase()}
          </Text>

          {group.matches.map((match) => (
            <MatchCardApi
              key={match.matchInfo.matchId}
              match={match}
              variant="compact"
            />
          ))}
        </View>
      ))}
    </View>
  );
}
