import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Navbar() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#FFFFFF' : '#1A1A1A';

  return (
    <View
      className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-surface px-4 pb-3 flex-row items-center justify-between"
      style={{ paddingTop: insets.top + 8 }}
    >
      {/* Logo */}
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-2">
          <Icon name="baseball" size={16} color="#FFFFFF" />
        </View>
        <Text className="text-gray-900 dark:text-white text-lg font-bold font-heading">
          CrickArena
        </Text>
      </View>

      {/* Actions */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={toggleColorScheme} className="mr-4">
          <Icon
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={22}
            color={iconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Reminders')}>
          <Icon name="notifications-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
