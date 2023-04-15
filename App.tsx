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
import Welcome from './src/modules/welcome/Welcome';
import Login from './src/modules/login/Login';
import HomeTab from './src/modules/home/HomeTab';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            cardStyle: {
              elevation: 1, // 避免bug,层级抬高一层
            },
          }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false, // 不展示页头
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false, // 不展示页头
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
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
