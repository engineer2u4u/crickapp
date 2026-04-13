import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { formatScore, formatOvers, type MatchData } from '../services/types';
import CImage from './CImage';

type Props = {
  match: MatchData;
  variant?: 'full' | 'compact';
};

function TeamRow({
  team,
  score,
  isBatting,
}: {
  team: { teamName: string; teamSName: string; imageId: number };
  score?: string;
  isBatting: boolean;
}) {
  return (
    <View className="flex-row items-center py-1.5">
      <CImage
        imageId={team.imageId}
        className="w-6 h-6 rounded-full mr-2"
      />
      <Text
        className={`text-sm flex-1 font-body ${
          isBatting ? 'text-foreground font-bold' : 'text-muted'
        }`}
      >
        {team.teamSName}
      </Text>
      {score ? (
        <Text
          className={`text-base font-heading ${
            isBatting ? 'text-foreground font-bold' : 'text-muted'
          }`}
        >
          {score}
        </Text>
      ) : null}
    </View>
  );
}

export default function MatchCardApi({ match, variant = 'full' }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { matchInfo, matchScore } = match;

  const t1Score = matchScore?.team1Score?.inngs1;
  const t2Score = matchScore?.team2Score?.inngs1;
  const isLive = matchInfo.state === 'In Progress';
  const isComplete = matchInfo.state === 'Complete';

  return (
    <TouchableOpacity
      className="bg-card rounded-2xl p-4 mb-2"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('MatchDetail', {
          team1: matchInfo.team1.teamSName,
          team2: matchInfo.team2.teamSName,
        })
      }
    >
      {/* Top row: series + status */}
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-muted text-xs font-body flex-1 mr-2" numberOfLines={1}>
          {variant === 'full' ? matchInfo.seriesName : matchInfo.matchDesc}
        </Text>
        {isLive && (
          <View className="bg-live/15 rounded-full px-2 py-0.5 flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-live mr-1" />
            <Text className="text-live text-xs font-bold">LIVE</Text>
          </View>
        )}
        {isComplete && (
          <View className="bg-surface rounded-full px-2 py-0.5">
            <Text className="text-muted text-xs font-bold">
              {matchInfo.stateTitle}
            </Text>
          </View>
        )}
        {!isLive && !isComplete && (
          <View className="bg-primary/15 rounded-full px-2 py-0.5">
            <Text className="text-primary text-xs font-bold">UPCOMING</Text>
          </View>
        )}
      </View>

      {/* Teams */}
      <TeamRow
        team={matchInfo.team1}
        score={t1Score ? `${formatScore(t1Score)} (${formatOvers(t1Score)})` : undefined}
        isBatting={matchInfo.currBatTeamId === matchInfo.team1.teamId}
      />
      <TeamRow
        team={matchInfo.team2}
        score={t2Score ? `${formatScore(t2Score)} (${formatOvers(t2Score)})` : undefined}
        isBatting={matchInfo.currBatTeamId === matchInfo.team2.teamId}
      />

      {/* Status */}
      {matchInfo.status && (
        <Text className="text-muted text-xs font-body mt-1" numberOfLines={1}>
          {matchInfo.status}
        </Text>
      )}

      {/* Venue (full variant only) */}
      {variant === 'full' && matchInfo.venueInfo && (
        <Text className="text-muted text-xs font-body mt-0.5" numberOfLines={1}>
          {matchInfo.venueInfo.ground}, {matchInfo.venueInfo.city}
        </Text>
      )}
    </TouchableOpacity>
  );
}
