import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import ChapterScreen from './src/screens/ChapterScreen';

export type RootStackParamList = {
  Home: undefined;
  Chapter: { book: string; chapter: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chapter" component={ChapterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}