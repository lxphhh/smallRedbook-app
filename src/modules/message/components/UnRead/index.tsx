import {Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  count: number;
};

const UnRead = ({count}: Props) => {
  return <Text style={styles.unReadTxt}>{count > 99 ? '99+' : count}</Text>;
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
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#fff',
  },
});

export default UnRead;
