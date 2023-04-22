import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import HomeStore from '../../stores/HomeStore';
//@ts-ignore
import FlowList from '../../components/flowlist/FlowList';
import Heart from '../../components/heart/Heart';
import ResizeImage from '../../components/resizeImage/ResizeImage';
import TitleBar from './components/TitleBar';

// 获取屏幕的宽度信息
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
  return (
    <View style={styles.item} key={index}>
      {/* 图片展示 */}
      <ResizeImage uri={item.image} />
      <Text style={styles.titleTxt}>{item.title}</Text>
      {/* 头像名称点赞数目 */}
      <View style={styles.nameLayout}>
        <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
        <Text style={styles.nameTxt}>{item.userName}</Text>
        <Heart
          isFavorite={item.isFavorite}
          onChange={(values: boolean) => {
            console.log(values);
          }}
        />
        <Text style={styles.countTxt}>{item.favoriteCount}</Text>
      </View>
    </View>
  );
};

const Footer = ({refresh}: {refresh: boolean}) => {
  const styleFooter = StyleSheet.create({
    footer: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      color: '#999999',
    },
  });
  return (
    <View style={styleFooter.footer}>
      {!refresh ? <Text>没有更多数据了~</Text> : <Text>获取数据中~</Text>}
    </View>
  );
};

const Home = () => {
  const store = useLocalStore(() => new HomeStore());

  useEffect(() => {
    store.requestHomeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshNewData = () => {
    // 1. 重置页码
    store.resetPage();
    // 2. 请求数据
    store.requestHomeList();
  };

  const loadMoreData = () => {
    // 2. 请求数据
    store.requestHomeList();
  };

  return (
    <View style={styles.root}>
      <TitleBar
        tab={1}
        onTabChange={(tab: number) => {
          console.log(tab);
        }}
      />
      <FlowList
        contentContainerStyle={styles.contentContainer}
        style={styles.flatList}
        data={store.homeList}
        extraData={[store.homeList, store.refreshing]}
        numColumns={2}
        renderItem={renderItem}
        refreshing={store.refreshing}
        onRefresh={refreshNewData}
        // 上拉加载更多
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
        // 底部没有更多数据
        ListFooterComponent={<Footer refresh={store.refreshing} />}
        // 头
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333333',
    marginHorizontal: 12,
    marginVertical: 4,
    marginBottom: 10,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    flex: 1,
    fontSize: 12,
    color: '#999999',
    marginLeft: 6,
  },
  countTxt: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 4,
  },
});

export default observer(Home);
