import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { formatScore, formatOvers, type MatchData } from '../services/types';
import CImage from './CImage';

type Props = {
  match?: MatchData;
};

export default function FinalWhistle({ match }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const info = match?.matchInfo;
  const t1 = info?.team1;
  const t2 = info?.team2;
  const t1Score = match?.matchScore?.team1Score?.inngs1;
  const t2Score = match?.matchScore?.team2Score?.inngs1;

  const team1Name = t1?.teamSName ?? 'NZ';
  const team2Name = t2?.teamSName ?? 'PAK';
  const score1 = t1Score ? formatScore(t1Score) : '179/6';
  const score2 = t2Score ? formatScore(t2Score) : '142/9';
  const seriesName = info?.seriesName ?? 'IND TEST';
  const status = info?.status ?? 'NZ won by 37 runs';

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-foreground text-sm font-bold tracking-widest font-heading">
          FINAL WHISTLE
        </Text>
        <TouchableOpacity>
          <Text className="text-tertiary text-xs font-bold tracking-wider">
            RESULT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Match Card */}
      <TouchableOpacity
        className="bg-card rounded-2xl p-4"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('MatchDetail', { team1: team1Name, team2: team2Name })
        }
      >
        {/* Format Badge */}
        <View className="bg-surface self-start rounded-full px-3 py-1 mb-3">
          <Text className="text-xs text-muted tracking-widest font-body">
            {seriesName} &bull; COMPLETED
          </Text>
        </View>

        {/* Scores */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            {t1 ? (
              <CImage
                imageId={t1.imageId}
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : (
              <Text className="text-xl mr-2">&#127475;&#127487;</Text>
            )}
            <Text className="text-foreground font-bold text-sm mr-2 font-body">
              {team1Name}
            </Text>
            <Text className="text-foreground text-xl font-bold font-heading">
              {score1}
            </Text>
          </View>

          <Text className="text-muted font-bold">v</Text>

          <View className="flex-row items-center">
            <Text className="text-foreground text-xl font-bold font-heading">
              {score2}
            </Text>
            <Text className="text-foreground font-bold text-sm ml-2 mr-2 font-body">
              {team2Name}
            </Text>
            {t2 ? (
              <CImage
                imageId={t2.imageId}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <Text className="text-xl">&#127477;&#127472;</Text>
            )}
          </View>
        </View>

        {/* Result */}
        <Text className="text-muted text-xs mt-1 font-body">
          {status}
        </Text>

        {/* Actions */}
        <View className="flex-row mt-3 pt-3 border-t border-border">
          <Text className="text-tertiary text-xs font-bold tracking-wider mr-4">
            SCORECARD
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
