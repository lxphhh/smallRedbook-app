import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import ArticleDetailStore from '../../stores/ArticleDetailStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {ImageSlider} from '../../components/slidePager';
import UserStore from '../../stores/UserStore';
import Heart from '../../components/heart/Heart';
import dayjs from 'dayjs';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';
import {SafeAreaView} from 'react-native-safe-area-context';

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

  // 标题栏
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
        <TouchableOpacity style={styles.followBtn} activeOpacity={0.9}>
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

  // 渲染文章内容
  const renderInfo = () => {
    const {articleDetail} = store;
    const tags =
      !!articleDetail?.tag?.length &&
      articleDetail?.tag?.map(item => `# ${item}`).join(' ');
    return (
      <>
        <Text style={styles.articleTitleTxt}>{articleDetail?.title ?? ''}</Text>
        <Text style={styles.articleDescTxt}>{articleDetail?.desc ?? ''}</Text>
        {tags && <Text style={styles.articleTagsTxt}>{tags}</Text>}
        <Text style={styles.timeAndLocation}>
          {articleDetail?.dateTime ?? ''}&nbsp;
          {articleDetail?.location ?? ''}
        </Text>
        {/* 线 */}
        <View style={styles.line} />
      </>
    );
  };

  // 评论区
  const renderComment = () => {
    const {articleDetail} = store;
    const count = !!articleDetail?.comments?.length ?? 0;
    const {userInfo} = UserStore;

    const commentStyle = StyleSheet.create({
      commentCountTxt: {
        fontSize: 14,
        marginTop: 20,
        color: '#666',
        marginLeft: 16,
      },

      inputLayout: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      useAvatarImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: 'cover',
      },

      commentInput: {
        flex: 1,
        height: 32,
        borderRadius: 16,
        marginLeft: 12,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
        paddingHorizontal: 16,
      },

      commentLayout: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
      },
      commentItemLayout: {
        width: '100%',
        flexDirection: 'row',
      },
      cAvatar: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
      },
      contentLayout: {
        flex: 1,
        marginHorizontal: 12,
      },
      cUserName: {
        fontSize: 12,
        color: '#999',
      },
      messageTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
      timeAndLocalTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      fCountLayout: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      fCount: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
      },
      divider: {
        marginLeft: 48,
        marginRight: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        marginVertical: 16,
      },
    });

    return (
      <>
        <Text style={commentStyle.commentCountTxt}>
          {count ? `共 ${count} 条评论` : '暂无评论'}
        </Text>
        <View style={commentStyle.inputLayout}>
          {userInfo?.avatar && (
            <Image
              style={commentStyle.useAvatarImg}
              source={{uri: userInfo.avatar ?? ''}}
            />
          )}
          <TextInput
            style={commentStyle.commentInput}
            placeholder="说点什么吧,万一火了呢~"
            placeholderTextColor="#bbb"
          />
        </View>
        {/* 整体评论的布局 左中右*/}
        {!!count && articleDetail?.comments?.length && (
          <View style={commentStyle.commentLayout}>
            {articleDetail?.comments?.map(
              (item: ArticleComment, index: number) => {
                return (
                  <View key={`${index}`}>
                    <View style={commentStyle.commentItemLayout}>
                      {/* 左边的头像 */}
                      <Image
                        style={commentStyle.cAvatar}
                        source={{uri: item.avatarUrl}}
                      />
                      {/* 中间的评论内容 */}
                      <View style={commentStyle.contentLayout}>
                        <Text style={commentStyle.cUserName}>
                          {item?.userName ?? ''}
                        </Text>
                        <Text style={commentStyle.messageTxt}>
                          {item?.message ?? ''}
                          <Text style={commentStyle.timeAndLocalTxt}>
                            &nbsp;{dayjs(item?.dateTime).format('MM-DD') ?? ''}
                            &nbsp;
                            {item?.location ?? ''}
                          </Text>
                        </Text>
                        {!!item.children?.length &&
                          item.children.map(
                            (child: ArticleComment, childIndex: number) => {
                              return (
                                <View
                                  key={`${index}-${childIndex}`}
                                  style={[
                                    commentStyle.commentItemLayout,
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    {
                                      marginTop: 12,
                                      width: SCREEN_WIDTH - 80,
                                    },
                                  ]}>
                                  {/* 左边的头像 */}
                                  <Image
                                    style={commentStyle.cAvatar}
                                    source={{uri: child.avatarUrl}}
                                  />
                                  {/* 中间的评论内容 */}
                                  <View style={commentStyle.contentLayout}>
                                    <Text style={commentStyle.cUserName}>
                                      {child?.userName ?? ''}
                                    </Text>
                                    <Text style={commentStyle.messageTxt}>
                                      {child?.message ?? ''}
                                      <Text
                                        style={commentStyle.timeAndLocalTxt}>
                                        &nbsp;
                                        {dayjs(child?.dateTime).format(
                                          'MM-DD',
                                        ) ?? ''}
                                        &nbsp;
                                        {child?.location ?? ''}
                                      </Text>
                                    </Text>
                                  </View>
                                  {/* 右边的点赞数目 */}
                                  <View style={commentStyle.fCountLayout}>
                                    <Heart
                                      size={20}
                                      isFavorite={child?.isFavorite}
                                    />
                                    <Text style={commentStyle.fCount}>
                                      {child?.favoriteCount ?? 0}
                                    </Text>
                                  </View>
                                </View>
                              );
                            },
                          )}
                      </View>
                      {/* 右边的点赞数目 */}
                      <View style={commentStyle.fCountLayout}>
                        <Heart size={20} isFavorite={item?.isFavorite} />
                        <Text style={commentStyle.fCount}>
                          {item?.favoriteCount ?? 0}
                        </Text>
                      </View>
                    </View>
                    {/* 分割线 */}
                    <View style={commentStyle.divider} />
                  </View>
                );
              },
            )}
          </View>
        )}
      </>
    );
  };

  // 底部
  const renderBottom = () => {
    const {articleDetail} = store;
    return (
      <View style={styles.bottomLayout}>
        <View style={styles.bottomEditLayout}>
          <Image style={styles.editImg} source={icon_edit_comment} />
          <TextInput
            style={styles.bottomCommentInput}
            placeholder="说点什么吧..."
            placeholderTextColor="#666"
          />
        </View>

        <Heart size={28} isFavorite={articleDetail?.isFavorite} />
        <Text style={styles.bottomCount}>
          {articleDetail?.favoriteCount ?? 0}
        </Text>
        <Image
          style={styles.bottomIcon}
          source={
            articleDetail.isCollection
              ? icon_collection
              : icon_collection_selected
          }
        />
        <Text style={styles.bottomCount}>
          {articleDetail?.collectionCount ?? 0}
        </Text>
        <Image style={styles.bottomIcon} source={icon_comment} />
        <Text style={styles.bottomCount}>
          {articleDetail?.comments?.length ?? 0}
        </Text>
      </View>
    );
  };

  return (
    store?.articleDetail && (
      <SafeAreaView style={styles.root}>
        {renderTitle()}
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {renderImages()}
          {renderInfo()}
          {renderComment()}
        </ScrollView>
        {/* 页面底部 */}
        {renderBottom()}
      </SafeAreaView>
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
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followTxt: {
    height: 30,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
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
  articleTitleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
  },
  articleDescTxt: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  articleTagsTxt: {
    fontSize: 15,
    color: '#305090',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  timeAndLocation: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
    marginLeft: 16,
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth, // 头发丝宽度
    backgroundColor: '#eee',
  },
  bottomLayout: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },

  bottomEditLayout: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },

  editImg: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },

  bottomCommentInput: {
    height: '100%',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },

  bottomCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  bottomIcon: {
    width: 30,
    height: 30,
    marginLeft: 12,
    resizeMode: 'contain',
  },
});

export default observer(ArticleDetail);
