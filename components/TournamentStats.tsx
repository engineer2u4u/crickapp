import React from 'react';
import { View, Text } from 'react-native';

const STATS = [
  { label: 'MATCHES PLAYED', value: '41/74', highlight: false },
  { label: 'LEADING TEAM', value: 'CSK', highlight: true },
  { label: 'AVG SCORE', value: '178.4', highlight: false },
  { label: 'TOTAL 6s', value: '542', highlight: false },
];

export default function TournamentStats() {
  return (
    <View className="px-4 mt-4">
      <Text className="text-foreground text-sm font-bold tracking-widest mb-3 font-heading">
        TOURNAMENT OVERVIEW
      </Text>

      <View className="flex-row flex-wrap -m-1">
        {STATS.map((stat) => (
          <View key={stat.label} className="w-1/2 p-1">
            <View className="bg-card rounded-xl p-3.5">
              <Text className="text-muted text-xs tracking-wider font-body mb-1">
                {stat.label}
              </Text>
              <View className="flex-row items-center">
                {stat.highlight && (
                  <View className="w-6 h-6 bg-yellow-500 rounded-full items-center justify-center mr-2">
                    <Text className="text-white text-xs font-bold">C</Text>
                  </View>
                )}
                <Text className="text-foreground text-2xl font-bold font-heading">
                  {stat.value}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
