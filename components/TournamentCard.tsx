import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import type { SeriesItem } from '../services/types';

type Props = {
  series: SeriesItem;
};

function formatDate(ts: string): string {
  return new Date(Number(ts)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TournamentCard({ series }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const now = Date.now();
  const isActive = Number(series.startDt) <= now && Number(series.endDt) >= now;
  const isUpcoming = Number(series.startDt) > now;
  const isFinished = Number(series.endDt) < now;

  const startDate = formatDate(series.startDt);
  const endDate = formatDate(series.endDt);

  return (
    <TouchableOpacity
      className="mx-4 mb-3"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('TournamentDetail', {
          seriesId: series.id,
          name: series.name,
          subtitle: `${startDate} - ${endDate}`,
        })
      }
    >
      <View className="bg-primary rounded-2xl p-5 overflow-hidden">
        {/* Badges */}
        <View className="flex-row mb-3">
          {isActive && (
            <View className="bg-live rounded-full px-2.5 py-1 mr-2 flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
              <Text className="text-white text-xs font-bold">LIVE</Text>
            </View>
          )}
          {isUpcoming && (
            <View className="bg-white/20 rounded-full px-2.5 py-1 mr-2">
              <Text className="text-white text-xs font-bold">UPCOMING</Text>
            </View>
          )}
          {isFinished && (
            <View className="bg-white/20 rounded-full px-2.5 py-1 mr-2">
              <Text className="text-white text-xs font-bold">COMPLETED</Text>
            </View>
          )}
        </View>

        {/* Tournament Name */}
        <Text className="text-white text-xl font-bold font-heading leading-7 mb-2">
          {series.name}
        </Text>

        {/* Dates */}
        <Text className="text-accent-light text-sm font-body">
          {startDate} – {endDate}
        </Text>

        {/* Arrow */}
        <View className="flex-row items-center mt-3">
          <Text className="text-accent-light text-xs font-bold tracking-wider font-body mr-1">
            VIEW DETAILS
          </Text>
          <Icon name="arrow-forward" size={14} color="#BBDEBB" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
