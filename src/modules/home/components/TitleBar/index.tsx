import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import icon_daily from '../../../../assets/icon_daily.png';
import icon_search from '../../../../assets/icon_search.png';

type Props = {
  tab: number;
  onTabChange?: (tabIndex: number) => void;
};

const TapOption = [
  {
    title: '关注',
    tabValue: 0,
  },
  {
    title: '发现',
    tabValue: 1,
  },
  {
    title: '发现',
    tabValue: 2,
  },
];

const TitleBar = ({tab, onTabChange}: Props) => {
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    setTabIndex(tab);
  }, [tab]);

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyBtn} activeOpacity={0.7}>
        <Image style={styles.icon} source={icon_daily} />
      </TouchableOpacity>

      {TapOption.map(item => {
        return (
          <TouchableOpacity
            key={item.tabValue}
            style={styles.tabButton}
            activeOpacity={0.7}
            onPress={() => {
              setTabIndex(item.tabValue);
              onTabChange?.(item.tabValue);
            }}>
            <Text
              style={
                tabIndex === item.tabValue ? styles.tabTxtActive : styles.tabTxt
              }>
              {item.title}
            </Text>
            {tabIndex === item.tabValue && <View style={styles.line} />}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
        <Image style={styles.icon} source={icon_search} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  dailyBtn: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    marginRight: 42,
  },
  searchBtn: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    marginLeft: 42,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTxt: {
    fontSize: 16,
    color: '#999999',
  },
  tabTxtActive: {
    fontSize: 17,
    color: '#333333',
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
});

export default TitleBar;
