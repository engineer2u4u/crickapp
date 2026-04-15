import React from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useHomeMatches, useNews } from '../hooks/useCricketData';
import LiveNowCard from '../components/LiveNowCard';
import UpcomingFixtures from '../components/UpcomingFixtures';
import FinalWhistle from '../components/FinalWhistle';
import InsideEdge from '../components/InsideEdge';
import WorldHierarchy from '../components/WorldHierarchy';

export default function HomeScreen() {
  const matches = useHomeMatches();
  const news = useNews(4);

  const isLoading = matches.loading && news.loading;

  const handleRefresh = () => {
    matches.refresh();
    news.refresh();
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
      <LiveNowCard match={matches.data.live[0]} />
      <UpcomingFixtures matches={matches.data.upcoming} />
      <FinalWhistle match={matches.data.recent[0]} />
      <InsideEdge stories={news.data} />
      <WorldHierarchy />
    </ScrollView>
  );
}
