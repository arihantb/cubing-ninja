import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, View} from 'react-native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {colors} from '_features/theme';
import Text from '../text/Text';
import styles from './headerStyle';

/**
 * Header component.
 * @param {PropTypes} props the properties for Header component.
 * @returns the Header component.
 */
const Header = props => (
  <View style={styles.header}>
    <Pressable style={styles.backButton} onPress={() => props.hideModal()}>
      <FontAwesomeIcon icon={faArrowLeft} color={colors.white} size={20} />
    </Pressable>
    <View style={styles.titleView}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <View style={styles.right}>{props.right}</View>
  </View>
);

Header.propTypes = {
  hideModal: PropTypes.func.isRequired,
  right: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default memo(Header);
