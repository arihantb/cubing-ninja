import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import Text from './Text';

/**
 * Header component.
 * @param {string} title the title of the header.
 * @param {function} onClose the on close action function.
 * @returns the Header component.
 */
const Header = ({title, onClose, ...props}) => (
  <View
    className="flex-row bg-neutral-50 dark:bg-neutral-800 shadow-lg shadow-neutral-900 dark:shadow-none"
    {...props}>
    <Pressable className="p-4" onPress={onClose}>
      <Icon
        icon={faArrowLeft}
        color="bg-neutral-900 dark:bg-neutral-50"
        size={20}
      />
    </Pressable>
    <View className="justify-center">
      <Text className="text-2xl">{title}</Text>
    </View>
  </View>
);

export default memo(Header);
