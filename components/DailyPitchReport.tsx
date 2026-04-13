import React from 'react';
import { View, Text } from 'react-native';

export default function DailyPitchReport() {
  return (
    <View className="mx-4 mb-4">
      <View className="bg-primary rounded-2xl p-5 overflow-hidden">
        {/* Masthead */}
        <View className="items-center mb-4">
          <Text className="text-accent-light text-xs tracking-widest font-body mb-1">
            CRICKET ARENA
          </Text>
          <Text className="text-white text-2xl font-bold font-heading text-center">
            THE DAILY{'\n'}PITCH REPORT
          </Text>
          <Text className="text-accent-light text-xs mt-2 font-body tracking-wider">
            LIVE UPDATES • OCT 24, 2025
          </Text>
        </View>

        {/* Divider */}
        <View className="h-px bg-white/20 mb-4" />

        {/* Featured Article Image Placeholder */}
        <View className="h-44 bg-tertiary rounded-xl overflow-hidden justify-end p-4 mb-3">
          {/* Tags */}
          <View className="flex-row mb-2">
            <View className="bg-live rounded-full px-2 py-0.5 mr-2">
              <Text className="text-white text-xs font-bold">ANALYSIS</Text>
            </View>
            <View className="bg-secondary rounded-full px-2 py-0.5">
              <Text className="text-white text-xs font-bold">MIXED FORMAT</Text>
            </View>
          </View>

          <Text className="text-white text-base font-bold font-heading leading-5">
            CHAMPIONS AT THE CROSSROADS: THE FINAL STAND
          </Text>

          <Text className="text-white/70 text-xs mt-1 font-body">
            © Clairs Royal • A Harlotte Frangle
          </Text>
        </View>
      </View>
    </View>
  );
}
