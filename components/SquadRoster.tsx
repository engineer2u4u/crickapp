import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type PlayerEntry = {
  name: string;
  badge?: string;
};

type RosterCategory = {
  role: string;
  players: PlayerEntry[];
};

type Team = {
  name: string;
  short: string;
  color: string;
  subtitle: string;
  roster: RosterCategory[];
};

const TEAMS: Team[] = [
  {
    name: 'CHENNAI SUPER KINGS',
    short: 'CSK',
    color: '#FFCB05',
    subtitle: 'DEFENDING CHAMPIONS • 25 PLAYERS',
    roster: [
      {
        role: 'WICKETKEEPERS',
        players: [
          { name: 'MS DHONI', badge: 'CAPTAIN' },
          { name: 'DEVON CONWAY', badge: 'INTERNATIONAL' },
        ],
      },
      {
        role: 'BATSMEN',
        players: [
          { name: 'RUTURAJ GAIKWAD' },
          { name: 'AJINKYA RAHANE' },
          { name: 'SHAIK RASHEED' },
          { name: 'SAMEER RIZVI' },
        ],
      },
      {
        role: 'ALL-ROUNDERS',
        players: [
          { name: 'RAVINDRA JADEJA' },
          { name: 'SHIVAM DUBE' },
          { name: 'MOEEN ALI' },
          { name: 'DARYL MITCHELL' },
          { name: 'MITCHELL SANTNER' },
          { name: 'RACHIN RAVINDRA' },
        ],
      },
      {
        role: 'BOWLERS',
        players: [
          { name: 'DEEPAK CHAHAR' },
          { name: 'MAHEESH THEEKSHANA' },
          { name: 'MATHEESHA PATHIRANA' },
          { name: 'TUSHAR DESHPANDE' },
          { name: 'SHARDUL THAKUR' },
          { name: 'MUSTAFIZUR RAHMAN' },
        ],
      },
    ],
  },
  {
    name: 'MUMBAI INDIANS',
    short: 'MI',
    color: '#004BA0',
    subtitle: '5 TIME WINNERS • 24 PLAYERS',
    roster: [],
  },
  {
    name: 'GUJARAT TITANS',
    short: 'GT',
    color: '#1B2A4A',
    subtitle: '2022 CHAMPIONS • 23 PLAYERS',
    roster: [],
  },
  {
    name: 'ROYAL CHALLENGERS BANGALORE',
    short: 'RCB',
    color: '#EC1C24',
    subtitle: 'MAIDEN TITLE 2024 • 25 PLAYERS',
    roster: [],
  },
];

function TeamLogo({ short, color }: { short: string; color: string }) {
  return (
    <View
      className="w-10 h-10 rounded-xl items-center justify-center mr-3"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white text-xs font-bold">{short}</Text>
    </View>
  );
}

function TeamSection({ team }: { team: Team }) {
  const [expanded, setExpanded] = useState(team.short === 'CSK');
  const hasRoster = team.roster.length > 0;

  return (
    <View className="bg-white dark:bg-dark-card rounded-2xl mb-3 overflow-hidden">
      <TouchableOpacity
        className="flex-row items-center p-4"
        onPress={() => hasRoster && setExpanded(!expanded)}
        activeOpacity={hasRoster ? 0.7 : 1}
      >
        <TeamLogo short={team.short} color={team.color} />
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-white text-sm font-bold font-heading">
            {team.name}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-body mt-0.5">
            {team.subtitle}
          </Text>
        </View>
        {hasRoster && (
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#9E9E9E"
          />
        )}
      </TouchableOpacity>

      {expanded && hasRoster && (
        <View className="px-4 pb-4">
          {team.roster.map((category) => (
            <View key={category.role} className="mb-3">
              {/* Role Header */}
              <Text className="text-tertiary text-xs font-bold tracking-widest mb-2 font-body">
                {category.role}
              </Text>

              {/* Players */}
              {category.players.map((player) => (
                <View
                  key={player.name}
                  className="flex-row items-center justify-between py-2 border-b border-gray-200 dark:border-dark-surface"
                >
                  <Text className="text-gray-900 dark:text-white text-sm font-body">
                    {player.name}
                  </Text>
                  {player.badge && (
                    <Text className="text-gray-500 dark:text-gray-400 text-xs tracking-wider font-body">
                      {player.badge}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity className="bg-primary rounded-xl py-3 items-center mt-2">
            <Text className="text-white text-xs font-bold tracking-wider font-heading">
              VIEW FULL OFFICIAL SQUAD LIST
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function SquadRoster() {
  return (
    <View className="px-4 mt-2 mb-4">
      {/* Header */}
      <View className="items-center mb-4">
        <Text className="text-gray-500 dark:text-gray-400 text-xs tracking-widest font-body mb-1">
          INDIAN PREMIER LEAGUE 2026
        </Text>
        <Text className="text-gray-900 dark:text-white text-xl font-bold font-heading text-center">
          OFFICIAL ROSTERS
        </Text>
      </View>

      {TEAMS.map((team) => (
        <TeamSection key={team.short} team={team} />
      ))}
    </View>
  );
}
