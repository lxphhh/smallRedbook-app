// 头部渲染
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ListHeaderComponent = ({data}: {data: GoodsCategory[]}) => {
  const styleHeader = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    categoryItem: {
      width: '20%',
      alignItems: 'center',
      paddingVertical: 16,
    },
    itemImg: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    itemNameTxt: {
      fontSize: 14,
      color: '#333',
      marginTop: 6,
    },
  });
  return (
    <View style={styleHeader.container}>
      {!!data?.length &&
        data.map(item => {
          return (
            <View style={styleHeader.categoryItem} key={`${item.id}`}>
              <Image source={{uri: item.image}} style={styleHeader.itemImg} />
              <Text style={styleHeader.itemNameTxt}>{item.name}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default ListHeaderComponent;
