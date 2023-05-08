import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import icon_arrow from '../../../../assets/icon_arrow.png';
import icon_delete from '../../../../assets/icon_delete.png';
import {save} from '../../../../utils/Storage';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type Props = {
  categoryList?: Category[];
};

export interface CategoryModalRef {
  open: () => void;
  hide: () => void;
}

const CategoryModal = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false);

  const [list, setList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  const [edit, setEdit] = useState(false); // 是否编辑状态
  const {categoryList} = props;

  useEffect(() => {
    const newList = categoryList?.filter(i => i?.isAdd);
    const newOtherList = categoryList?.filter(i => !i?.isAdd);
    setList(newList || []);
    setOtherList(newOtherList || []);
  }, [categoryList]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    hide: handleClose,
  }));

  const onMyItemPress = useCallback(
    (item: Category) => {
      // 如果是编辑状态，点击其他频道，将其添加到我的频道
      console.log('edit', edit);
      if (!edit) {
        return;
      }
      console.log('item', item);
      const newMyList = list.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: false};
      const newOtherList = [...otherList, copy];

      LayoutAnimation.easeInEaseOut();

      setList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, list, otherList],
  );

  const onOtherItemPress = useCallback(
    (item: Category) => {
      // 如果是编辑状态，点击其他频道，将其添加到我的频道
      if (!edit) {
        return;
      }
      const newOtherList = otherList.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: true};
      const newMyList = [...list, copy];

      LayoutAnimation.easeInEaseOut();

      setList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, list, otherList],
  );

  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}></Text>
          <Text style={styles.subTitleTxt}>点击进入频道</Text>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.7}
            onPress={() =>
              // remove('categoryList')
              setEdit(pre => {
                if (pre) {
                  save('categoryList', JSON.stringify([...list, ...otherList]));
                  return false;
                } else {
                  return true;
                }
              })
            }>
            <Text style={styles.editTxt}>{edit ? '完成编辑' : '进入编辑'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Image style={styles.closeImg} source={icon_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContent}>
          {!!list?.length &&
            list.map((item, index) => {
              return (
                <TouchableOpacity
                  style={
                    item.default ? styles.itemLayoutDefault : styles.itemLayout
                  }
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => onMyItemPress(item)}>
                  <Text style={styles.item}>{item?.name}</Text>
                  {/* 默认的不加 */}
                  {edit && !item.default && (
                    <Image style={styles.deleteImg} source={icon_delete} />
                  )}
                </TouchableOpacity>
              );
            })}
        </View>
      </>
    );
  };

  const renderOtherList = () => {
    return (
      <>
        <View
          style={[
            styles.row,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              marginTop: 32,
            },
          ]}>
          <Text style={styles.titleTxt}>推荐频道</Text>
          <Text style={styles.subTitleTxt}>点击添加频道</Text>
        </View>
        <View style={styles.listContent}>
          {!!otherList?.length &&
            otherList.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.itemLayout}
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => onOtherItemPress(item)}>
                  <Text style={styles.item}>+ {item?.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </>
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
      <View style={styles.root}>
        <View style={styles.content}>
          {renderMyList()}
          {renderOtherList()}
        </View>
        <TouchableOpacity
          style={styles.mask}
          activeOpacity={0.9}
          onPress={handleClose}
        />
      </View>
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 48 + (StatusBar?.currentHeight || 0),
    paddingBottom: 40,
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: '#00000060',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titleTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  subTitleTxt: {
    fontSize: 13,
    color: '#999',
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTxt: {
    fontSize: 13,
    color: '#3050ff',
  },
  closeBtn: {
    padding: 12,
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemLayout: {
    width: (SCREEN_WIDTH - 80) / 4,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    marginLeft: 16,
    marginTop: 12,
  },
  itemLayoutDefault: {
    width: (SCREEN_WIDTH - 80) / 4,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#eee',
    borderColor: '#eee',
    borderRadius: 4,
    marginLeft: 16,
    marginTop: 12,
  },
  item: {
    fontSize: 14,
    color: '#666',
  },
  deleteImg: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: -8,
    right: -8,
  },
});

export default CategoryModal;
