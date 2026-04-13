import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import MatchHero from '../components/MatchHero';
import MatchInfoTab from '../components/MatchInfoTab';
import MatchScorecardTab from '../components/MatchScorecardTab';
import MatchCommentaryTab from '../components/MatchCommentaryTab';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchDetail'>;

const TABS = ['Info', 'Scorecard', 'Commentary'];

export default function MatchDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState('Info');
  const iconColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const { team1, team2 } = route.params;

  return (
    <View className="flex-1 bg-bg">
      {/* Header */}
      <View
        className="bg-card border-b border-border px-4 pb-3 flex-row items-center justify-between"
        style={{ paddingTop: insets.top + 8 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-8 items-start"
        >
          <Icon name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-foreground text-base font-bold font-heading tracking-wider">
          MATCH CENTER
        </Text>
        <TouchableOpacity className="w-8 items-end">
          <Icon name="share-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>

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
      <View className="bg-card flex-row border-b border-border mt-3">
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
                activeTab === tab ? 'text-primary' : 'text-muted'
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
