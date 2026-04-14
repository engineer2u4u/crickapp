import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLeagueSeries, useFinishedSeries, useHomeMatches } from '../hooks/useCricketData';
import TournamentCard from '../components/TournamentCard';
import MatchCardApi from '../components/MatchCardApi';

const TABS = ['Ongoing', 'Upcoming', 'Finished'];

export default function TournamentsScreen() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const series = useLeagueSeries();
  const finished = useFinishedSeries();
  const matches = useHomeMatches();

  const allSeries = series.data.flatMap((g) => g.series);
  const now = Date.now();

  const ongoingSeries = allSeries.filter(
    (s) => Number(s.startDt) <= now && Number(s.endDt) >= now,
  );
  const upcomingSeries = allSeries.filter((s) => Number(s.startDt) > now);

  const isLoading =
    activeTab === 'Finished' ? finished.loading : series.loading;

  const handleRefresh = () => {
    series.refresh();
    finished.refresh();
    matches.refresh();
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-neutral dark:bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral dark:bg-dark-bg"
      contentContainerClassName="pb-4"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={handleRefresh}
          colors={['#1B5E20']}
          tintColor="#1B5E20"
        />
      }
    >
      {/* Filter Tabs */}
      <View className="flex-row px-4 py-3">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 mr-2 ${
              activeTab === tab ? 'bg-primary' : 'bg-gray-200 dark:bg-dark-surface'
            }`}
          >
            <Text
              className={`text-sm font-bold ${
                activeTab === tab ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Ongoing Tab ── */}
      {activeTab === 'Ongoing' && (
        <>
          {ongoingSeries.length === 0 ? (
            <EmptyState icon="radio-outline" message="No leagues are currently running" />
          ) : (
            <>
              {/* Featured Tournament */}
              <TournamentCard series={ongoingSeries[0]} />

              {/* Recent Matches */}
              {matches.data.recent.length > 0 && (
                <View className="px-4 mt-2">
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <View className="w-1 h-5 bg-primary rounded-full mr-2" />
                      <Text className="text-gray-900 dark:text-white text-lg font-bold font-heading">
                        Recent Matches
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Text className="text-tertiary text-xs font-bold tracking-widest">
                        VIEW ALL
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {matches.data.recent.slice(0, 4).map((m) => (
                    <MatchCardApi key={m.matchInfo.matchId} match={m} />
                  ))}
                </View>
              )}

              {/* Other Ongoing Leagues */}
              {ongoingSeries.length > 1 && (
                <View className="mt-4">
                  {ongoingSeries.slice(1).map((s) => (
                    <TournamentCard key={s.id} series={s} />
                  ))}
                </View>
              )}
            </>
          )}
        </>
      )}

      {/* ── Upcoming Tab ── */}
      {activeTab === 'Upcoming' && (
        <>
          {upcomingSeries.length === 0 ? (
            <EmptyState icon="calendar-outline" message="No upcoming leagues scheduled" />
          ) : (
            upcomingSeries.map((s) => (
              <TournamentCard key={s.id} series={s} />
            ))
          )}
        </>
      )}

      {/* ── Finished Tab ── */}
      {activeTab === 'Finished' && (
        <>
          {finished.data.length === 0 ? (
            <EmptyState icon="checkmark-done-outline" message="No completed leagues" />
          ) : (
            finished.data.slice(0, 20).map((s) => (
              <TournamentCard key={s.id} series={s} />
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}

function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <View className="items-center justify-center py-20 px-6">
      <Icon name={icon} size={48} color="#9E9E9E" />
      <Text className="text-gray-500 dark:text-gray-400 text-sm font-body mt-4 text-center">
        {message}
      </Text>
    </View>
  );
}
