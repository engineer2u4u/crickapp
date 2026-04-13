import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Navbar() {
  const insets = useSafeAreaInsets();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#FFFFFF' : '#1A1A1A';

  return (
    <View
      className="bg-card border-b border-border px-4 pb-3 flex-row items-center justify-between"
      style={{ paddingTop: insets.top + 8 }}
    >
      {/* Logo */}
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-2">
          <Icon name="baseball" size={16} color="#FFFFFF" />
        </View>
        <Text className="text-foreground text-lg font-bold font-heading">
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
        <TouchableOpacity>
          <Icon name="notifications-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
