import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import type { SeriesItem } from '../services/types';

type Props = {
  series?: SeriesItem[];
  title?: string;
};

function formatDate(ts: string): string {
  return new Date(Number(ts)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function LeagueCard({ league }: { league: SeriesItem }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isActive =
    Number(league.startDt) <= Date.now() && Number(league.endDt) >= Date.now();
  const accentColor = isActive ? '#1B5E20' : '#9E9E9E';

  return (
    <TouchableOpacity
      className="bg-card rounded-2xl overflow-hidden mb-3 flex-row"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('TournamentDetail', {
          name: league.name,
          subtitle: `${formatDate(league.startDt)} - ${formatDate(league.endDt)}`,
        })
      }
    >
      {/* Left Accent Bar */}
      <View className="w-1" style={{ backgroundColor: accentColor }} />

      {/* Content */}
      <View className="flex-1 p-4">
        {isActive && (
          <View className="flex-row items-center mb-1">
            <View className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5" />
            <Text className="text-primary text-xs font-bold font-body">LIVE</Text>
          </View>
        )}
        <Text className="text-foreground text-base font-bold font-heading">
          {league.name}
        </Text>
        <Text className="text-muted text-sm mt-1 font-body">
          {formatDate(league.startDt)} – {formatDate(league.endDt)}
        </Text>
      </View>

      {/* Arrow */}
      <View className="items-center justify-center pr-4">
        <Icon name="arrow-forward" size={18} color="#9E9E9E" />
      </View>
    </TouchableOpacity>
  );
}

export default function OngoingLeagues({ series, title }: Props) {
  const list = series ?? [];

  if (list.length === 0) {
    return (
      <View className="px-4 mt-6">
        <Text className="text-muted text-sm font-body text-center">
          No leagues found
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 mt-6">
      {/* Section Header */}
      <Text className="text-foreground text-lg font-bold font-heading mb-3">
        {title ?? 'Other Ongoing Leagues'}
      </Text>

      {list.map((league) => (
        <LeagueCard key={league.id} league={league} />
      ))}
    </View>
  );
}
