import React from 'react';
import { View, Text } from 'react-native';

type Player = {
  rank: number;
  name: string;
  team: string;
  teamColor: string;
  value: string;
};

const ORANGE_CAP: Player[] = [
  { rank: 1, name: 'J. Buttler', team: 'RR', teamColor: '#E73895', value: '482 Runs' },
  { rank: 2, name: 'R. Gaikwad', team: 'CSK', teamColor: '#FFCB05', value: '452 Runs' },
  { rank: 3, name: 'S. Gill', team: 'GT', teamColor: '#1B2A4A', value: '415 Runs' },
];

const PURPLE_CAP: Player[] = [
  { rank: 1, name: 'Y. Chahal', team: 'RR', teamColor: '#E73895', value: '21 Wickets' },
  { rank: 2, name: 'H. Patel', team: 'GT', teamColor: '#1B2A4A', value: '19 Wickets' },
  { rank: 3, name: 'M. Pathirana', team: 'CSK', teamColor: '#FFCB05', value: '18 Wickets' },
];

function LeaderboardRow({ player }: { player: Player }) {
  return (
    <View className="flex-row items-center py-2.5">
      <Text className="text-gray-500 dark:text-gray-400 text-sm w-6 font-body">{player.rank}</Text>
      <View
        className="w-7 h-7 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: player.teamColor }}
      >
        <Text className="text-white text-xs font-bold">
          {player.team.charAt(0)}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 dark:text-white text-sm font-bold font-body">
          {player.name}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-xs font-body">{player.team}</Text>
      </View>
      <Text className="text-gray-900 dark:text-white text-sm font-bold font-heading">
        {player.value}
      </Text>
    </View>
  );
}

function CapSection({
  title,
  dotColor,
  titleColor,
  players,
}: {
  title: string;
  dotColor: string;
  titleColor: string;
  players: Player[];
}) {
  return (
    <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-3">
      <View className="flex-row items-center mb-2">
        <View
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: dotColor }}
        />
        <Text
          className="text-sm font-bold font-heading tracking-wider"
          style={{ color: titleColor }}
        >
          {title}
        </Text>
      </View>
      {players.map((player) => (
        <LeaderboardRow key={player.name} player={player} />
      ))}
    </View>
  );
}

export default function TournamentLeaderboard() {
  return (
    <View className="px-4 mt-4 mb-4">
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-3 font-heading">
        LEADERBOARDS
      </Text>

      <CapSection
        title="ORANGE CAP RACE"
        dotColor="#FF6D00"
        titleColor="#FF6D00"
        players={ORANGE_CAP}
      />

      <CapSection
        title="PURPLE CAP RACE"
        dotColor="#7B1FA2"
        titleColor="#7B1FA2"
        players={PURPLE_CAP}
      />
    </View>
  );
}
