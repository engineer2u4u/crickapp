import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTeamRankings } from '../hooks/useCricketData';
import CImage from './CImage';

const FORMATS = ['TEST', 'ODI', 'T20'];

export default function WorldHierarchy() {
  const [activeFormat, setActiveFormat] = useState('TEST');
  const { data, loading } = useTeamRankings();

  const rankings = (data as Record<string, any[]>)[activeFormat]?.slice(0, 5) ?? [];

  return (
    <View className="mt-6 px-4 mb-6">
      {/* Section Header */}
      <Text className="text-primary text-lg font-black italic mb-3 font-heading">
        WORLD HIERARCHY
      </Text>

      {/* Format Tabs */}
      <View className="flex-row mb-4">
        {FORMATS.map((format) => (
          <TouchableOpacity
            key={format}
            onPress={() => setActiveFormat(format)}
            className={`rounded-full px-5 py-2 mr-2 ${
              activeFormat === format ? 'bg-primary' : 'bg-gray-200 dark:bg-dark-surface'
            }`}
          >
            <Text
              className={`text-xs font-bold tracking-wider ${
                activeFormat === format ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {format}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rankings List */}
      <View className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden">
        {loading && (
          <View className="p-8 items-center">
            <ActivityIndicator size="small" color="#1B5E20" />
          </View>
        )}

        {!loading && rankings.length === 0 && (
          <View className="p-4">
            <Text className="text-gray-500 dark:text-gray-400 text-sm font-body text-center">
              No rankings available
            </Text>
          </View>
        )}

        {!loading &&
          rankings.map((item: any, index: number) => (
            <View
              key={item.id}
              className={`flex-row items-center p-4 ${
                index < rankings.length - 1 ? 'border-b border-gray-200 dark:border-dark-surface' : ''
              }`}
            >
              <Text className="text-gray-500 dark:text-gray-400 text-sm w-8 font-body">
                {String(item.rank).padStart(2, '0')}
              </Text>
              {item.imageId ? (
                <CImage
                  imageId={item.imageId}
                  className="w-7 h-7 rounded-full mr-3"
                />
              ) : (
                <View className="w-7 h-7 mr-3" />
              )}
              <Text className="text-gray-900 dark:text-white font-bold flex-1 font-body">
                {item.name?.toUpperCase()}
              </Text>
              <Text className="text-gray-900 dark:text-white font-bold text-lg font-heading">
                {item.rating}
              </Text>
            </View>
          ))}
      </View>

    </View>
  );
}
