import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function UpcomingFixtures() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mt-6 px-4">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-foreground text-sm font-bold tracking-widest font-heading">
          UPCOMING FIXTURES
        </Text>
        <TouchableOpacity>
          <Text className="text-tertiary text-xs font-bold tracking-wider">
            VIEW ALL
          </Text>
        </TouchableOpacity>
      </View>

      {/* Match Card */}
      <TouchableOpacity
        className="bg-card rounded-2xl p-4"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('MatchDetail', { team1: 'SA', team2: 'ENG' })
        }
      >
        {/* Tournament Badge */}
        <View className="bg-surface self-start rounded-full px-3 py-1 mb-3">
          <Text className="text-xs text-muted tracking-widest font-body">
            T20 WORLD CUP &bull; QUALIFIER
          </Text>
        </View>

        {/* Teams */}
        <View className="flex-row items-center mb-3">
          <Text className="text-xl mr-2">&#127487;&#127462;</Text>
          <Text className="text-foreground font-bold text-base font-heading">
            SA
          </Text>
          <Text className="text-muted mx-2 font-bold">-</Text>
          <Text className="text-foreground font-bold text-base font-heading">
            ENG
          </Text>
          <Text className="text-xl ml-2">&#127988;&#917607;&#917602;&#917605;&#917614;&#917607;&#917631;</Text>
        </View>

        {/* Time & Remind */}
        <View className="flex-row items-center justify-between">
          <Text className="text-muted text-sm font-body">14:30 GMT</Text>

          <View className="bg-primary rounded-full px-4 py-1.5">
            <Text className="text-white text-xs font-bold tracking-wider">
              REMIND
            </Text>
          </View>

          <Text className="text-muted text-sm font-body">09:00</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
