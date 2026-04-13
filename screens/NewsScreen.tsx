import React from 'react';
import { ScrollView } from 'react-native';
import DailyPitchReport from '../components/DailyPitchReport';
import LatestHeadlines from '../components/LatestHeadlines';
import NewsletterSignup from '../components/NewsletterSignup';

export default function NewsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="pb-4 pt-3"
      showsVerticalScrollIndicator={false}
    >
      <DailyPitchReport />
      <LatestHeadlines />
      <NewsletterSignup />
    </ScrollView>
  );
}
