import React, {memo} from 'react';
import {View} from 'react-native';
import Text from './Text';

/**
 * Card component.
 * @param {string} title the title of the card.
 * @param {string} subtitle the subtitle of the card.
 * @returns the Card component.
 */
const Card = ({title, subtitle, ...props}) => (
  <View
    className="rounded-md bg-neutral-200 dark:bg-neutral-800 shadow-xl"
    {...props}>
    <View className="p-3 gap-2">
      <Text className="text-indigo-500 text-lg font-medium">{title}</Text>
      {subtitle && <Text className="text-neutral-400 text-sm">{subtitle}</Text>}
    </View>
  </View>
);

export default memo(Card);
