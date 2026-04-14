import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import ScreenHeader from '../components/ScreenHeader';
import MatchHero from '../components/MatchHero';
import MatchInfoTab from '../components/MatchInfoTab';
import MatchScorecardTab from '../components/MatchScorecardTab';
import MatchCommentaryTab from '../components/MatchCommentaryTab';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchDetail'>;

const TABS = ['Info', 'Scorecard', 'Commentary'];

export default function MatchDetailScreen({ route }: Props) {
  const [activeTab, setActiveTab] = useState('Info');
  const { team1, team2 } = route.params;

  return (
    <View className="flex-1 bg-neutral dark:bg-dark-bg">
      <ScreenHeader title="MATCH CENTER" rightIcon="share-outline" />

      {/* Match Hero */}
      <MatchHero
        format="T20"
        team1={{
          short: team1,
          color: '#FFCB05',
          score: '142/3',
          overs: '14.2',
        }}
        team2={{
          short: team2,
          color: '#004BA0',
          score: '186/8',
          overs: '20',
        }}
        status="CSK need 45 runs from 34 balls"
        crr="6.90"
        rrr="7.94"
        isLive
      />

      {/* Tab Bar */}
      <View className="bg-white dark:bg-dark-card flex-row border-b border-gray-200 dark:border-dark-surface mt-3">
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
        {activeTab === 'Info' && <MatchInfoTab />}
        {activeTab === 'Scorecard' && <MatchScorecardTab />}
        {activeTab === 'Commentary' && <MatchCommentaryTab />}
      </ScrollView>
    </View>
  );
}
