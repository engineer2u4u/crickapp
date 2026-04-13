import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import RootNavigator from './navigation/RootNavigator';
import './global.css';

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B5E20',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#1A1A1A',
    border: '#E0E0E0',
    notification: '#FF6D00',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#1B5E20',
    background: '#121212',
    card: '#1C1C1C',
    text: '#FFFFFF',
    border: '#2A2A2A',
    notification: '#FF6D00',
  },
};

function App() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#1C1C1C' : '#FFFFFF'}
      />
      <NavigationContainer theme={isDark ? CustomDarkTheme : CustomLightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
