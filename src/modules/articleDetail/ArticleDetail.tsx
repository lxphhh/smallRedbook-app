import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import ArticleDetailStore from '../../stores/ArticleDetailStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import {ImageSlider} from '../../components/slidePager';

type RouteParams = {
  ArticleDetail: {
    id?: number;
  };
};

// 获取屏幕的宽度信息
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ArticleDetail = () => {
  const store = useLocalStore(() => new ArticleDetailStore());

  const navigation = useNavigation<StackNavigationProp<any>>();

  // 图片屏幕高
  const [imgHeight, setImgHeight] = useState(400);

  // 需要拿到文章id
  const {
    params: {id},
  } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();

  useEffect(() => {
    id && store.requestArticleDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    // Image.getSize(uri)
    if (!store?.articleDetail?.images?.length) {
      return;
    }
    const firstImage = store?.articleDetail?.images?.[0];
    Image.getSize(firstImage, (width: number, height: number) => {
      const newShowHeight = (SCREEN_WIDTH * height) / width;
      setImgHeight(newShowHeight);
    });
  }, [store?.articleDetail?.images]);

  const renderTitle = () => {
    const {articleDetail} = store;
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.pop()}>
          <Image style={styles.backImg} source={icon_arrow} />
        </TouchableOpacity>
        {articleDetail?.avatarUrl && (
          <Image
            style={styles.avatarImg}
            source={{
              uri: articleDetail?.avatarUrl ?? '',
            }}
          />
        )}
        <Text style={styles.userNameTxt}>{articleDetail?.userName ?? ''}</Text>
        <TouchableOpacity activeOpacity={0.9}>
          <Text style={styles.followTxt}>关注</Text>
        </TouchableOpacity>
        <Image style={styles.shareImg} source={icon_share} />
      </View>
    );
  };

  // 渲染图片内容
  const renderImages = () => {
    const {
      articleDetail: {images},
    } = store;

    if (!images?.length) {
      return null;
    }

    const data: any[] = images.map(item => {
      return {
        img: item,
      };
    });

    return (
      <View
        style={{
          paddingBottom: 30,
        }}>
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{
            width: SCREEN_WIDTH,
            height: imgHeight,
          }}
          indicatorContainerStyle={{
            bottom: -40,
          }}
          activeIndicatorStyle={styles.activeDot}
          inActiveIndicatorStyle={styles.inActiveDot}
        />
      </View>
    );
  };

  return (
    store?.articleDetail && (
      <View style={styles.root}>
        {renderTitle()}
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {renderImages()}
        </ScrollView>
      </View>
    )
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  avatarImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  userNameTxt: {
    fontSize: 16,
    flex: 1,
    color: '#333',
    marginLeft: 16,
  },
  followTxt: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#ff2442',
  },
  shareImg: {
    width: 28,
    height: 28,
    marginHorizontal: 16,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff2442',
  },
  inActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c0c0c0',
  },
});

export default observer(ArticleDetail);
