import {Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

interface Props {
  uri: string;
}

// 获取屏幕的宽度信息
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SHOW_WIDTH = (SCREEN_WIDTH - 18) / 2;

const ResizeImage = ({uri}: Props) => {
  const [imgHeight, setImgHeight] = useState(200);

  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const newShowHeight = (SHOW_WIDTH * height) / width;
      setImgHeight(newShowHeight);
    });
  }, [uri]);

  return (
    <Image
      style={{
        width: SHOW_WIDTH,
        height: imgHeight,
      }}
      source={{uri}}
    />
  );
};

export default ResizeImage;
