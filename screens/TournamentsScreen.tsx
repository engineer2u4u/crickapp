import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import FeaturedTournament from '../components/FeaturedTournament';
import RecentMatches from '../components/RecentMatches';
import OngoingLeagues from '../components/OngoingLeagues';

const TABS = ['Ongoing', 'Upcoming', 'Finished'];

export default function TournamentsScreen() {
  const [activeTab, setActiveTab] = useState('Ongoing');

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="pb-4"
      showsVerticalScrollIndicator={false}
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

      <FeaturedTournament />
      <RecentMatches />
      <OngoingLeagues />
    </ScrollView>
  );
}
