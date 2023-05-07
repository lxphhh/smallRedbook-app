import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {BOTTOM_MENUS, MENUS} from './menuData';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {remove} from '../../../../utils/Storage';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ContentWidth = SCREEN_WIDTH * 0.75;

export interface SideModalRef {
  open: () => void;
  hide: () => void;
}

const SideMenu = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(false);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const handleOpen = () => {
    setVisible(true);
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setOpen(true);
    }, 200);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    hide: handleClose,
  }));

  const navigation = useNavigation<StackNavigationProp<any>>();

  const onMenuItemPress = useCallback(
    (item: any) => async () => {
      if (item.name === '退出登陆') {
        handleClose();
        await remove('userInfo');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    },
    [navigation],
  );

  const renderContent = () => {
    return (
      <View style={[styles.content, {marginLeft: open ? 0 : -ContentWidth}]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          {MENUS.map((item, index) => {
            return (
              <View key={`${index}`}>
                {item.map((subItem, subIndex) => {
                  return (
                    <TouchableOpacity
                      key={`${index}-${subIndex}`}
                      style={styles.menuItem}
                      onPress={onMenuItemPress(subItem)}>
                      <Image
                        style={styles.menuItemIcon}
                        source={subItem.icon}
                      />
                      <Text style={styles.menuItemTxt}>{subItem.name}</Text>
                    </TouchableOpacity>
                  );
                })}

                {index !== MENUS.length - 1 && (
                  <View style={styles.divideLine} />
                )}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.footerLayout}>
          {BOTTOM_MENUS.map(item => {
            return (
              <TouchableOpacity
                key={`${item.txt}`}
                style={styles.bottomMenuItem}
                activeOpacity={0.8}>
                <View style={styles.bottomMenuIconWrap}>
                  <Image style={styles.bottomMenuIcon} source={item.icon} />
                </View>
                <Text style={styles.bottomMenuTxt}>{item.txt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
      {/* onPress={handleClose} */}
      <TouchableOpacity
        style={styles.root}
        activeOpacity={1}
        onPress={handleClose}>
        {renderContent()}
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles}></TouchableOpacity> */}
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#000000C0',
  },
  content: {
    height: '100%',
    width: ContentWidth,
    backgroundColor: '#fff',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  footerLayout: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 20,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomMenuIconWrap: {
    width: 44,
    height: 44,
    backgroundColor: '#f0f0f0',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMenuIcon: {
    width: 26,
    height: 26,
  },
  bottomMenuTxt: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  // 小menu
  menuItem: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  menuItemTxt: {
    fontSize: 16,
    color: '#333',
    marginLeft: 14,
  },
  divideLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
  container: {
    paddingTop: 72,
    paddingHorizontal: 28,
    paddingBottom: 12,
  },
});

export default SideMenu;
