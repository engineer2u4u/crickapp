import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../components/ScreenHeader';
import MatchHero from '../components/MatchHero';
import MatchInfoTab from '../components/MatchInfoTab';
import MatchScorecardTab from '../components/MatchScorecardTab';
import MatchCommentaryTab from '../components/MatchCommentaryTab';
import { useMatchData, useCommentaryLive } from '../hooks/useMatchLive';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchDetail'>;

const TABS = ['Info', 'Scorecard', 'Commentary'];

export default function MatchDetailScreen({ route }: Props) {
  const [activeTab, setActiveTab] = useState('Info');
  const { matchId, team1, team2 } = route.params;

  // Auto-fetches info + scorecard on mount
  const match = useMatchData(matchId);
  // Commentary: only fetches when user taps Go Live
  const comm = useCommentaryLive(matchId);

  const firstInnings = match.innings[0];
  const secondInnings = match.innings[1];

  const heroProps = match.matchInfo
    ? {
        format: match.matchInfo.matchFormat,
        team1: {
          short: match.matchInfo.team1.shortName || team1,
          color: '#004BA0',
          score: firstInnings
            ? `${firstInnings.score}/${firstInnings.wickets}`
            : '-',
          overs: firstInnings ? String(firstInnings.overs) : '',
        },
        team2: {
          short: match.matchInfo.team2.shortName || team2,
          color: '#FFCB05',
          score: secondInnings
            ? `${secondInnings.score}/${secondInnings.wickets}`
            : '-',
          overs: secondInnings ? String(secondInnings.overs) : '',
        },
        status: match.matchInfo.status,
        crr: comm.currentRunRate || undefined,
        rrr: comm.requiredRunRate || undefined,
        isLive: match.matchInfo.state === 'In Progress',
      }
    : {
        format: '',
        team1: { short: team1, color: '#004BA0', score: '-', overs: '' },
        team2: { short: team2, color: '#FFCB05', score: '-', overs: '' },
        status: match.loading ? 'Loading...' : (match.error ?? ''),
        isLive: false,
      };

  return (
    <View className="flex-1 bg-neutral dark:bg-dark-bg">
      <ScreenHeader title="MATCH CENTER" />

      {/* Match Hero */}
      {match.loading ? (
        <View className="mx-4 mt-2 bg-primary rounded-2xl p-8 items-center">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <MatchHero {...heroProps} />
      )}

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
        {activeTab === 'Info' && (
          match.loading ? (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#1B5E20" />
            </View>
          ) : (
            <MatchInfoTab
              liveInfo={match.matchInfo}
              team1Short={team1}
              team2Short={team2}
            />
          )
        )}

        {activeTab === 'Scorecard' && (
          match.loading ? (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#1B5E20" />
            </View>
          ) : (
            <MatchScorecardTab
              innings={match.innings.length > 0 ? match.innings : null}
              team1Short={team1}
              team2Short={team2}
            />
          )
        )}

        {activeTab === 'Commentary' && (
          <MatchCommentaryTab
            matchId={matchId}
            commentary={comm.commentary}
            currentRunRate={comm.currentRunRate}
            requiredRunRate={comm.requiredRunRate}
            team1Short={team1}
            team2Short={team2}
            isLive={comm.isLive}
            loading={comm.loading}
            error={comm.error}
            onGoLive={comm.goLive}
            onStopLive={comm.stopLive}
          />
        )}
      </ScrollView>
    </View>
  );
}
