import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Article = {
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  hasImage: boolean;
  imageBg: string;
};

const ARTICLES: Article[] = [
  {
    category: 'ANALYSIS',
    categoryColor: '#1B5E20',
    title: 'Rise of the Speedsters: Why 150mph is the new standard in league cricket',
    excerpt:
      'Inside the shift towards raw pace and how modern training regimes are creating a new generation of...',
    hasImage: true,
    imageBg: '#2E7D32',
  },
  {
    category: 'LEAGUE NEWS',
    categoryColor: '#FF6D00',
    title: 'League Expansion: Two new franchises confirmed for the upcoming 2026 season',
    excerpt:
      'The league announces the addition of teams from two major global markets, bringing the total to...',
    hasImage: true,
    imageBg: '#1B5E20',
  },
  {
    category: 'INSIGHT',
    categoryColor: '#1B5E20',
    title: 'Fan Engagement: How VR is changing the stadium experience for remote viewers',
    excerpt:
      'Exploring new tech strategies to enhance match-day atmosphere for fans tuning in from home...',
    hasImage: true,
    imageBg: '#004BA0',
  },
];

function ArticleCard({ article }: { article: Article }) {
  return (
    <TouchableOpacity className="bg-card rounded-2xl overflow-hidden mb-3">
      <View className="flex-row">
        {/* Content */}
        <View className="flex-1 p-4">
          <Text
            className="text-xs font-bold tracking-widest mb-2 font-body"
            style={{ color: article.categoryColor }}
          >
            {article.category}
          </Text>
          <Text className="text-foreground text-sm font-bold font-heading leading-5 mb-2">
            {article.title}
          </Text>
          <Text className="text-muted text-xs leading-4 font-body">
            {article.excerpt}
          </Text>
        </View>

        {/* Thumbnail */}
        {article.hasImage && (
          <View
            className="w-28 items-center justify-center"
            style={{ backgroundColor: article.imageBg }}
          >
            <Icon name="image-outline" size={24} color="rgba(255,255,255,0.5)" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function LatestHeadlines() {
  return (
    <View className="px-4 mt-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-foreground text-lg font-bold font-heading">
          LATEST HEADLINES
        </Text>
        <TouchableOpacity>
          <Text className="text-tertiary text-xs font-bold tracking-widest">
            VIEW MORE
          </Text>
        </TouchableOpacity>
      </View>

      {ARTICLES.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </View>
  );
}
