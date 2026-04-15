import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { Story } from '../services/types';
import CImage from './CImage';

type Props = {
  stories?: Story[];
};

function formatTimeAgo(timestamp: string): string {
  const diff = Date.now() - Number(timestamp);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function InsideEdge({ stories }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!stories || stories.length === 0) return null;

  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <Text className="text-primary text-lg font-black italic mb-3 font-heading">
        THE INSIDE EDGE
      </Text>

      {/* Featured Article */}
      <TouchableOpacity
        className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden mb-3"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('NewsDetail', { storyId: featured.id })
        }
      >
        {/* Article Image */}
        <CImage
          imageId={featured.imageId}
          className="w-full h-52"
        />
        <View className="absolute top-0 left-0 right-0 h-52 justify-end p-4 bg-black/30">
          {/* Tags */}
          <View className="flex-row mb-3">
            {featured.context && (
              <View className="bg-secondary rounded-full px-2.5 py-1 mr-2">
                <Text className="text-white text-xs font-bold">
                  {featured.context}
                </Text>
              </View>
            )}
            <View className="bg-primary rounded-full px-2.5 py-1">
              <Text className="text-white text-xs font-bold">
                {featured.storyType}
              </Text>
            </View>
          </View>

          <Text className="text-white text-lg font-bold leading-6 font-heading">
            {featured.hline}
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-gray-500 dark:text-gray-400 text-sm leading-5 font-body" numberOfLines={2}>
            {featured.intro}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Sub Articles */}
      {rest.map((story) => (
        <TouchableOpacity
          key={story.id}
          className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-3"
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('NewsDetail', { storyId: story.id })
          }
        >
          <View className="flex-row items-center">
            <CImage
              imageId={story.imageId}
              className="w-16 h-16 rounded-xl mr-3"
            />
            <View className="flex-1">
              <Text className="text-xs text-gray-500 dark:text-gray-400 tracking-widest mb-1 font-body">
                {story.context ?? story.storyType}
              </Text>
              <Text
                className="text-gray-900 dark:text-white font-bold text-sm font-heading"
                numberOfLines={2}
              >
                {story.hline}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
