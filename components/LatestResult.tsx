import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

function TeamLogo({ short, color }: { short: string; color: string }) {
  return (
    <View
      className="w-10 h-10 rounded-full items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white text-xs font-bold">{short}</Text>
    </View>
  );
}

export default function LatestResult() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="px-4 mt-4">
      <Text className="text-foreground text-sm font-bold tracking-widest mb-3 font-heading">
        LATEST RESULT
      </Text>

      <TouchableOpacity
        className="bg-card rounded-2xl p-4"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('MatchDetail', { team1: 'CSK', team2: 'DC' })
        }
      >
        {/* Match Score */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <TeamLogo short="CSK" color="#FFCB05" />
            <View className="ml-3">
              <Text className="text-foreground font-bold text-sm font-body">
                CSK
              </Text>
              <Text className="text-primary text-xl font-bold font-heading">
                190/4
              </Text>
            </View>
          </View>

          <Text className="text-muted font-bold mx-2">vs</Text>

          <View className="flex-row items-center flex-1 justify-end">
            <View className="items-end mr-3">
              <Text className="text-foreground font-bold text-sm font-body">
                DC
              </Text>
              <Text className="text-foreground text-xl font-bold font-heading">
                186/8
              </Text>
            </View>
            <TeamLogo short="DC" color="#004C93" />
          </View>
        </View>

        {/* Player of the Match */}
        <View className="border-t border-border pt-3 flex-row items-center">
          <View className="w-9 h-9 bg-tertiary/20 rounded-full items-center justify-center mr-3">
            <Icon name="person" size={16} color="#2E7D32" />
          </View>
          <View>
            <Text className="text-foreground text-sm font-bold font-heading">
              M. JARDEN
            </Text>
            <Text className="text-muted text-xs font-body">
              Player of the Match • 4/28 (4 ov)
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
