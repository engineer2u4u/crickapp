import React from 'react';
import { View, Text } from 'react-native';

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

const COMMENTARY: OverBlock[] = [
  {
    over: 15,
    summary: '14 Runs | 1 Wicket',
    totalScore: '148/4',
    balls: [
      {
        ball: '14.6',
        bowler: 'Bumrah',
        batter: 'Gaikwad',
        result: '1 run',
        detail: 'Full on off stump, driven to long-on for a single.',
        type: 'run',
      },
      {
        ball: '14.5',
        bowler: 'Bumrah',
        batter: 'Dube',
        result: 'SIX',
        detail:
          'Short ball, Dube rocks back and pulls it over deep mid-wicket! Huge hit into the stands.',
        type: 'six',
      },
      {
        ball: '14.4',
        bowler: 'Bumrah',
        batter: 'Gaikwad',
        result: 'FOUR',
        detail:
          'Overpitched outside off, Gaikwad drives beautifully through the covers. Racing away to the boundary.',
        type: 'four',
      },
      {
        ball: '14.3',
        bowler: 'Bumrah',
        batter: 'Gaikwad',
        result: '0 runs',
        detail: 'Good length on middle, defended back to the bowler.',
        type: 'dot',
      },
      {
        ball: '14.2',
        bowler: 'Bumrah',
        batter: 'Dube',
        result: '2 runs',
        detail:
          'Flicked off the pads through square leg, come back for a comfortable two.',
        type: 'run',
      },
      {
        ball: '14.1',
        bowler: 'Bumrah',
        batter: 'Gaikwad',
        result: '1 run',
        detail: 'Yorker on the toes, dug out to mid-on for a quick single.',
        type: 'run',
      },
    ],
  },
  {
    over: 14,
    summary: '8 Runs | 0 Wickets',
    totalScore: '134/3',
    balls: [
      {
        ball: '13.6',
        bowler: 'Coetzee',
        batter: 'Gaikwad',
        result: 'FOUR',
        detail:
          'Short and wide outside off, cut hard past point. No chance for the fielder.',
        type: 'four',
      },
      {
        ball: '13.5',
        bowler: 'Coetzee',
        batter: 'Gaikwad',
        result: '0 runs',
        detail: 'Bouncer! Gaikwad ducks under it. Well directed.',
        type: 'dot',
      },
      {
        ball: '13.4',
        bowler: 'Coetzee',
        batter: 'Dube',
        result: '1 run',
        detail: 'Pushed to long-off, easy single.',
        type: 'run',
      },
      {
        ball: '13.3',
        bowler: 'Coetzee',
        batter: 'Dube',
        result: '0 runs',
        detail: 'Full and straight, defended solidly.',
        type: 'dot',
      },
      {
        ball: '13.2',
        bowler: 'Coetzee',
        batter: 'Dube',
        result: 'WIDE',
        detail: 'Down the leg side, umpire signals wide.',
        type: 'wide',
      },
      {
        ball: '13.1',
        bowler: 'Coetzee',
        batter: 'Dube',
        result: '2 runs',
        detail: 'Clipped off the hips, runs through square leg.',
        type: 'run',
      },
    ],
  },
];

const EVENT_COLORS: Record<string, { bg: string; text: string }> = {
  four: { bg: 'bg-primary/20', text: 'text-primary' },
  six: { bg: 'bg-primary/20', text: 'text-primary' },
  wicket: { bg: 'bg-live/20', text: 'text-live' },
  dot: { bg: 'bg-surface', text: 'text-muted' },
  run: { bg: 'bg-surface', text: 'text-foreground' },
  wide: { bg: 'bg-secondary/20', text: 'text-secondary' },
  noball: { bg: 'bg-secondary/20', text: 'text-secondary' },
};

function BallCard({ event }: { event: BallEvent }) {
  const colors = EVENT_COLORS[event.type] ?? EVENT_COLORS.run;

  return (
    <View className="flex-row mb-3">
      {/* Ball number */}
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${colors.bg}`}>
        <Text className={`text-xs font-bold ${colors.text}`}>
          {event.ball}
        </Text>
      </View>

      {/* Detail */}
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="text-foreground text-sm font-bold font-body">
            {event.bowler} to {event.batter}
          </Text>
          <View className={`ml-2 rounded-full px-2 py-0.5 ${colors.bg}`}>
            <Text className={`text-xs font-bold ${colors.text}`}>
              {event.result}
            </Text>
          </View>
        </View>
        <Text className="text-muted text-xs font-body leading-4">
          {event.detail}
        </Text>
      </View>
    </View>
  );
}

export default function MatchCommentaryTab() {
  return (
    <View className="px-4 mt-4 mb-6">
      {/* Win Probability */}
      <View className="bg-card rounded-2xl p-4 mb-4">
        <Text className="text-muted text-xs tracking-widest font-body mb-2">
          WIN PROBABILITY
        </Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-primary text-sm font-bold font-body w-12">
            CSK
          </Text>
          <View className="flex-1 h-3 bg-surface rounded-full overflow-hidden mx-2">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: '68%' }}
            />
          </View>
          <Text className="text-primary text-sm font-bold font-body w-10 text-right">
            68%
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-muted text-sm font-bold font-body w-12">MI</Text>
          <View className="flex-1 h-3 bg-surface rounded-full overflow-hidden mx-2">
            <View
              className="h-full bg-secondary rounded-full"
              style={{ width: '32%' }}
            />
          </View>
          <Text className="text-muted text-sm font-bold font-body w-10 text-right">
            32%
          </Text>
        </View>
      </View>

      {/* Commentary */}
      {COMMENTARY.map((over) => (
        <View key={over.over} className="mb-4">
          {/* Over Summary */}
          <View className="bg-card rounded-xl p-3 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-primary w-8 h-8 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">
                  {over.over}
                </Text>
              </View>
              <Text className="text-foreground text-sm font-bold font-body">
                {over.summary}
              </Text>
            </View>
            <View className="bg-surface rounded-full px-2.5 py-0.5">
              <Text className="text-foreground text-xs font-bold font-body">
                {over.totalScore}
              </Text>
            </View>
          </View>

          {/* Balls */}
          {over.balls.map((ball) => (
            <BallCard key={ball.ball} event={ball} />
          ))}
        </View>
      ))}
    </View>
  );
}
