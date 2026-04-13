import React from 'react';
import { ScrollView } from 'react-native';
import LiveNowCard from '../components/LiveNowCard';
import UpcomingFixtures from '../components/UpcomingFixtures';
import FinalWhistle from '../components/FinalWhistle';
import InsideEdge from '../components/InsideEdge';
import WorldHierarchy from '../components/WorldHierarchy';

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="pb-4"
      showsVerticalScrollIndicator={false}
    >
      <LiveNowCard />
      <UpcomingFixtures />
      <FinalWhistle />
      <InsideEdge />
      <WorldHierarchy />
    </ScrollView>
  );
}
