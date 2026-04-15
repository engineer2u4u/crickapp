import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../components/ScreenHeader';
import {
  getReminders,
  cancelReminder,
  type Reminder,
} from '../services/reminders';

function formatDate(ts: string): string {
  const d = new Date(Number(ts));
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatTime(ts: string): string {
  const d = new Date(Number(ts));
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function ReminderCard({
  reminder,
  onCancel,
}: {
  reminder: Reminder;
  onCancel: (matchId: number) => void;
}) {
  return (
    <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mx-4 mb-3">
      {/* Series badge */}
      <View className="bg-gray-200 dark:bg-dark-surface self-start rounded-full px-3 py-1 mb-2">
        <Text className="text-xs text-gray-500 dark:text-gray-400 tracking-widest font-body">
          {reminder.seriesName}
        </Text>
      </View>

      {/* Teams */}
      <Text className="text-gray-900 dark:text-white font-bold text-base font-heading mb-1">
        {reminder.team1} vs {reminder.team2}
      </Text>

      {/* Match info + time */}
      <View className="flex-row items-center justify-between mt-2">
        <View>
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-body">
            {reminder.matchDesc}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm font-body mt-1">
            {formatDate(reminder.startDate)} at {formatTime(reminder.startDate)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => onCancel(reminder.matchId)}
          className="bg-red-100 dark:bg-red-900/30 rounded-full px-3 py-1.5 flex-row items-center"
        >
          <Icon name="close-circle-outline" size={14} color="#EF4444" />
          <Text className="text-red-500 text-xs font-bold ml-1">CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, []),
  );

  async function loadReminders() {
    const data = await getReminders();
    setReminders(data);
  }

  function handleCancel(matchId: number) {
    Alert.alert(
      'Cancel Reminder',
      'Are you sure you want to cancel this reminder?',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Cancel Reminder',
          style: 'destructive',
          onPress: async () => {
            await cancelReminder(matchId);
            loadReminders();
          },
        },
      ],
    );
  }

  return (
    <View className="flex-1 bg-neutral dark:bg-dark-bg">
      <ScreenHeader title="MY REMINDERS" />

      {reminders.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Icon name="notifications-off-outline" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 dark:text-gray-400 text-base font-body text-center mt-4">
            No reminders set yet. Tap the REMIND button on upcoming matches to
            get notified before they start.
          </Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => String(item.matchId)}
          renderItem={({ item }) => (
            <ReminderCard reminder={item} onCancel={handleCancel} />
          )}
          contentContainerClassName="pt-4 pb-8"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
