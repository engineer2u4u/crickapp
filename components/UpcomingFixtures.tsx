import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { type MatchData } from '../services/types';
import { setReminder, cancelReminder, isReminderSet } from '../services/reminders';
import CImage from './CImage';

type Props = {
  matches?: MatchData[];
};

function formatTime(ts: string): string {
  const d = new Date(Number(ts));
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function UpcomingFixtures({ matches }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [reminderMap, setReminderMap] = useState<Record<number, boolean>>({});

  const list = matches?.slice(0, 3) ?? [];

  // Check which matches already have reminders set
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const map: Record<number, boolean> = {};
        for (const m of list) {
          map[m.matchInfo.matchId] = await isReminderSet(m.matchInfo.matchId);
        }
        setReminderMap(map);
      })();
    }, [matches]),
  );

  async function handleReminder(m: MatchData) {
    const { matchInfo } = m;
    const alreadySet = reminderMap[matchInfo.matchId];

    if (alreadySet) {
      Alert.alert('Cancel Reminder', `Remove reminder for ${matchInfo.team1.teamSName} vs ${matchInfo.team2.teamSName}?`, [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await cancelReminder(matchInfo.matchId);
            setReminderMap((prev) => ({ ...prev, [matchInfo.matchId]: false }));
          },
        },
      ]);
      return;
    }

    const success = await setReminder({
      matchId: matchInfo.matchId,
      team1: matchInfo.team1.teamSName,
      team2: matchInfo.team2.teamSName,
      seriesName: matchInfo.seriesName,
      matchDesc: matchInfo.matchDesc,
      startDate: matchInfo.startDate,
    });

    if (success) {
      setReminderMap((prev) => ({ ...prev, [matchInfo.matchId]: true }));
      Alert.alert(
        'Reminder Set!',
        `You'll be notified 15 min before ${matchInfo.team1.teamSName} vs ${matchInfo.team2.teamSName}.`,
      );
    }
  }

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-primary text-lg font-black italic font-heading">
          UPCOMING FIXTURES
        </Text>
        <TouchableOpacity>
          <Text className="text-tertiary text-xs font-bold tracking-wider">
            VIEW ALL
          </Text>
        </TouchableOpacity>
      </View>

      {list.length === 0 && (
        <View className="bg-white dark:bg-dark-card rounded-2xl p-4">
          <Text className="text-gray-500 dark:text-gray-400 text-sm font-body text-center">
            No upcoming matches
          </Text>
        </View>
      )}

      {list.map((m) => {
        const { matchInfo } = m;
        return (
          <TouchableOpacity
            key={matchInfo.matchId}
            className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-2"
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('MatchDetail', {
                matchId: matchInfo.matchId,
                team1: matchInfo.team1.teamSName,
                team2: matchInfo.team2.teamSName,
              })
            }
          >
            {/* Tournament Badge */}
            <View className="bg-gray-200 dark:bg-dark-surface self-start rounded-full px-3 py-1 mb-3">
              <Text className="text-xs text-gray-500 dark:text-gray-400 tracking-widest font-body">
                {matchInfo.seriesName}
              </Text>
            </View>

            {/* Teams */}
            <View className="flex-row items-center mb-3">
              <CImage
                imageId={matchInfo.team1.imageId}
                className="w-6 h-6 rounded-full mr-2"
              />
              <Text className="text-gray-900 dark:text-white font-bold text-base font-heading">
                {matchInfo.team1.teamSName}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 mx-2 font-bold">-</Text>
              <Text className="text-gray-900 dark:text-white font-bold text-base font-heading">
                {matchInfo.team2.teamSName}
              </Text>
              <CImage
                imageId={matchInfo.team2.imageId}
                className="w-6 h-6 rounded-full ml-2"
              />
            </View>

            {/* Time */}
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-500 dark:text-gray-400 text-sm font-body">
                {formatTime(matchInfo.startDate)}
              </Text>
              <TouchableOpacity
                onPress={() => handleReminder(m)}
                className={`rounded-full px-4 py-1.5 ${
                  reminderMap[matchInfo.matchId]
                    ? 'bg-tertiary'
                    : 'bg-primary'
                }`}
              >
                <Text className="text-white text-xs font-bold tracking-wider">
                  {reminderMap[matchInfo.matchId] ? 'REMINDED' : 'REMIND'}
                </Text>
              </TouchableOpacity>
              <Text className="text-gray-500 dark:text-gray-400 text-sm font-body">
                {matchInfo.matchDesc}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
