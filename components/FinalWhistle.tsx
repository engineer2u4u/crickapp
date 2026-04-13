import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function FinalWhistle() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-foreground text-sm font-bold tracking-widest font-heading">
          FINAL WHISTLE
        </Text>
        <TouchableOpacity>
          <Text className="text-tertiary text-xs font-bold tracking-wider">
            RESULT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Match Card */}
      <TouchableOpacity
        className="bg-card rounded-2xl p-4"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('MatchDetail', { team1: 'NZ', team2: 'PAK' })
        }
      >
        {/* Format Badge */}
        <View className="bg-surface self-start rounded-full px-3 py-1 mb-3">
          <Text className="text-xs text-muted tracking-widest font-body">
            IND TEST &bull; COMPLETED
          </Text>
        </View>

        {/* Scores */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <Text className="text-xl mr-2">&#127475;&#127487;</Text>
            <Text className="text-foreground font-bold text-sm mr-2 font-body">
              NZ
            </Text>
            <Text className="text-foreground text-xl font-bold font-heading">
              179/6
            </Text>
          </View>

          <Text className="text-muted font-bold">v</Text>

          <View className="flex-row items-center">
            <Text className="text-foreground text-xl font-bold font-heading">
              142/9
            </Text>
            <Text className="text-foreground font-bold text-sm ml-2 mr-2 font-body">
              PAK
            </Text>
            <Text className="text-xl">&#127477;&#127472;</Text>
          </View>
        </View>

        {/* Result */}
        <Text className="text-muted text-xs mt-1 font-body">
          NZ won by 37 runs
        </Text>

        {/* Actions */}
        <View className="flex-row mt-3 pt-3 border-t border-border">
          <Text className="text-tertiary text-xs font-bold tracking-wider mr-4">
            SCORECARD
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
