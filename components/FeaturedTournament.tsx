import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { SeriesItem } from '../services/types';

type Props = {
  series?: SeriesItem;
};

function formatDate(ts: string): string {
  return new Date(Number(ts)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function FeaturedTournament({ series }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const name = series?.name ?? 'Indian Premier League 2026';
  const startDate = series ? formatDate(series.startDt) : '';
  const endDate = series ? formatDate(series.endDt) : '';
  const isActive = series
    ? Number(series.startDt) <= Date.now() && Number(series.endDt) >= Date.now()
    : true;

  return (
    <TouchableOpacity
      className="mx-4 mb-4"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('TournamentDetail', {
          name,
          subtitle: series ? `${startDate} - ${endDate}` : 'Indian Premier League',
        })
      }
    >
      <View className="bg-primary rounded-2xl p-5 overflow-hidden">
        {/* Badges */}
        <View className="flex-row mb-4">
          {isActive && (
            <View className="bg-live rounded-full px-2.5 py-1 mr-2 flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
              <Text className="text-white text-xs font-bold">LIVE NOW</Text>
            </View>
          )}
          <View className="bg-white/20 rounded-full px-2.5 py-1">
            <Text className="text-white text-xs font-bold tracking-wider">
              PREMIER DIVISION
            </Text>
          </View>
        </View>

        {/* Tournament Name */}
        <Text className="text-white text-2xl font-bold font-heading leading-8 mb-2">
          {name}
        </Text>

        {/* Progress Info */}
        <Text className="text-accent-light text-sm font-body mb-5">
          {series ? `${startDate} – ${endDate}` : 'Week 4 of 8 • 12 Matches\nRemaining'}
        </Text>

        {/* CTA */}
        <View className="bg-secondary self-start rounded-full px-6 py-2.5">
          <Text className="text-white text-sm font-bold tracking-wider font-heading">
            VIEW STANDINGS
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
