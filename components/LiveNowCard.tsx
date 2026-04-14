import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { formatScore, formatOvers, type MatchData } from '../services/types';
import CImage from './CImage';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  match?: MatchData;
};

export default function LiveNowCard({ match }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mx-4 mt-4">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest font-heading">
          LIVE NOW
        </Text>
        {match && (
          <View className="bg-live rounded-full px-2.5 py-1 flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
            <Text className="text-white text-xs font-bold">LIVE</Text>
          </View>
        )}
      </View>

      {/* Empty State */}
      {!match && (
        <View className="bg-white dark:bg-dark-card rounded-2xl p-6 items-center">
          <Icon name="radio-outline" size={32} color="#9E9E9E" />
          <Text className="text-gray-500 dark:text-gray-400 text-sm font-body mt-3 text-center">
            No matches are live right now
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-body mt-1 text-center">
            Check back later for live action
          </Text>
        </View>
      )}

      {/* Match Card */}
      {match && (
        <TouchableOpacity
          className="bg-primary rounded-2xl p-4 overflow-hidden"
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('MatchDetail', {
              team1: match.matchInfo.team1.teamSName,
              team2: match.matchInfo.team2.teamSName,
            })
          }
        >
          {/* Match Info */}
          <Text className="text-accent-light text-xs tracking-widest mb-4 font-body">
            {match.matchInfo.team1.teamSName} VS{' '}
            {match.matchInfo.team2.teamSName} &bull;{' '}
            {match.matchInfo.seriesName}
          </Text>

          {/* Scores */}
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center flex-1">
              <CImage
                imageId={match.matchInfo.team1.imageId}
                className="w-10 h-10 rounded-full mr-3"
              />
              <View>
                <Text className="text-white text-3xl font-bold font-heading">
                  {match.matchScore?.team1Score?.inngs1
                    ? formatScore(match.matchScore.team1Score.inngs1)
                    : '-'}
                </Text>
                <Text className="text-accent-light text-xs tracking-widest mt-0.5">
                  {match.matchInfo.team1.teamSName}
                  {match.matchScore?.team1Score?.inngs1
                    ? ` (${formatOvers(match.matchScore.team1Score.inngs1)} ov)`
                    : ''}
                </Text>
              </View>
            </View>

            <Text className="text-secondary text-xl font-bold mx-2">vs</Text>

            <View className="flex-row items-center flex-1 justify-end">
              <View className="items-end">
                <Text className="text-white text-3xl font-bold font-heading">
                  {match.matchScore?.team2Score?.inngs1
                    ? formatScore(match.matchScore.team2Score.inngs1)
                    : '-'}
                </Text>
                <Text className="text-accent-light text-xs tracking-widest mt-0.5">
                  {match.matchInfo.team2.teamSName}
                  {match.matchScore?.team2Score?.inngs1
                    ? ` (${formatOvers(match.matchScore.team2Score.inngs1)} ov)`
                    : ''}
                </Text>
              </View>
              <CImage
                imageId={match.matchInfo.team2.imageId}
                className="w-10 h-10 rounded-full ml-3"
              />
            </View>
          </View>

          {/* Status */}
          <View className="bg-black/20 rounded-xl p-3">
            <Text className="text-accent-light text-xs font-body">
              {match.matchInfo.status}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
