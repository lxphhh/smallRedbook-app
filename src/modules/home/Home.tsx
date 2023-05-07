import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import HomeStore from '../../stores/HomeStore';
//@ts-ignore
import FlowList from '../../components/flowlist/FlowList';
import Heart from '../../components/heart/Heart';
import ResizeImage from '../../components/resizeImage/ResizeImage';
import TitleBar from './components/TitleBar';
import CategoryList from './components/CategoryList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import _updateConfig from '../../../update.json';
import {
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  isFirstTime,
  isRolledBack,
  markSuccess,
} from 'react-native-update';
import {save} from '../../utils/Storage';
const {appKey} = _updateConfig[Platform.OS];

console.log('appKey', appKey);

// 获取屏幕的宽度信息
const {width: SCREEN_WIDTH} = Dimensions.get('window');

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

  // 路由跳转部分
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
    // 热更新
    checkPatch();
    if (isFirstTime) {
      markSuccess();
      // 补丁成功，上报服务器信息
      // 补丁安装成功率：99.5% ~ 99.7%
    } else if (isRolledBack) {
      // 补丁回滚，上报服务器信息
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 热更新数据
  const checkPatch = async () => {
    // 开发模式不检查更新
    if (__DEV__) {
      return;
    }
    const info: any = await checkUpdate(appKey);
    const {update, name, description, metaInfo} = info;
    // 补丁说明部分
    const metaJson = JSON.parse(metaInfo);
    save('patchVersion', name);
    save('patchDescription', description);
    const {forceUpdate} = metaJson;
    if (forceUpdate) {
      // 弹窗提示用户
    } else {
      // 不弹窗默默操作
    }
    // 下载补丁
    if (update) {
      // 下载更新 hash
      const hash = await downloadUpdate(info, {
        onDownloadProgress: ({received, total}) => {},
      });
      if (hash) {
        if (forceUpdate) {
          // 立即重启
          switchVersion(hash);
        } else {
          // 重启后更新
          switchVersionLater(hash);
        }
      }
    }
  };

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

  const onArticlePress = useCallback(
    (article: ArticleSimple) => () => {
      navigation.push('ArticleDetail', {
        id: article?.id,
      });
    },
    [navigation],
  );

  const categoryList = store.categoryList.filter(item => item.isAdd);

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        activeOpacity={0.9}
        onPress={onArticlePress(item)}>
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
      </TouchableOpacity>
    );
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
        keyExtractor={(item: ArticleSimple) => `${item.id}`}
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
        ListHeaderComponent={
          <CategoryList
            categoryList={categoryList}
            allCategoryList={store.categoryList}
            onCategoryChange={category => {
              console.log(category);
            }}
          />
        }
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
    // paddingTop: 6,
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
