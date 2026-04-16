import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import ScreenHeader from '../components/ScreenHeader';
import TournamentHero from '../components/TournamentHero';
import TournamentMatchesTab from '../components/TournamentMatchesTab';
import SquadRoster from '../components/SquadRoster';
import MatchCardApi from '../components/MatchCardApi';
import {
  useSeriesMatches,
  useSeriesSquads,
} from '../hooks/useCricketData';

type Props = NativeStackScreenProps<RootStackParamList, 'TournamentDetail'>;

const TABS = ['Overview', 'Matches', 'Squads'];

export default function TournamentDetailScreen({ route }: Props) {
  const [activeTab, setActiveTab] = useState('Overview');
  const { seriesId, name, subtitle } = route.params;
  const seriesMatches = useSeriesMatches(seriesId);
  const squads = useSeriesSquads(seriesId);

  // Get recent + upcoming for overview
  const allMatches = seriesMatches.data.flatMap((g) => g.matches);
  const recentMatches = allMatches
    .filter((m) => m.matchInfo.state === 'Complete')
    .slice(-3)
    .reverse();
  const upcomingMatches = allMatches
    .filter((m) => m.matchInfo.state !== 'Complete')
    .slice(0, 3);

  const totalMatches = allMatches.length;
  const completedMatches = allMatches.filter((m) => m.matchInfo.state === 'Complete').length;

  return (
    <View className="flex-1 bg-neutral dark:bg-dark-bg">
      <ScreenHeader title="TOURNAMENT" />

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
          <>
            <TournamentHero
              name={name}
              subtitle={subtitle}
              matchesPlayed={completedMatches}
              totalMatches={totalMatches}
            />

            {/* Participating Squads */}
            {squads.data.length > 0 && (
              <View className="px-4 mt-4 mb-2">
                <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-3 font-heading">
                  PARTICIPATING TEAMS
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="pr-4"
                >
                  {squads.data.map((squad) => (
                    <View key={squad.squadId} className="items-center mr-4">
                      <View className="w-12 h-12 bg-primary/15 rounded-full items-center justify-center">
                        <Text className="text-primary text-xs font-bold">
                          {squad.teamName.split(' ').map((w) => w[0]).join('').slice(0, 3)}
                        </Text>
                      </View>
                      <Text
                        className="text-gray-500 dark:text-gray-400 text-xs font-body mt-1 w-14 text-center"
                        numberOfLines={1}
                      >
                        {squad.teamName.split(' ').pop()}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Recent Results */}
            {recentMatches.length > 0 && (
              <View className="px-4 mt-4">
                <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-3 font-heading">
                  RECENT RESULTS
                </Text>
                {recentMatches.map((m) => (
                  <MatchCardApi key={m.matchInfo.matchId} match={m} variant="compact" />
                ))}
              </View>
            )}

            {/* Upcoming */}
            {upcomingMatches.length > 0 && (
              <View className="px-4 mt-4">
                <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-3 font-heading">
                  UPCOMING MATCHES
                </Text>
                {upcomingMatches.map((m) => (
                  <MatchCardApi key={m.matchInfo.matchId} match={m} variant="compact" />
                ))}
              </View>
            )}

            {seriesMatches.loading && (
              <View className="py-12 items-center">
                <ActivityIndicator size="large" color="#1B5E20" />
              </View>
            )}
          </>
        )}

        {activeTab === 'Matches' && (
          <TournamentMatchesTab
            matchGroups={seriesMatches.data}
            loading={seriesMatches.loading}
          />
        )}

        {activeTab === 'Squads' && (
          <SquadRoster
            seriesId={seriesId}
            squads={squads.data}
            loading={squads.loading}
          />
        )}
      </ScrollView>
    </View>
  );
}
