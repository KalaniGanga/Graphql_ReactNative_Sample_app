import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LeftScreen, RightScreen, HomeScreen } from '../screens/Tabs';
import { theme } from '../core/theme';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator initialRouteName="Home"   screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
    }}>
      <Tab.Screen name="Left" component={LeftScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Right" component={RightScreen} />
    </Tab.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <NavigationContainer >
      <App />
    </NavigationContainer>
  );
}