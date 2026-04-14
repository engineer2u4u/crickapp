import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import TournamentsScreen from '../screens/TournamentsScreen';
import NewsScreen from '../screens/NewsScreen';

const Tab = createBottomTabNavigator();

type TabBarProps = {
  state: any;
  navigation: any;
};

const TAB_CONFIG: Record<string, { icon: string; label: string }> = {
  Home: { icon: 'home', label: 'HOME' },
  Leagues: { icon: 'trophy', label: 'LEAGUES' },
  News: { icon: 'newspaper', label: 'NEWS' },
};

function CustomTabBar({ state, navigation }: TabBarProps) {
  return (
    <View className="flex-row justify-around items-center pt-2 pb-6 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-surface">
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] ?? {
          icon: 'ellipse',
          label: route.name,
        };
        const iconName = isFocused
          ? config.icon
          : `${config.icon}-outline`;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => {
              if (!isFocused) {
                navigation.navigate(route.name);
              }
            }}
            className="items-center justify-center"
          >
            <View
              className={`items-center justify-center rounded-2xl px-5 py-1.5 mb-1 ${
                isFocused ? 'bg-primary' : ''
              }`}
            >
              <Icon
                name={iconName}
                size={20}
                color={isFocused ? '#FFFFFF' : '#9E9E9E'}
              />
            </View>
            <Text
              className={`text-xs font-bold ${
                isFocused ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Leagues" component={TournamentsScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
    </Tab.Navigator>
  );
}
