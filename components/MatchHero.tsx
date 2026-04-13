import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  format: string;
  team1: { short: string; color: string; score: string; overs: string };
  team2: { short: string; color: string; score: string; overs: string };
  status: string;
  crr?: string;
  rrr?: string;
  isLive?: boolean;
};

function TeamLogo({ short, color }: { short: string; color: string }) {
  return (
    <View
      className="w-11 h-11 rounded-full items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white text-xs font-bold">{short}</Text>
    </View>
  );
}

export default function MatchHero({
  format,
  team1,
  team2,
  status,
  crr,
  rrr,
  isLive,
}: Props) {
  return (
    <View className="mx-4 mt-2 bg-primary rounded-2xl p-4 overflow-hidden">
      {/* Format + Status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="bg-white/20 rounded-full px-2.5 py-0.5">
          <Text className="text-white text-xs font-bold tracking-wider">
            {format}
          </Text>
        </View>
        {isLive && (
          <View className="bg-live rounded-full px-2.5 py-0.5 flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
            <Text className="text-white text-xs font-bold">LIVE</Text>
          </View>
        )}
      </View>

      {/* Scores */}
      <View className="flex-row items-center justify-between mb-3">
        {/* Team 1 */}
        <View className="flex-row items-center flex-1">
          <TeamLogo short={team1.short} color={team1.color} />
          <View className="ml-3">
            <Text className="text-white text-2xl font-bold font-heading">
              {team1.score}
            </Text>
            <Text className="text-accent-light text-xs font-body">
              {team1.short} • {team1.overs} ov
            </Text>
          </View>
        </View>

        <Text className="text-secondary text-lg font-bold mx-3">vs</Text>

        {/* Team 2 */}
        <View className="flex-row items-center flex-1 justify-end">
          <View className="items-end mr-3">
            <Text className="text-white text-2xl font-bold font-heading">
              {team2.score}
            </Text>
            <Text className="text-accent-light text-xs font-body">
              {team2.short} • {team2.overs} ov
            </Text>
          </View>
          <TeamLogo short={team2.short} color={team2.color} />
        </View>
      </View>

      {/* Match Status / Rates */}
      <View className="bg-black/20 rounded-xl px-3 py-2 flex-row justify-between">
        <Text className="text-accent-light text-xs font-body">{status}</Text>
        {crr && (
          <Text className="text-white text-xs font-bold font-body">
            CRR {crr}
            {rrr ? ` • RRR ${rrr}` : ''}
          </Text>
        )}
      </View>
    </View>
  );
}
