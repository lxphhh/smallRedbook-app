import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useLocalStore} from 'mobx-react';
import HomeStore from '../../stores/HomeStore';

const Home = () => {
  const store = useLocalStore(() => new HomeStore());

  useEffect(() => {
    store.requestHomeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.root}>
      <Text>121212</Text>
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

export default Home;
