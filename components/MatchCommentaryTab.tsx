import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { LiveOver } from '../hooks/useMatchLive';

type BallEvent = {
  ball: string;
  bowler: string;
  batter: string;
  result: string;
  detail: string;
  type: 'four' | 'six' | 'wicket' | 'dot' | 'run' | 'wide' | 'noball';
};

type OverBlock = {
  over: number;
  summary: string;
  totalScore: string;
  balls: BallEvent[];
};

const EVENT_COLORS: Record<string, { bg: string; text: string }> = {
  four: { bg: 'bg-primary/20', text: 'text-primary' },
  six: { bg: 'bg-primary/20', text: 'text-primary' },
  wicket: { bg: 'bg-live/20', text: 'text-live' },
  dot: { bg: 'bg-gray-200 dark:bg-dark-surface', text: 'text-gray-500 dark:text-gray-400' },
  run: { bg: 'bg-gray-200 dark:bg-dark-surface', text: 'text-gray-900 dark:text-white' },
  wide: { bg: 'bg-secondary/20', text: 'text-secondary' },
  noball: { bg: 'bg-secondary/20', text: 'text-secondary' },
};

function BallCard({ event }: { event: BallEvent }) {
  const colors = EVENT_COLORS[event.type] ?? EVENT_COLORS.run;
  return (
    <View className="flex-row mb-3">
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${colors.bg}`}>
        <Text className={`text-xs font-bold ${colors.text}`}>{event.ball}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="text-gray-900 dark:text-white text-sm font-bold font-body">
            {event.bowler} to {event.batter}
          </Text>
          <View className={`ml-2 rounded-full px-2 py-0.5 ${colors.bg}`}>
            <Text className={`text-xs font-bold ${colors.text}`}>{event.result}</Text>
          </View>
        </View>
        <Text className="text-gray-500 dark:text-gray-400 text-xs font-body leading-4">
          {event.detail}
        </Text>
      </View>
    </View>
  );
}

function RunRateBar({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View className="flex-row items-center mr-4">
      <Text className="text-gray-500 dark:text-gray-400 text-xs font-body mr-1">{label}</Text>
      <Text className="text-gray-900 dark:text-white text-xs font-bold font-heading">{value}</Text>
    </View>
  );
}

type Props = {
  matchId: number;
  commentary: LiveOver[];
  currentRunRate: string;
  requiredRunRate: string;
  team1Short: string;
  team2Short: string;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  onGoLive: () => void;
  onStopLive: () => void;
};

export default function MatchCommentaryTab({
  matchId,
  commentary,
  currentRunRate,
  requiredRunRate,
  isLive,
  loading,
  error,
  onGoLive,
  onStopLive,
}: Props) {
  // Not live yet — show Go Live button
  if (!isLive && commentary.length === 0) {
    return (
      <View className="px-4 mt-6">
        {matchId > 0 ? (
          <>
            <View className="items-center mb-6">
              <Icon name="chatbubbles-outline" size={48} color="#9E9E9E" />
              <Text className="text-gray-500 dark:text-gray-400 text-base font-body text-center mt-4">
                Ball-by-ball commentary
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs font-body text-center mt-1">
                Start live feed to get real-time commentary updates
              </Text>
            </View>
            <TouchableOpacity
              onPress={onGoLive}
              className="bg-primary flex-row items-center justify-center rounded-xl py-3"
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Icon name="radio-outline" size={18} color="#FFFFFF" />
                  <Text className="text-white text-sm font-bold tracking-wider ml-2">
                    GO LIVE
                  </Text>
                </>
              )}
            </TouchableOpacity>
            {error && (
              <Text className="text-live text-xs font-body mt-2 text-center">{error}</Text>
            )}
          </>
        ) : (
          <View className="items-center py-12">
            <Icon name="chatbubbles-outline" size={48} color="#9E9E9E" />
            <Text className="text-gray-500 dark:text-gray-400 text-sm font-body text-center mt-4">
              Commentary not available for this match
            </Text>
          </View>
        )}
      </View>
    );
  }

  const overs: OverBlock[] = commentary.map((o) => ({
    over: o.over,
    summary: o.summary,
    totalScore: o.totalScore,
    balls: o.balls,
  }));

  return (
    <View className="px-4 mt-4 mb-6">
      {/* Live controls */}
      {isLive && (
        <TouchableOpacity
          onPress={onStopLive}
          className="bg-live flex-row items-center justify-center rounded-xl py-2.5 mb-4"
          activeOpacity={0.8}
        >
          <Icon name="stop-circle-outline" size={16} color="#FFFFFF" />
          <Text className="text-white text-xs font-bold tracking-wider ml-2">
            STOP LIVE
          </Text>
          <View className="ml-2 flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
            <Text className="text-white/70 text-xs font-body">updates every 30s</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Run Rates */}
      {(currentRunRate || requiredRunRate) && (
        <View className="bg-white dark:bg-dark-card rounded-2xl p-3 mb-4 flex-row">
          <RunRateBar label="CRR" value={currentRunRate} />
          <RunRateBar label="RRR" value={requiredRunRate} />
        </View>
      )}

      {loading && (
        <View className="py-8 items-center">
          <ActivityIndicator size="large" color="#1B5E20" />
        </View>
      )}

      {/* Commentary overs */}
      {overs.map((over) => (
        <View key={over.over} className="mb-4">
          <View className="bg-white dark:bg-dark-card rounded-xl p-3 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-primary w-8 h-8 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">{over.over}</Text>
              </View>
              <Text className="text-gray-900 dark:text-white text-sm font-bold font-body">
                {over.summary}
              </Text>
            </View>
            {over.totalScore ? (
              <View className="bg-gray-200 dark:bg-dark-surface rounded-full px-2.5 py-0.5">
                <Text className="text-gray-900 dark:text-white text-xs font-bold font-body">
                  {over.totalScore}
                </Text>
              </View>
            ) : null}
          </View>

          {over.balls.map((ball, idx) => (
            <BallCard key={`${ball.ball}-${idx}`} event={ball} />
          ))}
        </View>
      ))}
    </View>
  );
}
