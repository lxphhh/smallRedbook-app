import {Text, StyleSheet, View} from 'react-native';
import React from 'react';

type Props = {
  count: number;
};

const UnRead = ({count}: Props) => {
  return (
    <View style={styles.unReadTxt}>
      <Text style={styles.countTxt}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  unReadTxt: {
    position: 'absolute',
    top: -6,
    right: -10,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#FF2442',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countTxt: {
    fontSize: 12,
    color: '#fff',
  },
});

export default UnRead;
