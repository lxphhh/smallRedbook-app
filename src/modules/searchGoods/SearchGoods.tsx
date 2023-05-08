import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_search from '../../assets/icon_search.png';
import icon_arrow from '../../assets/icon_arrow.png';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchGoods = () => {
  const inputRef = useRef<TextInput>(null);

  const [showBack, setShowBack] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const onBackPress = () => {
    LayoutAnimation.easeInEaseOut();
    setShowBack(false);
    inputRef.current?.blur();
    setTimeout(() => {
      navigation.pop();
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setShowBack(true);
      inputRef.current?.focus();
    }, 100);
  }, []);

  // 顶部
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Image style={styles.backImg} source={icon_arrow} />
          </TouchableOpacity>
        )}
        <View style={styles.searchLayout}>
          <Image style={styles.searchIcon} source={icon_search} />
          <TextInput
            ref={inputRef}
            style={styles.searchTxt}
            placeholder="纯粮小麦粉"
            placeholderTextColor={'#bbb'}
          />
        </View>
        <Text style={styles.searchButton}>搜索</Text>
      </View>
    );
  };

  return <SafeAreaView>{renderTitle()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backButton: {
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },

  searchIcon: {
    width: 18,
    height: 18,
  },
  searchLayout: {
    height: 32,
    flex: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  searchTxt: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
  searchButton: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 12,
  },
});

export default SearchGoods;
