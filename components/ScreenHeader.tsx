import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  rightIcon?: string;
  onRightPress?: () => void;
};

export default function ScreenHeader({ title, rightIcon, onRightPress }: Props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#1A1A1A';

  return (
    <View
      className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-surface px-4 pb-3 flex-row items-center justify-between"
      style={{ paddingTop: insets.top + 8 }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-8 items-start"
      >
        <Icon name="chevron-back" size={24} color={iconColor} />
      </TouchableOpacity>
      <Text className="text-gray-900 dark:text-white text-base font-bold font-heading tracking-wider">
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} className="w-8 items-end">
          <Icon name={rightIcon} size={22} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}
    </View>
  );
}
