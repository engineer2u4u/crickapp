import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { LiveMatchInfo } from '../hooks/useMatchLive';

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <View className="flex-row items-start py-2.5 border-b border-gray-200 dark:border-dark-surface">
      <Icon name={icon} size={16} color="#9E9E9E" />
      <View className="ml-3 flex-1">
        <Text className="text-gray-500 dark:text-gray-400 text-xs tracking-wider font-body mb-0.5">
          {label}
        </Text>
        <Text className="text-gray-900 dark:text-white text-sm font-body">{value}</Text>
      </View>
    </View>
  );
}

type Props = {
  liveInfo?: LiveMatchInfo | null;
  team1Short: string;
  team2Short: string;
};

export default function MatchInfoTab({ liveInfo, team1Short, team2Short }: Props) {
  if (!liveInfo) {
    return (
      <View className="items-center justify-center py-20 px-6">
        <Icon name="information-circle-outline" size={48} color="#9E9E9E" />
        <Text className="text-gray-500 dark:text-gray-400 text-base font-body text-center mt-4">
          Match info not available
        </Text>
      </View>
    );
  }

  const venue = `${liveInfo.venue}${liveInfo.city ? `, ${liveInfo.city}` : ''}`;
  const t1Label = liveInfo.team1.name || team1Short;
  const t2Label = liveInfo.team2.name || team2Short;

  return (
    <View className="px-4 mt-4 mb-6">
      {/* Match Info */}
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
        MATCH INFO
      </Text>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
        <InfoRow icon="location-outline" label="VENUE" value={venue} />
        <InfoRow icon="swap-horizontal-outline" label="TOSS" value={liveInfo.toss} />
        <InfoRow icon="people-outline" label="MATCH OFFICIALS" value={liveInfo.umpires} />
        <InfoRow icon="person-outline" label="3RD UMPIRE" value={liveInfo.thirdUmpire} />
        {liveInfo.referee ? <InfoRow icon="ribbon-outline" label="REFEREE" value={liveInfo.referee} /> : null}
      </View>

      {/* Status */}
      {liveInfo.status && (
        <>
          <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
            STATUS
          </Text>
          <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
            <Text className="text-gray-900 dark:text-white text-sm font-body">
              {liveInfo.status}
            </Text>
          </View>
        </>
      )}

      {/* Teams */}
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
        TEAMS
      </Text>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4">
        <View className="flex-row items-center py-2 border-b border-gray-200 dark:border-dark-surface">
          <View className="w-8 h-8 bg-primary/15 rounded-full items-center justify-center mr-3">
            <Text className="text-primary text-xs font-bold">{team1Short[0]}</Text>
          </View>
          <Text className="text-gray-900 dark:text-white text-sm font-bold font-heading flex-1">
            {t1Label}
          </Text>
        </View>
        <View className="flex-row items-center py-2">
          <View className="w-8 h-8 bg-secondary/15 rounded-full items-center justify-center mr-3">
            <Text className="text-secondary text-xs font-bold">{team2Short[0]}</Text>
          </View>
          <Text className="text-gray-900 dark:text-white text-sm font-bold font-heading flex-1">
            {t2Label}
          </Text>
        </View>
      </View>
    </View>
  );
}
