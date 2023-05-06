import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import ShopStore from '../../stores/ShopStore';

import icon_search from '../../assets/icon_search.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';
import {FlatList} from 'react-native-gesture-handler';
import ListHeaderComponent from './ListHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

// 获取屏幕的宽度信息
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_WIDTH = (SCREEN_WIDTH - 18) / 2;

const Shop = () => {
  const store = useLocalStore(() => new ShopStore());
  // 路由跳转部分
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestGoodsList();
    store.requestTopTenCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 搜索
  const onSearchPress = () => {
    navigation.push('SearchGoods');
  };

  // 顶部
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.searchLayout}
          activeOpacity={0.8}
          onPress={onSearchPress}>
          <Image style={styles.searchIcon} source={icon_search} />
          <Text style={styles.searchTxt}>bm调度</Text>
        </TouchableOpacity>
        <Image style={styles.menuIcon} source={icon_shop_car} />
        <Image style={styles.menuIcon} source={icon_orders} />
        <Image style={styles.menuIcon} source={icon_menu_more} />
      </View>
    );
  };

  // 商品列表
  const renderItem = ({item}: {item: GoodsSimple}) => {
    const styleItem = StyleSheet.create({
      item: {
        width: ITEM_WIDTH,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 6,
        marginTop: 6,
      },
      img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
      },
      titleTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },

      promotionTxt: {
        width: 78,
        fontSize: 12,
        color: '#999',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#bbb',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 4,
      },

      prefix: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 4,
      },
      priceTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'justify',
      },
      originTxt: {
        fontSize: 13,
        color: '#999',
        fontWeight: 'normal',
      },
    });
    return (
      <View style={styleItem.item}>
        <Image style={styleItem.img} source={{uri: item.image}} />
        <Text style={styleItem.titleTxt}>{item.title}</Text>
        {!!item.promotion && (
          <Text style={styleItem.promotionTxt}>{item.promotion}</Text>
        )}
        <Text style={styleItem.prefix}>
          ¥
          <Text style={styleItem.priceTxt}>
            {item.price}&nbsp;
            {!!item.originPrice && (
              <Text style={styleItem.originTxt}>原价: {item.originPrice}</Text>
            )}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{
          flex: 1,
        }}
        data={store?.goodsList || []}
        extraData={store?.categoryList || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => `${i.id}-${index}`}
        numColumns={2}
        refreshing={store.refreshing}
        ListHeaderComponent={<ListHeaderComponent data={store.categoryList} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  searchLayout: {
    height: 32,
    flex: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
  },
  searchTxt: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
});

export default observer(Shop);
