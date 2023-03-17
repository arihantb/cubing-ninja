import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Text as ReactNativeText} from 'react-native';
import styles from './textStyle';

/**
 * Text component.
 * @param {PropTypes} props the properties for Text component.
 * @returns the text component.
 */
const Text = props => (
  <ReactNativeText style={[styles.base, props.style]}>
    {props.children}
  </ReactNativeText>
);

Text.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.any,
};

export default memo(Text);
