import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function LiveNowCard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mx-4 mt-4">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-foreground text-sm font-bold tracking-widest font-heading">
          LIVE NOW
        </Text>
        <View className="bg-live rounded-full px-2.5 py-1 flex-row items-center">
          <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
          <Text className="text-white text-xs font-bold">LIVE</Text>
        </View>
      </View>

      {/* Match Card */}
      <TouchableOpacity
        className="bg-primary rounded-2xl p-4 overflow-hidden"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('MatchDetail', { team1: 'IND', team2: 'AUS' })
        }
      >
        {/* Match Info */}
        <Text className="text-accent-light text-xs tracking-widest mb-4 font-body">
          IND VS AUS &bull; T20 WORLD CUP
        </Text>

        {/* Scores */}
        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-row items-center flex-1">
            <Text className="text-3xl mr-3">&#127470;&#127475;</Text>
            <View>
              <Text className="text-white text-3xl font-bold font-heading">
                184/3
              </Text>
              <Text className="text-accent-light text-xs tracking-widest mt-0.5">
                IND
              </Text>
            </View>
          </View>

          <Text className="text-secondary text-xl font-bold mx-2">vs</Text>

          <View className="flex-row items-center flex-1 justify-end">
            <View className="items-end">
              <Text className="text-white text-3xl font-bold font-heading">
                122/10
              </Text>
              <Text className="text-accent-light text-xs tracking-widest mt-0.5">
                AUS
              </Text>
            </View>
            <Text className="text-3xl ml-3">&#127462;&#127482;</Text>
          </View>
        </View>

        {/* Stats Bar */}
        <View className="bg-black/20 rounded-xl p-3">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-accent-light text-xs tracking-widest font-body">
                CURRENT RR
              </Text>
              <Text className="text-white text-xl font-bold mt-1 font-heading">
                5.36
              </Text>
            </View>

            <View className="flex-1 ml-6">
              <Text className="text-accent-light text-xs tracking-widest font-body">
                WIN PROBABILITY
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-secondary rounded-full"
                    style={{ width: '84%' }}
                  />
                </View>
                <Text className="text-white text-sm font-bold ml-3 font-heading">
                  IND 84%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
