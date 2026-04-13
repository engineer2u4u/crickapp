import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  name: string;
  subtitle?: string;
};

export default function TournamentHero({ name, subtitle }: Props) {
  return (
    <View className="bg-primary mx-4 mt-2 rounded-2xl p-5 overflow-hidden">
      <View className="flex-row items-center">
        {/* Tournament Badge */}
        <View className="w-14 h-14 bg-white/20 rounded-xl items-center justify-center mr-4">
          <Text className="text-white text-xs font-bold font-heading">
            {name.split(' ').map(w => w[0]).join('').slice(0, 3)}
          </Text>
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="text-white text-xl font-bold font-heading">
            {name}
          </Text>
          {subtitle && (
            <Text className="text-accent-light text-xs font-body mt-1">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      <Text className="text-accent-light text-xs font-body mt-3">
        The 4th of 8 weeks of 2026 • 12 Matches, 28 Results, 2 Ties
      </Text>
    </View>
  );
}
