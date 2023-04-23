import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import icon_arrow from '../../../../assets/icon_arrow.png';

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
  const {categoryList} = props;

  useEffect(() => {
    const newList = categoryList?.filter(i => i?.isAdd);
    const newOtherList = categoryList?.filter(i => !i?.isAdd);
    setList(newList || []);
    setOtherList(newOtherList || []);
    setList(categoryList || []);
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

  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>我的频道</Text>
          <Text style={styles.subTitleTxt}>点击进入频道</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editTxt}>进入编辑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn}>
            <Image style={styles.closeImg} source={icon_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContent}>
          {!!list?.length &&
            list.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.itemLayout}
                  key={index}
                  activeOpacity={0.7}>
                  <Text style={styles.item}>{item?.name}</Text>
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
                  activeOpacity={0.7}>
                  <Text style={styles.item}>{item?.name}</Text>
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
        <View style={styles.mask}></View>
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
  item: {
    fontSize: 14,
    color: '#666',
  },
});

export default CategoryModal;
