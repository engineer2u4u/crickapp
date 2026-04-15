import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { MatchData } from '../services/types';
import MatchCardApi from './MatchCardApi';

type Props = {
  seriesName: string;
  seriesId?: number;
  matches: MatchData[];
};

export default function SeriesMatches({ seriesName, seriesId, matches }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (matches.length === 0) return null;

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text
          className="text-gray-900 dark:text-white text-sm font-bold tracking-widest font-heading flex-1 mr-2"
          numberOfLines={1}
        >
          {seriesName.toUpperCase()}
        </Text>
        {seriesId ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TournamentDetail', { seriesId: seriesId!, name: seriesName })
            }
          >
            <Text className="text-tertiary text-xs font-bold tracking-wider">
              VIEW ALL
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {matches.map((m) => (
        <MatchCardApi key={m.matchInfo.matchId} match={m} variant="compact" />
      ))}
    </View>
  );
}
