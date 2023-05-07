import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import MessageStore from '../../stores/MessageStore';
import MessageHeader from './components/MessageHeader';
import FloatMenu, {FloatModalRef} from './components/FloatMenu';

import icon_group from '../../assets/icon_group.png';
import icon_to_top from '../../assets/icon_to_top.png';
import Empty from '../../components/empty/Empty';
import icon_no_collection from '../../assets/icon_no_collection.webp';

const Message = () => {
  const store = useLocalStore(() => new MessageStore());

  const floatMenuRef = useRef<FloatModalRef>(null);

  useEffect(() => {
    store.requestMessageList();
    store.requestUnRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>消息</Text>
        <TouchableOpacity
          style={styles.groupButton}
          activeOpacity={0.7}
          onPress={(event: GestureResponderEvent) => {
            const {pageY} = event.nativeEvent;
            floatMenuRef.current?.open(pageY + 48);
          }}>
          <Image style={styles.iconGroup} source={icon_group} />
          <Text style={styles.groupTxt}>群聊</Text>
        </TouchableOpacity>
        <FloatMenu ref={floatMenuRef} />
      </View>
    );
  };

  const renderItem = ({item}: {item: MessageListItem}) => {
    const styles = StyleSheet.create({
      item: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      avatarImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        resizeMode: 'cover',
      },
      containerLayout: {
        flex: 1,
        marginHorizontal: 12,
      },
      nameTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
      },
      lastMessageTxt: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
      },

      rightLayout: {alignItems: 'flex-end'},
      timeTxt: {fontSize: 12, color: '#999'},
      iconTop: {
        width: 8,
        height: 16,
        marginTop: 6,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.item}>
        <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
        <View style={styles.containerLayout}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={styles.lastMessageTxt}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightLayout}>
          <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
          <Image style={styles.iconTop} source={icon_to_top} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.messageList}
        extraData={store.unread}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        ListHeaderComponent={<MessageHeader data={store?.unread} />}
        ListEmptyComponent={
          <Empty icon={icon_no_collection} tips={'暂无消息'} />
        }
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
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
  },
  groupButton: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  iconGroup: {
    width: 16,
    height: 16,
  },
  groupTxt: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
});

export default observer(Message);
