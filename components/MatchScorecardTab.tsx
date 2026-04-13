import React from 'react';
import { View, Text } from 'react-native';

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

const BATTING: Batter[] = [
  {
    name: 'Ruturaj Gaikwad',
    runs: 61,
    balls: 40,
    fours: 7,
    sixes: 2,
    sr: '152.50',
    isNotOut: true,
  },
  {
    name: 'Ajinkya Rahane',
    runs: 28,
    balls: 22,
    fours: 3,
    sixes: 1,
    sr: '127.27',
    dismissal: 'c Kishan b Bumrah',
  },
  {
    name: 'Shivam Dube',
    runs: 34,
    balls: 18,
    fours: 2,
    sixes: 3,
    sr: '188.89',
    isNotOut: true,
  },
  {
    name: 'Devon Conway',
    runs: 12,
    balls: 14,
    fours: 1,
    sixes: 0,
    sr: '85.71',
    dismissal: 'b Coetzee',
  },
  {
    name: 'Moeen Ali',
    runs: 4,
    balls: 6,
    fours: 0,
    sixes: 0,
    sr: '66.67',
    dismissal: 'lbw Chawla',
  },
];

const BOWLING: Bowler[] = [
  { name: 'Jasprit Bumrah', overs: '4', maidens: 1, runs: 22, wickets: 1, economy: '5.50' },
  { name: 'Gerald Coetzee', overs: '3.2', maidens: 0, runs: 34, wickets: 1, economy: '10.20' },
  { name: 'Hardik Pandya', overs: '3', maidens: 0, runs: 31, wickets: 0, economy: '10.33' },
  { name: 'Piyush Chawla', overs: '2', maidens: 0, runs: 19, wickets: 1, economy: '9.50' },
  { name: 'Akash Madhwal', overs: '2', maidens: 0, runs: 28, wickets: 0, economy: '14.00' },
];

const FALL_OF_WICKETS: FallOfWicket[] = [
  { score: '52/1', over: '6.3', batter: 'Conway' },
  { score: '89/2', over: '10.4', batter: 'Rahane' },
  { score: '94/3', over: '11.2', batter: 'Moeen Ali' },
];

const PARTNERSHIP = { runs: 78, balls: 42, batter1: 'Gaikwad', batter2: 'Dube' };

function ColumnHeader({ labels }: { labels: string[] }) {
  return (
    <View className="flex-row items-center py-2 border-b border-border">
      <Text className="flex-1 text-muted text-xs font-bold font-body">
        {labels[0]}
      </Text>
      {labels.slice(1).map((l) => (
        <Text
          key={l}
          className="w-9 text-center text-muted text-xs font-bold font-body"
        >
          {l}
        </Text>
      ))}
    </View>
  );
}

function BatterRow({ batter }: { batter: Batter }) {
  return (
    <View className="border-b border-border py-2.5">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-foreground text-sm font-bold font-body">
            {batter.name}
            {batter.isNotOut ? ' *' : ''}
          </Text>
        </View>
        <Text className="w-9 text-center text-foreground text-sm font-bold font-heading">
          {batter.runs}
        </Text>
        <Text className="w-9 text-center text-muted text-sm font-body">
          {batter.balls}
        </Text>
        <Text className="w-9 text-center text-muted text-sm font-body">
          {batter.fours}
        </Text>
        <Text className="w-9 text-center text-muted text-sm font-body">
          {batter.sixes}
        </Text>
        <Text className="w-9 text-center text-muted text-sm font-body">
          {batter.sr}
        </Text>
      </View>
      {batter.dismissal && (
        <Text className="text-muted text-xs font-body mt-0.5">
          {batter.dismissal}
        </Text>
      )}
    </View>
  );
}

function BowlerRow({ bowler }: { bowler: Bowler }) {
  return (
    <View className="flex-row items-center border-b border-border py-2.5">
      <Text className="flex-1 text-foreground text-sm font-bold font-body">
        {bowler.name}
      </Text>
      <Text className="w-9 text-center text-muted text-sm font-body">
        {bowler.overs}
      </Text>
      <Text className="w-9 text-center text-muted text-sm font-body">
        {bowler.maidens}
      </Text>
      <Text className="w-9 text-center text-foreground text-sm font-bold font-heading">
        {bowler.runs}
      </Text>
      <Text className="w-9 text-center text-primary text-sm font-bold font-heading">
        {bowler.wickets}
      </Text>
      <Text className="w-9 text-center text-muted text-sm font-body">
        {bowler.economy}
      </Text>
    </View>
  );
}

export default function MatchScorecardTab() {
  return (
    <View className="px-4 mt-4 mb-6">
      {/* CSK Batting */}
      <Text className="text-foreground text-base font-bold font-heading mb-2">
        CSK Batting
      </Text>
      <View className="bg-card rounded-2xl p-4 mb-4">
        <ColumnHeader labels={['BATTER', 'R', 'B', '4s', '6s', 'SR']} />
        {BATTING.map((b) => (
          <BatterRow key={b.name} batter={b} />
        ))}
      </View>

      {/* Current Partnership */}
      <View className="bg-card rounded-2xl p-4 mb-4 items-center">
        <Text className="text-muted text-xs tracking-widest font-body mb-1">
          CURRENT PARTNERSHIP
        </Text>
        <Text className="text-primary text-4xl font-bold font-heading">
          {PARTNERSHIP.runs}
        </Text>
        <Text className="text-muted text-xs font-body mt-1">
          Runs off {PARTNERSHIP.balls} balls
        </Text>
        <View className="flex-row mt-3">
          <View className="bg-surface rounded-full px-3 py-1 mr-2">
            <Text className="text-foreground text-xs font-bold font-body">
              {PARTNERSHIP.batter1}
            </Text>
          </View>
          <View className="bg-surface rounded-full px-3 py-1">
            <Text className="text-foreground text-xs font-bold font-body">
              {PARTNERSHIP.batter2}
            </Text>
          </View>
        </View>
      </View>

      {/* MI Bowling */}
      <Text className="text-foreground text-base font-bold font-heading mb-2">
        MI Bowling
      </Text>
      <View className="bg-card rounded-2xl p-4 mb-4">
        <ColumnHeader labels={['BOWLER', 'O', 'M', 'R', 'W', 'ECO']} />
        {BOWLING.map((b) => (
          <BowlerRow key={b.name} bowler={b} />
        ))}
      </View>

      {/* Fall of Wickets */}
      <Text className="text-foreground text-base font-bold font-heading mb-2">
        Fall of Wickets
      </Text>
      <View className="bg-card rounded-2xl p-4">
        {FALL_OF_WICKETS.map((fow, i) => (
          <View
            key={i}
            className={`flex-row items-center justify-between py-2.5 ${
              i < FALL_OF_WICKETS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <View className="flex-row items-center">
              <View className="bg-live/20 rounded-full px-2 py-0.5 mr-2">
                <Text className="text-live text-xs font-bold">{fow.score}</Text>
              </View>
              <Text className="text-foreground text-sm font-body">
                {fow.batter}
              </Text>
            </View>
            <Text className="text-muted text-xs font-body">
              ov {fow.over}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
