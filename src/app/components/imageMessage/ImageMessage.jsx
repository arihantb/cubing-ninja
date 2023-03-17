import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Image, View} from 'react-native';
import Text from '../text/Text';
import styles from './imageMessageStyle';

/**
 * ImageMessage component.
 * @param {PropTypes} props the properties for ImageMessage component.
 * @returns the ImageMessage component.
 */
const ImageMessage = props => (
  <View style={styles.base}>
    <Image
      source={{
        uri: 'http://cube.rider.biz/visualcube.php?fmt=png&size=150&alg=U%27L%27U%27F%27R2B%27RFUB2UB%27LU%27FURF%27&bg=t',
      }}
      style={styles.imageStyle}
    />
    <Text style={styles.messageStyle}>{props.message}</Text>
  </View>
);

ImageMessage.PropTypes = {
  message: PropTypes.string.isRequired,
};

export default memo(ImageMessage);
