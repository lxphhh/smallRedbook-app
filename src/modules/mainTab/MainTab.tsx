/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../home/Home';

const BottomTab = createBottomTabNavigator();
import {Image} from 'react-native';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

import icon_tab_publish from '../../assets/icon_tab_publish.png';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

interface RedBookTabBarProps extends BottomTabBarProps {
  onPushChange: (name: string) => void;
}

const RedBookTabBar = ({
  state,
  descriptors,
  navigation,
  onPushChange,
}: RedBookTabBarProps) => {
  const {routes, index} = state;

  const onPublishPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      (res: ImagePickerResponse) => {
        const {assets} = res;
        if (!assets?.length) {
          console.log('选择图片失败');
          return;
        }
        const {uri, width, height, fileName, fileSize, type} = assets[0];
        console.log(`uri=${uri}, width=${width}, height=${height}`);
        console.log(`fileName=${fileName}, fileSize=${fileSize}, type=${type}`);
      },
    );
  };
  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route, i) => {
        const {options} = descriptors[route?.key];
        const label = options.title;
        const isFocused = index === i;

        if (i === 2) {
          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={onPublishPress}>
              <Image
                style={styles.icon_tab_publish}
                source={icon_tab_publish}
              />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={label}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => {
              onPushChange(route.name);
              navigation.navigate(route.name);
            }}>
            <Text
              style={{
                fontSize: isFocused ? 18 : 16,
                color: isFocused ? '#333' : '#999',
                fontWeight: isFocused ? 'bold' : 'normal',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainTab = () => {
  const [isMine, setIsMine] = useState<boolean>(false);
  const handleOnChange = (name: string) => {
    setIsMine(name === 'Mine');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      edges={isMine ? ['bottom'] : []}>
      <View style={styles.root}>
        <BottomTab.Navigator
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBar={(props: BottomTabBarProps) => (
            <RedBookTabBar {...props} onPushChange={handleOnChange} />
          )}>
          <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
              title: '首页',
              headerShown: false,
            }}
          />
          <BottomTab.Screen
            name="Shop"
            component={Shop}
            options={{
              title: '购物',
              headerShown: false,
            }}
          />
          <BottomTab.Screen
            name="Publish"
            component={Shop}
            options={{
              title: '发布',
              headerShown: false,
            }}
          />
          <BottomTab.Screen
            name="Message"
            component={Message}
            options={{
              title: '消息',
              headerShown: false,
            }}
          />
          <BottomTab.Screen
            name="Mine"
            component={Mine}
            options={{
              title: '我',
              headerShown: false,
            }}
          />
        </BottomTab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});

export default MainTab;
