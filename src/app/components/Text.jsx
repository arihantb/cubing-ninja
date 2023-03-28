import React, {memo} from 'react';
import {Text as RNText} from 'react-native';

/**
 * Text component.
 * @param {PropTypes} children the child elements of the text component.
 * @returns the Text component.
 */
const Text = ({children, ...props}) => (
  <RNText
    className="text-neutral-900 dark:text-neutral-50 text-base [font-family:GoogleSans-Bold]"
    {...props}>
    {children}
  </RNText>
);

export default memo(Text);
