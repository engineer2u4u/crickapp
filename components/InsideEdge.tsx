import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function InsideEdge() {
  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <Text className="text-foreground text-sm font-bold tracking-widest mb-3 font-heading">
        THE INSIDE EDGE
      </Text>

      {/* Featured Article */}
      <View className="bg-card rounded-2xl overflow-hidden mb-3">
        {/* Article Image Placeholder */}
        <View className="h-52 bg-tertiary justify-end p-4">
          {/* Tags */}
          <View className="flex-row mb-3">
            <View className="bg-secondary rounded-full px-2.5 py-1 mr-2">
              <Text className="text-white text-xs font-bold">OPINION</Text>
            </View>
            <View className="bg-primary rounded-full px-2.5 py-1">
              <Text className="text-white text-xs font-bold">APRIL 1ST</Text>
            </View>
          </View>

          <Text className="text-white text-lg font-bold leading-6 font-heading">
            THE EVOLUTION OF THE MODERN OPENER: POWER OVER PATIENCE?
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-muted text-sm leading-5 font-body">
            How T20 dynasties fundamentally altered the approach to test match
            opening stints in the modern era...
          </Text>
        </View>
      </View>

      {/* Sub Articles */}
      <TouchableOpacity className="bg-card rounded-2xl p-4 mb-3">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-secondary/20 rounded-xl mr-3 items-center justify-center">
            <Text className="text-2xl">&#128176;</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-muted tracking-widest mb-1 font-body">
              AUCTION PREVIEW
            </Text>
            <Text className="text-foreground font-bold text-sm font-heading">
              AUCTION RUMORS: MEGA STARS ON THE MOVE?
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="bg-card rounded-2xl p-4">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-primary/20 rounded-xl mr-3 items-center justify-center">
            <Text className="text-2xl">&#127944;</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-muted tracking-widest mb-1 font-body">
              INJURY UPDATE
            </Text>
            <Text className="text-foreground font-bold text-sm font-heading">
              STAR BOWLER DOUBTFUL FOR ASIA CUP CLASH
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
