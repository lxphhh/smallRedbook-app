import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Mine = () => {
  return (
    <View style={styles.root}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
        }}>
        Mine
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Mine;
