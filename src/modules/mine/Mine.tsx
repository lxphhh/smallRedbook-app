import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import UserStore from '../../stores/UserStore';
import MineStore from '../../stores/MineStore';
import Empty from '../../components/empty/Empty';

// 图片
import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
// import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Heart from '../../components/heart/Heart';
import SideMenu, {SideModalRef} from './components/SideMenu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isPlatformIos} from '../../utils/StringUtil';

const EMPTY_CONFIG = [
  {icon: icon_no_note, tips: '快去发布今日的好心情吧～'},
  {icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧～'},
  {icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦～'},
];

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Mine = () => {
  const inset = useSafeAreaInsets();

  const store = useLocalStore(() => new MineStore());

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [bgImgHeight, setBgImgHeight] = useState<number>(400);

  const {userInfo} = UserStore;

  // 侧边ref
  const slideMenuRef = useRef<SideModalRef>(null);

  useEffect(() => {
    store.requestAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 跳转文章详情
  const onArticlePress = useCallback(
    (article: ArticleSimple) => () => {
      navigation.push('ArticleDetail', {id: article.id});
    },
    [navigation],
  );

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuButton: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      menuIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        tintColor: 'white',
      },
      rightMenuIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    return (
      <View
        style={[
          styles.titleLayout,
          {
            paddingTop: isPlatformIos() ? inset.top + 15 : 0,
          },
        ]}>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={() => {
            slideMenuRef.current?.open();
          }}>
          <Image source={icon_menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Image source={icon_shop_car} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Image source={icon_share} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderInfo = () => {
    const styles = StyleSheet.create({
      avatarLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: 'cover',
        borderRadius: 48,
      },
      addImg: {
        width: 28,
        height: 28,
        marginLeft: -28,
        marginBottom: 2,
      },
      nameTxt: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
      },
      nameLayout: {
        marginLeft: 20,
      },
      idLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
      },
      idTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      qrcodeImg: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: '#bbb',
      },
      descTxt: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal: 16,
      },
      sexLayout: {
        height: 24,
        width: 32,
        borderRadius: 12,
        marginTop: 12,
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff50',
      },
      sexImg: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
      },
      infoLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 28,
        paddingRight: 16,
      },
      infoItem: {
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      infoLabel: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 6,
      },
      infoValue: {
        fontSize: 18,
        color: 'white',
      },
      infoButton: {
        height: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: '#ffffff',
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: '#ffffff',
      },
    });
    const {
      avatar = '',
      nickName = '',
      redBookId = '',
      desc = '',
      sex = '',
    } = userInfo;
    const {info} = store;
    // console.log('userInfo', userInfo);
    // console.log('info', info);
    return (
      <View
        onLayout={(e: LayoutChangeEvent) => {
          const {height} = e.nativeEvent.layout;
          setBgImgHeight(height);
          // console.log('e.nativeEvent.layout', e.nativeEvent.layout);
        }}>
        <View style={styles.avatarLayout}>
          {avatar && <Image style={styles.avatarImg} source={{uri: avatar}} />}
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{nickName}</Text>
            <View style={styles.idLayout}>
              <Text style={styles.idTxt}>小红书号: {redBookId}</Text>
              <Image source={icon_qrcode} style={styles.qrcodeImg} />
            </View>
          </View>
        </View>
        <Text style={styles.descTxt}>{desc || '点击这里, 填写简介'}</Text>
        <View style={styles.sexLayout}>
          <Image
            style={styles.sexImg}
            source={sex === 'male' ? icon_male : icon_female}
          />
        </View>
        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info?.followCount ?? ''}</Text>
            <Text style={styles.infoLabel}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.fans}</Text>
            <Text style={styles.infoLabel}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.favorateCount}</Text>
            <Text style={styles.infoLabel}>获赞与收藏</Text>
          </View>
          {/* 占位 */}
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.editTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Image style={styles.settingImg} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTabs = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      icon: {
        width: 28,
        height: 28,
      },
      line: {
        width: 28,
        height: 2,
        backgroundColor: '#ff2442',
        borderRadius: 1,
        position: 'absolute',
        bottom: 6,
      },
      tabButton: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
      },
      tabTxt: {
        fontSize: 17,
        color: '#999',
      },
      tabTxtSelected: {
        fontSize: 17,
        color: '#333',
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(0);
          }}
          activeOpacity={0.7}>
          <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
            笔记
          </Text>
          {tabIndex === 0 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(1);
          }}
          activeOpacity={0.7}>
          <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
            收藏
          </Text>
          {tabIndex === 1 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(2);
          }}
          activeOpacity={0.7}>
          <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
            赞过
          </Text>
          {tabIndex === 2 && <View style={styles.line} />}
        </TouchableOpacity>
      </View>
    );
  };

  const renderList = () => {
    const {noteList, collectionList, favorateList} = store;
    const currentList = [noteList, collectionList, favorateList][tabIndex];
    // console.log('currentList', currentList);
    const styles = StyleSheet.create({
      listLayout: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
      },
      item: {
        width: (SCREEN_WIDTH - 18) >> 1,
        backgroundColor: 'white',
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8,
      },
      titleTxt: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 10,
        marginVertical: 4,
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
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
        flex: 1,
      },
      heart: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },
      countTxt: {
        fontSize: 14,
        color: '#999',
        marginLeft: 4,
      },
      itemImg: {
        width: (SCREEN_WIDTH - 18) >> 1,
        height: 240,
      },
    });
    if (!currentList?.length) {
      const config = EMPTY_CONFIG[tabIndex];
      return <Empty icon={config.icon} tips={config.tips} />;
    }
    return (
      <View style={styles.listLayout}>
        {currentList.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.item}
              key={`${index}-${item.id}`}
              activeOpacity={0.9}
              onPress={onArticlePress(item)}>
              {/* 图片展示 */}
              <Image style={styles.itemImg} source={{uri: item.image}} />
              <Text style={styles.titleTxt}>{item.title}</Text>
              {/* 头像名称点赞数目 */}
              <View style={styles.nameLayout}>
                <Image
                  style={styles.avatarImg}
                  source={{uri: item.avatarUrl}}
                />
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
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Image
        source={icon_mine_bg}
        style={[
          styles.bgImg,
          {
            height: bgImgHeight + 64,
          },
        ]}
      />
      {renderTitle()}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={store.refreshing}
            onRefresh={() => {
              if (tabIndex === 0) {
                store.requestNoteList();
              } else if (tabIndex === 1) {
                store.requestCollectionList();
              } else if (tabIndex === 2) {
                store.requestFavorateList();
              }
            }}
          />
        }>
        {renderInfo()}
        {renderTabs()}
        {renderList()}
      </ScrollView>
      <SideMenu ref={slideMenuRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
});

export default observer(Mine);
