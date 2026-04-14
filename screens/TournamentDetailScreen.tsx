import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import ScreenHeader from '../components/ScreenHeader';
import TournamentHero from '../components/TournamentHero';
import TournamentStats from '../components/TournamentStats';
import LatestResult from '../components/LatestResult';
import TournamentLeaderboard from '../components/TournamentLeaderboard';
import SquadRoster from '../components/SquadRoster';
import TournamentMatchesTab from '../components/TournamentMatchesTab';

type Props = NativeStackScreenProps<RootStackParamList, 'TournamentDetail'>;

const TABS = ['Overview', 'Matches', 'Squads', 'Stats'];

const PARTICIPATING_TEAMS = [
  { short: 'CSK', color: '#FFCB05' },
  { short: 'MI', color: '#004BA0' },
  { short: 'RCB', color: '#EC1C24' },
  { short: 'KKR', color: '#3A225D' },
  { short: 'DC', color: '#004C93' },
  { short: 'RR', color: '#E73895' },
  { short: 'GT', color: '#1B2A4A' },
  { short: 'SRH', color: '#FF822A' },
];

function OverviewContent({ name, subtitle }: { name: string; subtitle?: string }) {
  return (
    <>
      <TournamentHero name={name} subtitle={subtitle} />
      <TournamentStats />
      <LatestResult />

      {/* Participating Squads */}
      <View className="px-4 mt-4 mb-2">
        <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-3 font-heading">
          PARTICIPATING SQUADS
        </Text>
        <View className="flex-row flex-wrap -m-1">
          {PARTICIPATING_TEAMS.map((team) => (
            <View key={team.short} className="p-1">
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: team.color }}
              >
                <Text className="text-white text-xs font-bold">{team.short}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <TournamentLeaderboard />
    </>
  );
}

function StatsPlaceholder() {
  return (
    <View className="items-center justify-center py-20">
      <Icon name="stats-chart-outline" size={48} color="#9E9E9E" />
      <Text className="text-gray-500 dark:text-gray-400 text-base mt-4 font-body">Tournament Stats</Text>
      <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-body">Coming soon</Text>
    </View>
  );
}

export default function TournamentDetailScreen({ route }: Props) {
  const [activeTab, setActiveTab] = useState('Overview');
  const { name, subtitle } = route.params;

  return (
    <View className="flex-1 bg-neutral dark:bg-dark-bg">
      <ScreenHeader title="TOURNAMENTS" rightIcon="search-outline" />

      {/* Tab Bar */}
      <View className="bg-white dark:bg-dark-card flex-row border-b border-gray-200 dark:border-dark-surface">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center py-3 ${
              activeTab === tab ? 'border-b-2 border-primary' : ''
            }`}
          >
            <Text
              className={`text-xs font-bold tracking-wider ${
                activeTab === tab ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Overview' && (
          <OverviewContent name={name} subtitle={subtitle} />
        )}
        {activeTab === 'Matches' && <TournamentMatchesTab />}
        {activeTab === 'Squads' && <SquadRoster />}
        {activeTab === 'Stats' && <StatsPlaceholder />}
      </ScrollView>
    </View>
  );
}
