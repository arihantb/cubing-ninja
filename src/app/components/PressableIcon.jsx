import React, {memo} from 'react';
import Icon from './Icon';
import {Pressable} from 'react-native';

/**
 * Icon component.
 * @param {string} color the color of the icon.
 * @returns the Icon component.
 */
const PressableIcon = ({
  containerStyle,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => (
  <Pressable
    className={containerStyle}
    onPress={onPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}>
    <Icon {...props} />
  </Pressable>
);

export default memo(PressableIcon);
