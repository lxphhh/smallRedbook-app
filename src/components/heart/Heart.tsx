import {TouchableOpacity, Image, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';

type Props = {
  isFavorite: boolean;
  onChange?: (isFavorite: boolean) => void;
  size?: number;
};

const Heart = ({isFavorite, onChange, size = 20}: Props) => {
  const [isLike, setIsLike] = useState(false);

  const scale = useRef(new Animated.Value(0)).current;
  const alpha = useRef(new Animated.Value(0)).current;

  const handleOnPress = () => {
    const newIsLike = !isLike;
    setIsLike(newIsLike);
    onChange && onChange(newIsLike);
    if (newIsLike) {
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.6,
        duration: 300,
        useNativeDriver: true,
      });

      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        delay: 100,
      });
      // 同步执行动画
      Animated.parallel([scaleAnim, alphaAnim]).start();
    } else {
      scale.setValue(0);
      alpha.setValue(0);
    }
  };

  useEffect(() => {
    setIsLike(isFavorite);
  }, [isFavorite]);

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Image
        style={[styles.heart, {width: size, height: size}]}
        source={isLike ? icon_heart : icon_heart_empty}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          position: 'absolute',
          borderWidth: size / 25,
          borderRadius: size / 2,
          borderColor: '#ff2442',
          transform: [{scale: scale}],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Heart;
