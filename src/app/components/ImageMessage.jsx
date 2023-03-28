import React, {memo} from 'react';
import {Image, View} from 'react-native';
import Text from './Text';

/**
 * ImageMessage component.
 * @param {string} message the message to be displayed.
 * @returns the ImageMessage component.
 */
const ImageMessage = ({message, ...props}) => (
  <View className="flex-1 justify-center items-center" {...props}>
    <Image
      source={{
        uri: 'http://cube.rider.biz/visualcube.php?fmt=png&size=150&alg=U%27L%27U%27F%27R2B%27RFUB2UB%27LU%27FURF%27&bg=t',
      }}
      className="h-24 w-24"
    />
    <Text className="m-10 text-2xl">{message}</Text>
  </View>
);

export default memo(ImageMessage);
