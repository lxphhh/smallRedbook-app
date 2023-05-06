import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';

import icon_group from '../../../../assets/icon_group.png';
import icon_create_group from '../../../../assets/icon_create_group.png';

export interface FloatModalRef {
  open: (pageY: number) => void;
  hide: () => void;
}

const FloatMenu = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);

  const [pointY, setPointY] = useState(100);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = (pageY: number) => {
    console.log('pageY', pageY);
    setPointY(pageY);
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    hide: handleClose,
  }));

  const renderMenus = () => {
    return (
      <View
        style={[
          styles.content,
          {
            top: pointY,
          },
        ]}>
        {/* onPress={handleClose} */}
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Image style={styles.menuIcon} source={icon_group} />
          <Text style={styles.menuTxt}>群聊广场</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Image style={styles.menuIcon} source={icon_create_group} />
          <Text style={styles.menuTxt}>创建群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      // 即 modal 位于状态栏下方
      statusBarTranslucent
      animationType="fade"
      onRequestClose={handleClose}>
      <TouchableOpacity style={styles.root} onPress={handleClose}>
        {renderMenus()}
      </TouchableOpacity>
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
  },
  content: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 170,
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
  menuTxt: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  menuItem: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  line: {
    marginLeft: 20,
    marginRight: 16,
    height: 1,
    backgroundColor: '#eee',
  },
});

export default FloatMenu;
