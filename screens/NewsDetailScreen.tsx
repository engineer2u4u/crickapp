import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { getNewsDetail } from '../services/api';
import CImage from '../components/CImage';

type Props = NativeStackScreenProps<RootStackParamList, 'NewsDetail'>;

type ContentBlock = {
  content?: { contentType: string; contentValue: string };
  ad?: any;
};

type NewsData = {
  id: number;
  headline: string;
  context: string;
  publishTime: string;
  intro: string;
  source: string;
  storyType: string;
  coverImage?: { id: string; caption: string; source: string };
  content: ContentBlock[];
  authors?: { id: number; name: string; imageId: number }[];
};

function formatDate(timestamp: string): string {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function NewsDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const { storyId } = route.params;

  const [article, setArticle] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getNewsDetail(storyId)
      .then((data: any) => {
        if (mounted) setArticle(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [storyId]);

  if (loading) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  if (error || !article) {
    return (
      <View className="flex-1 bg-bg items-center justify-center px-6">
        <Icon name="alert-circle-outline" size={48} color="#9E9E9E" />
        <Text className="text-muted text-base mt-4 font-body text-center">
          {error ?? 'Article not found'}
        </Text>
        <TouchableOpacity
          className="mt-4 bg-primary rounded-full px-6 py-2"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold text-sm">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const coverImageId = article.coverImage?.id ?? null;

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
          NEWS
        </Text>
        <TouchableOpacity className="w-8 items-end">
          <Icon name="share-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
        {coverImageId && (
          <View>
            <CImage
              imageId={coverImageId}
              className="w-full h-56"
            />
            {article.coverImage?.caption && (
              <Text className="text-muted text-xs px-4 mt-2 font-body">
                {article.coverImage.caption}
                {article.coverImage.source
                  ? ` (${article.coverImage.source})`
                  : ''}
              </Text>
            )}
          </View>
        )}

        <View className="px-4 mt-4">
          {/* Context + Type */}
          <View className="flex-row items-center mb-3">
            {article.context && (
              <View className="bg-primary rounded-full px-3 py-1 mr-2">
                <Text className="text-white text-xs font-bold">
                  {article.context}
                </Text>
              </View>
            )}
            <View className="bg-secondary/20 rounded-full px-3 py-1">
              <Text className="text-secondary text-xs font-bold">
                {article.storyType}
              </Text>
            </View>
          </View>

          {/* Headline */}
          <Text className="text-foreground text-2xl font-bold font-heading leading-8 mb-3">
            {article.headline}
          </Text>

          {/* Meta */}
          <View className="flex-row items-center mb-4 pb-4 border-b border-border">
            {article.authors?.[0] && (
              <Text className="text-muted text-sm font-body mr-3">
                By {article.authors[0].name}
              </Text>
            )}
            <Text className="text-muted text-sm font-body">
              {formatDate(article.publishTime)}
            </Text>
            {article.source && (
              <Text className="text-muted text-sm font-body ml-auto">
                {article.source}
              </Text>
            )}
          </View>

          {/* Intro */}
          {article.intro && (
            <Text className="text-foreground text-base font-bold font-body leading-6 mb-4">
              {article.intro}
            </Text>
          )}

          {/* Content Blocks */}
          {article.content
            .filter((block) => block.content?.contentType === 'text')
            .map((block, i) => (
              <Text
                key={i}
                className="text-foreground text-sm font-body leading-6 mb-4"
              >
                {block.content!.contentValue}
              </Text>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
