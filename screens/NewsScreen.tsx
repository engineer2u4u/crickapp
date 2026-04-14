import React, { useEffect, useState } from 'react';
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
import { getNewsList } from '../services/api';
import CImage from '../components/CImage';

type Story = {
  id: number;
  hline: string;
  intro: string;
  pubTime: string;
  source: string;
  storyType: string;
  context: string;
  imageId: number;
  coverImage?: { id: string; caption: string; source: string };
};

type StoryListItem = {
  story?: Story;
  ad?: any;
};

function formatTimeAgo(timestamp: string): string {
  const diff = Date.now() - Number(timestamp);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function FeaturedCard({ story }: { story: Story }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="mx-4 mb-4 bg-white dark:bg-dark-card rounded-2xl overflow-hidden"
      activeOpacity={0.85}
      onPress={() => navigation.navigate('NewsDetail', { storyId: story.id })}
    >
      <CImage
        imageId={story.imageId}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-4">
        {/* Tags */}
        <View className="flex-row items-center mb-2">
          {story.context && (
            <View className="bg-primary rounded-full px-2.5 py-0.5 mr-2">
              <Text className="text-white text-xs font-bold">
                {story.context}
              </Text>
            </View>
          )}
          <View className="bg-secondary/20 rounded-full px-2.5 py-0.5 mr-2">
            <Text className="text-secondary text-xs font-bold">
              {story.storyType}
            </Text>
          </View>
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-body ml-auto">
            {formatTimeAgo(story.pubTime)}
          </Text>
        </View>

        {/* Headline */}
        <Text className="text-gray-900 dark:text-white text-lg font-bold font-heading leading-6 mb-2">
          {story.hline}
        </Text>

        {/* Intro */}
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-body leading-5" numberOfLines={2}>
          {story.intro}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function ArticleRow({ story }: { story: Story }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden mb-3 mx-4 flex-row"
      activeOpacity={0.85}
      onPress={() => navigation.navigate('NewsDetail', { storyId: story.id })}
    >
      {/* Content */}
      <View className="flex-1 p-4">
        <View className="flex-row items-center mb-1.5">
          {story.context && (
            <Text className="text-primary text-xs font-bold font-body mr-2">
              {story.context}
            </Text>
          )}
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-body">
            {formatTimeAgo(story.pubTime)}
          </Text>
        </View>
        <Text
          className="text-gray-900 dark:text-white text-sm font-bold font-heading leading-5 mb-1"
          numberOfLines={3}
        >
          {story.hline}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-xs font-body" numberOfLines={2}>
          {story.intro}
        </Text>
      </View>

      {/* Thumbnail */}
      <CImage
        imageId={story.imageId}
        className="w-28 h-full"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

export default function NewsScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const data: any = await getNewsList();
      const items: StoryListItem[] = data.storyList ?? [];
      const filtered = items
        .filter((item) => item.story && item.story.hline)
        .map((item) => item.story!);
      setStories(filtered);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-neutral dark:bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-neutral dark:bg-dark-bg items-center justify-center px-6">
        <Text className="text-gray-500 dark:text-gray-400 text-base font-body text-center">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-primary rounded-full px-6 py-2"
          onPress={() => fetchNews()}
        >
          <Text className="text-white font-bold text-sm">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <ScrollView
      className="flex-1 bg-neutral dark:bg-dark-bg"
      contentContainerClassName="pb-4 pt-3"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchNews(true)}
          colors={['#1B5E20']}
          tintColor="#1B5E20"
        />
      }
    >
      {/* Header */}
      <Text className="text-gray-900 dark:text-white text-xl font-bold font-heading px-4 mb-4">
        Latest News
      </Text>

      {/* Featured Article */}
      {featured && <FeaturedCard story={featured} />}

      {/* Headlines */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest font-heading">
          MORE STORIES
        </Text>
      </View>

      {rest.map((story) => (
        <ArticleRow key={story.id} story={story} />
      ))}
    </ScrollView>
  );
}
