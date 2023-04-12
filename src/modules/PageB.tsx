import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const PageB = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleOnBtn = () => {
    // navigation.push('PageA');
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
        }}>
        PageB
      </Text>
      <Button title="点击跳转A" onPress={handleOnBtn}></Button>
    </View>
  );
};

export default PageB;
