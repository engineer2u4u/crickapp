import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { formatScore, type MatchData } from '../services/types';
import CImage from './CImage';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  match?: MatchData;
};

export default function FinalWhistle({ match }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest font-heading">
          FINAL WHISTLE
        </Text>
        {match && (
          <TouchableOpacity>
            <Text className="text-tertiary text-xs font-bold tracking-wider">
              RESULT
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Empty State */}
      {!match && (
        <View className="bg-white dark:bg-dark-card rounded-2xl p-6 items-center">
          <Icon name="checkmark-done-outline" size={32} color="#9E9E9E" />
          <Text className="text-gray-500 dark:text-gray-400 text-sm font-body mt-3 text-center">
            No recent results available
          </Text>
        </View>
      )}

      {/* Match Card */}
      {match && (
        <TouchableOpacity
          className="bg-white dark:bg-dark-card rounded-2xl p-4"
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('MatchDetail', {
              team1: match.matchInfo.team1.teamSName,
              team2: match.matchInfo.team2.teamSName,
            })
          }
        >
          {/* Format Badge */}
          <View className="bg-gray-200 dark:bg-dark-surface self-start rounded-full px-3 py-1 mb-3">
            <Text className="text-xs text-gray-500 dark:text-gray-400 tracking-widest font-body">
              {match.matchInfo.seriesName} &bull; COMPLETED
            </Text>
          </View>

          {/* Scores */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <CImage
                imageId={match.matchInfo.team1.imageId}
                className="w-6 h-6 rounded-full mr-2"
              />
              <Text className="text-gray-900 dark:text-white font-bold text-sm mr-2 font-body">
                {match.matchInfo.team1.teamSName}
              </Text>
              <Text className="text-gray-900 dark:text-white text-xl font-bold font-heading">
                {match.matchScore?.team1Score?.inngs1
                  ? formatScore(match.matchScore.team1Score.inngs1)
                  : '-'}
              </Text>
            </View>

            <Text className="text-gray-500 dark:text-gray-400 font-bold">v</Text>

            <View className="flex-row items-center">
              <Text className="text-gray-900 dark:text-white text-xl font-bold font-heading">
                {match.matchScore?.team2Score?.inngs1
                  ? formatScore(match.matchScore.team2Score.inngs1)
                  : '-'}
              </Text>
              <Text className="text-gray-900 dark:text-white font-bold text-sm ml-2 mr-2 font-body">
                {match.matchInfo.team2.teamSName}
              </Text>
              <CImage
                imageId={match.matchInfo.team2.imageId}
                className="w-6 h-6 rounded-full"
              />
            </View>
          </View>

          {/* Result */}
          <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-body">
            {match.matchInfo.status}
          </Text>

          {/* Actions */}
          <View className="flex-row mt-3 pt-3 border-t border-gray-200 dark:border-dark-surface">
            <Text className="text-tertiary text-xs font-bold tracking-wider mr-4">
              SCORECARD
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
