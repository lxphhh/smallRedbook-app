import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import icon_arrow from '../../../../assets/icon_arrow.png';
import CategoryModal, {CategoryModalRef} from '../CategoryModal';

type Props = {
  categoryList: Category[];
  allCategoryList?: Category[];
  onCategoryChange?: (category: Category) => void;
};

const CategoryList = ({
  categoryList,
  allCategoryList,
  onCategoryChange,
}: Props) => {
  const [category, setCategory] = useState<Category>();

  const categoryRef = useRef<CategoryModalRef>(null);

  const handleOnPress = (item: Category) => {
    setCategory(item);
    onCategoryChange?.(item);
  };

  useEffect(() => {
    setCategory(categoryList.find(i => i.name === '推荐'));
  }, [categoryList]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categoryList.map((item, index) => {
          const isSelect = item?.name === category?.name;
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => handleOnPress(item)}>
              <Text
                style={isSelect ? styles.tabItemTxtActive : styles.tabItemTxt}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        activeOpacity={0.7}
        onPress={() => {
          categoryRef.current?.open();
        }}>
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>
      <CategoryModal ref={categoryRef} categoryList={allCategoryList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    transform: [{rotate: '-90deg'}],
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemTxtActive: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CategoryList;
