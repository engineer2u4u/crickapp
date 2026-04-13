import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function FeaturedTournament() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="mx-4 mb-4"
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('TournamentDetail', {
          name: 'IPL 2026',
          subtitle: 'Indian Premier League',
        })
      }
    >
      <View className="bg-primary rounded-2xl p-5 overflow-hidden">
        {/* Badges */}
        <View className="flex-row mb-4">
          <View className="bg-live rounded-full px-2.5 py-1 mr-2 flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
            <Text className="text-white text-xs font-bold">LIVE NOW</Text>
          </View>
          <View className="bg-white/20 rounded-full px-2.5 py-1">
            <Text className="text-white text-xs font-bold tracking-wider">
              PREMIER DIVISION
            </Text>
          </View>
        </View>

        {/* Tournament Name */}
        <Text className="text-white text-2xl font-bold font-heading leading-8 mb-2">
          Indian Premier{'\n'}League 2026
        </Text>

        {/* Progress Info */}
        <Text className="text-accent-light text-sm font-body mb-5">
          Week 4 of 8 • 12 Matches{'\n'}Remaining
        </Text>

        {/* CTA */}
        <View className="bg-secondary self-start rounded-full px-6 py-2.5">
          <Text className="text-white text-sm font-bold tracking-wider font-heading">
            VIEW STANDINGS
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
