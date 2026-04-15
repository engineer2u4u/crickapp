import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { LiveInnings } from '../hooks/useMatchLive';

// ─── Types ───────────────────────────────────────────────

type Batter = {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: string;
  isNotOut?: boolean;
  dismissal?: string;
};

type Bowler = {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  economy: string;
};

type FallOfWicket = {
  score: string;
  over: string;
  batter: string;
};

// ─── Sub-components ──────────────────────────────────────

function ColumnHeader({ labels }: { labels: string[] }) {
  return (
    <View className="flex-row items-center py-2 border-b border-gray-200 dark:border-dark-surface">
      <Text className="flex-1 text-gray-500 dark:text-gray-400 text-xs font-bold font-body">
        {labels[0]}
      </Text>
      {labels.slice(1).map((l) => (
        <Text
          key={l}
          className="w-9 text-center text-gray-500 dark:text-gray-400 text-xs font-bold font-body"
        >
          {l}
        </Text>
      ))}
    </View>
  );
}

function BatterRow({ batter }: { batter: Batter }) {
  return (
    <View className="border-b border-gray-200 dark:border-dark-surface py-2.5">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-white text-sm font-bold font-body">
            {batter.name}
            {batter.isNotOut ? ' *' : ''}
          </Text>
        </View>
        <Text className="w-9 text-center text-gray-900 dark:text-white text-sm font-bold font-heading">
          {batter.runs}
        </Text>
        <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
          {batter.balls}
        </Text>
        <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
          {batter.fours}
        </Text>
        <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
          {batter.sixes}
        </Text>
        <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
          {batter.sr}
        </Text>
      </View>
      {batter.dismissal && (
        <Text className="text-gray-500 dark:text-gray-400 text-xs font-body mt-0.5">
          {batter.dismissal}
        </Text>
      )}
    </View>
  );
}

function BowlerRow({ bowler }: { bowler: Bowler }) {
  return (
    <View className="flex-row items-center border-b border-gray-200 dark:border-dark-surface py-2.5">
      <Text className="flex-1 text-gray-900 dark:text-white text-sm font-bold font-body">
        {bowler.name}
      </Text>
      <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
        {bowler.overs}
      </Text>
      <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
        {bowler.maidens}
      </Text>
      <Text className="w-9 text-center text-gray-900 dark:text-white text-sm font-bold font-heading">
        {bowler.runs}
      </Text>
      <Text className="w-9 text-center text-primary text-sm font-bold font-heading">
        {bowler.wickets}
      </Text>
      <Text className="w-9 text-center text-gray-500 dark:text-gray-400 text-sm font-body">
        {bowler.economy}
      </Text>
    </View>
  );
}

function InningsCard({ innings }: { innings: { batLabel: string; bowlLabel: string; score: string; batters: Batter[]; bowlers: Bowler[]; fow: FallOfWicket[]; partnership?: { runs: number; balls: number; bat1: string; bat2: string } } }) {
  const { batLabel, bowlLabel, score, batters, bowlers, fow, partnership } = innings;
  return (
    <>
      {/* Innings header */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-900 dark:text-white text-base font-bold font-heading">
          {batLabel} Batting
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-bold font-heading">
          {score}
        </Text>
      </View>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
        <ColumnHeader labels={['BATTER', 'R', 'B', '4s', '6s', 'SR']} />
        {batters.map((b, i) => (
          <BatterRow key={`${b.name}-${i}`} batter={b} />
        ))}
      </View>

      {partnership && (
        <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4 items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-xs tracking-widest font-body mb-1">
            PARTNERSHIP
          </Text>
          <Text className="text-primary text-4xl font-bold font-heading">
            {partnership.runs}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-body mt-1">
            Runs off {partnership.balls} balls
          </Text>
          <View className="flex-row mt-3">
            <View className="bg-gray-200 dark:bg-dark-surface rounded-full px-3 py-1 mr-2">
              <Text className="text-gray-900 dark:text-white text-xs font-bold font-body">
                {partnership.bat1}
              </Text>
            </View>
            <View className="bg-gray-200 dark:bg-dark-surface rounded-full px-3 py-1">
              <Text className="text-gray-900 dark:text-white text-xs font-bold font-body">
                {partnership.bat2}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Bowling */}
      <Text className="text-gray-900 dark:text-white text-base font-bold font-heading mb-2">
        {bowlLabel} Bowling
      </Text>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
        <ColumnHeader labels={['BOWLER', 'O', 'M', 'R', 'W', 'ECO']} />
        {bowlers.map((b, i) => (
          <BowlerRow key={`${b.name}-${i}`} bowler={b} />
        ))}
      </View>

      {fow.length > 0 && (
        <>
          <Text className="text-gray-900 dark:text-white text-base font-bold font-heading mb-2">
            Fall of Wickets
          </Text>
          <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
            {fow.map((f, i) => (
              <View
                key={i}
                className={`flex-row items-center justify-between py-2.5 ${
                  i < fow.length - 1 ? 'border-b border-gray-200 dark:border-dark-surface' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View className="bg-live/20 rounded-full px-2 py-0.5 mr-2">
                    <Text className="text-live text-xs font-bold">{f.score}</Text>
                  </View>
                  <Text className="text-gray-900 dark:text-white text-sm font-body">
                    {f.batter}
                  </Text>
                </View>
                <Text className="text-gray-500 dark:text-gray-400 text-xs font-body">
                  ov {f.over}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────

type Props = {
  innings?: LiveInnings[] | null;
  team1Short: string;
  team2Short: string;
};

export default function MatchScorecardTab({ innings, team1Short, team2Short }: Props) {
  if (!innings || innings.length === 0) {
    return (
      <View className="items-center justify-center py-20 px-6">
        <Icon name="stats-chart-outline" size={48} color="#9E9E9E" />
        <Text className="text-gray-500 dark:text-gray-400 text-base font-body text-center mt-4">
          Scorecard not available yet
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-xs font-body text-center mt-1">
          Scorecard will appear once the match starts
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 mt-4 mb-6">
      {innings.map((inn, idx) => {
        const batters: Batter[] = inn.batters.map((b) => ({
          name: b.name,
          runs: b.runs,
          balls: b.balls,
          fours: b.fours,
          sixes: b.sixes,
          sr: b.strikeRate,
          isNotOut: b.isNotOut,
          dismissal: b.dismissal || undefined,
        }));
        const bowlers: Bowler[] = inn.bowlers.map((b) => ({
          name: b.name,
          overs: b.overs,
          maidens: b.maidens,
          runs: b.runs,
          wickets: b.wickets,
          economy: b.economy,
        }));
        const fow: FallOfWicket[] = inn.fallOfWickets;
        const lastPartnership = inn.partnerships[inn.partnerships.length - 1];

        return (
          <InningsCard
            key={idx}
            innings={{
              batLabel: inn.batTeamShortName || inn.batTeamName,
              bowlLabel: inn.bowlTeamShortName || inn.bowlTeamName,
              score: `${inn.score}/${inn.wickets} (${inn.overs} ov)`,
              batters,
              bowlers,
              fow,
              partnership: lastPartnership
                ? { runs: lastPartnership.runs, balls: lastPartnership.balls, bat1: lastPartnership.bat1, bat2: lastPartnership.bat2 }
                : undefined,
            }}
          />
        );
      })}
    </View>
  );
}
