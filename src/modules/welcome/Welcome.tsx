import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import logo_main_png from '../../assets/icon_main_logo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// type Props = {};

const WELCOME_TIME = 3000;

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const goToLogin = () => {
    navigation.replace('Login');
  };

  useEffect(() => {
    setTimeout(() => {
      goToLogin();
    }, WELCOME_TIME);
  }, []);

  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={logo_main_png} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 110,
    marginTop: 200,
    resizeMode: 'contain',
  },
});

export default Welcome;
