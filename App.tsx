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
import MainTab from './src/modules/mainTab/MainTab';
import ArticleDetail from './src/modules/articleDetail/ArticleDetail';
import VConsole from '@grewer/react-native-vconsole';
import ConfigReader from 'react-native-config-reader';
import SearchGoods from './src/modules/searchGoods/SearchGoods';

const Stack = createStackNavigator();

const Console = () => {
  if (__DEV__) {
    // new VConsole();
    return (
      <VConsole
        // 使用 'react-native-config-reader' 库获获取额外信息
        appInfo={{
          当前环境: ConfigReader.ENV,
          原生构建类型: ConfigReader.BUILD_TYPE,
          原生版本号:
            ConfigReader.VERSION_NAME ||
            ConfigReader.CFBundleShortVersionString,
          原生构建时间: ConfigReader.BUILD_TIME,
        }}
        // 另外的的面板
        // console.time 可辨别是否开启 debug 网页
        //@ts-ignore
        console={__DEV__ ? !console.time : true}
      />
    );
  } else {
    return null;
  }
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{width: '100%', height: '100%'}}>
      <StatusBar barStyle={'dark-content'} />
      <Console />
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
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false, // 不展示页头
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/* 文章详情页面 */}
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetail}
            options={{
              headerShown: false, // 不展示页头
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="SearchGoods"
            component={SearchGoods}
            options={{
              headerShown: false, // 不展示页头
              presentation: 'transparentModal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
