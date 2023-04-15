import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home/Home';

const BottomTab = createBottomTabNavigator();

import icon_tab_publish from '../../assets/icon_tab_publish.png';
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png';
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';
import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
import {Image} from 'react-native';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

const MainTab = () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused, color, size}) => {
              let img;
              if (route.name === 'Home') {
                img = focused ? icon_tab_home_selected : icon_tab_home_normal;
              } else if (route.name === 'Shop') {
                img = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
              } else if (route.name === 'Message') {
                img = focused
                  ? icon_tab_message_selected
                  : icon_tab_message_normal;
              } else if (route.name === 'Mine') {
                img = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
              }
              return (
                <Image
                  style={{
                    width: size,
                    height: size,
                    tintColor: color,
                  }}
                  source={img}
                />
              );
            },
          };
        }}
        //@ts-ignore
        tabBarOptions={{
          activeTintColor: '#ff2442',
          inactiveTintColor: '#999',
        }}>
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
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default MainTab;
