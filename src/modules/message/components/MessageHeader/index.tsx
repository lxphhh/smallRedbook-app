import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

import icon_star from '../../../../assets/icon_star.png';
import icon_new_follow from '../../../../assets/icon_new_follow.png';
import icon_comments from '../../../../assets/icon_comments.png';

type Props = {
  data: UnRead;
};

const MessageHeader = ({data}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerItem}>
        <View>
          <Image style={styles.itemImg} source={icon_star} />
          {/* {!!unread?.unreadFavorate && (
            <UnRead count={unread?.unreadFavorate} />
          )} */}
        </View>
        <Text style={styles.itemTxt}>赞和收藏</Text>
      </View>
      <View style={styles.headerItem}>
        <View>
          <Image style={styles.itemImg} source={icon_new_follow} />
          {/* {!!unread?.newFollow && <UnRead count={unread?.newFollow} />} */}
        </View>
        <Text style={styles.itemTxt}>新增关注</Text>
      </View>
      <View style={styles.headerItem}>
        <View>
          <Image style={styles.itemImg} source={icon_comments} />
          {/* {!!unread?.comment && <UnRead count={unread?.comment} />} */}
        </View>
        <Text style={styles.itemTxt}>评论和@</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  itemImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemTxt: {fontSize: 16, color: '#333', marginTop: 8},
});

export default MessageHeader;
