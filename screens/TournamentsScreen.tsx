import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLeagueSeries, useHomeMatches } from '../hooks/useCricketData';
import { type SeriesItem } from '../services/types';
import FeaturedTournament from '../components/FeaturedTournament';
import RecentMatches from '../components/RecentMatches';
import OngoingLeagues from '../components/OngoingLeagues';

const TABS = ['Ongoing', 'Upcoming', 'Finished'];

export default function TournamentsScreen() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const series = useLeagueSeries();

  const allSeries = series.data.flatMap((g) => g.series);
  const now = Date.now();
  const ongoingSeries = allSeries.filter(
    (s) => Number(s.startDt) <= now && Number(s.endDt) >= now,
  );
  const upcomingSeries = allSeries.filter((s) => Number(s.startDt) > now);
  const finishedSeries = allSeries.filter((s) => Number(s.endDt) < now);

  if (series.loading) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="pb-4"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={series.refresh}
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
              activeTab === tab ? 'bg-primary' : 'bg-surface'
            }`}
          >
            <Text
              className={`text-sm font-bold ${
                activeTab === tab ? 'text-white' : 'text-muted'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Ongoing' && (
        <>
          <FeaturedTournament series={ongoingSeries[0]} />
          <RecentMatches />
          <OngoingLeagues series={ongoingSeries} />
        </>
      )}

      {activeTab === 'Upcoming' && (
        <OngoingLeagues series={upcomingSeries} title="Upcoming Leagues" />
      )}

      {activeTab === 'Finished' && (
        <OngoingLeagues series={finishedSeries} title="Completed Leagues" />
      )}
    </ScrollView>
  );
}
