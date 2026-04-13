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

export default function LiveNowCard({ match }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const info = match?.matchInfo;
  const t1 = info?.team1;
  const t2 = info?.team2;
  const t1Score = match?.matchScore?.team1Score?.inngs1;
  const t2Score = match?.matchScore?.team2Score?.inngs1;

  const team1Name = t1?.teamSName ?? 'IND';
  const team2Name = t2?.teamSName ?? 'AUS';
  const score1 = t1Score ? formatScore(t1Score) : '184/3';
  const score2 = t2Score ? formatScore(t2Score) : '122/10';
  const series = info?.seriesName ?? 'T20 WORLD CUP';
  const status = info?.status;

  return (
    <View className="mx-4 mt-4">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-foreground text-sm font-bold tracking-widest font-heading">
          LIVE NOW
        </Text>
        <View className="bg-live rounded-full px-2.5 py-1 flex-row items-center">
          <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
          <Text className="text-white text-xs font-bold">LIVE</Text>
        </View>
      </View>

      {/* Match Card */}
      <TouchableOpacity
        className="bg-primary rounded-2xl p-4 overflow-hidden"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('MatchDetail', { team1: team1Name, team2: team2Name })
        }
      >
        {/* Match Info */}
        <Text className="text-accent-light text-xs tracking-widest mb-4 font-body">
          {team1Name} VS {team2Name} &bull; {series}
        </Text>

        {/* Scores */}
        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-row items-center flex-1">
            {t1 ? (
              <CImage
                imageId={t1.imageId}
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <Text className="text-3xl mr-3">&#127470;&#127475;</Text>
            )}
            <View>
              <Text className="text-white text-3xl font-bold font-heading">
                {score1}
              </Text>
              <Text className="text-accent-light text-xs tracking-widest mt-0.5">
                {team1Name}
                {t1Score ? ` (${formatOvers(t1Score)} ov)` : ''}
              </Text>
            </View>
          </View>

          <Text className="text-secondary text-xl font-bold mx-2">vs</Text>

          <View className="flex-row items-center flex-1 justify-end">
            <View className="items-end">
              <Text className="text-white text-3xl font-bold font-heading">
                {score2}
              </Text>
              <Text className="text-accent-light text-xs tracking-widest mt-0.5">
                {team2Name}
                {t2Score ? ` (${formatOvers(t2Score)} ov)` : ''}
              </Text>
            </View>
            {t2 ? (
              <CImage
                imageId={t2.imageId}
                className="w-10 h-10 rounded-full ml-3"
              />
            ) : (
              <Text className="text-3xl ml-3">&#127462;&#127482;</Text>
            )}
          </View>
        </View>

        {/* Status */}
        {status && (
          <View className="bg-black/20 rounded-xl p-3">
            <Text className="text-accent-light text-xs font-body">
              {status}
            </Text>
          </View>
        )}
        {!status && (
          <View className="bg-black/20 rounded-xl p-3">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-accent-light text-xs tracking-widest font-body">
                  CURRENT RR
                </Text>
                <Text className="text-white text-xl font-bold mt-1 font-heading">
                  5.36
                </Text>
              </View>
              <View className="flex-1 ml-6">
                <Text className="text-accent-light text-xs tracking-widest font-body">
                  WIN PROBABILITY
                </Text>
                <View className="flex-row items-center mt-2">
                  <View className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-secondary rounded-full"
                      style={{ width: '84%' }}
                    />
                  </View>
                  <Text className="text-white text-sm font-bold ml-3 font-heading">
                    {team1Name} 84%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
