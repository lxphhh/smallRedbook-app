import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import MessageStore from '../../stores/MessageStore';

import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';
import icon_group from '../../assets/icon_group.png';
import icon_to_top from '../../assets/icon_to_top.png';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import MessageHeader from './components/MessageHeader';

const Message = () => {
  const store = useLocalStore(() => new MessageStore());

  useEffect(() => {
    store.requestMessageList();
    store.requestUnRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>消息</Text>
        <TouchableOpacity style={styles.groupButton} activeOpacity={0.7}>
          <Image style={styles.iconGroup} source={icon_group} />
          <Text style={styles.groupTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}: {item: MessageListItem}) => {
    return <View />;
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
        ListHeaderComponent={<MessageHeader data={store.unread} />}
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
