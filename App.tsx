/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import PageA from './src/modules/PageA';
import PageB from './src/modules/PageB';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PageA"
          screenOptions={{
            cardStyle: {
              elevation: 1, // 避免bug,层级抬高一层
            },
          }}>
          <Stack.Screen
            name="PageA"
            component={PageA}
            options={{
              headerShown: false, // 不展示页头
            }}
          />
          <Stack.Screen
            name="PageB"
            component={PageB}
            options={{
              headerShown: false, // 不展示页头
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
