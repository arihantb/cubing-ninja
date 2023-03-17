import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {View} from 'react-native';
import Text from '../text/Text';
import styles from './cardStyle';

/**
 * Card component.
 * @param {PropTypes} props the properties for Card component.
 * @returns the Card component.
 */
const Card = props => (
  <View style={[styles.card, props.cardStyle]}>
    <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
    {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
  </View>
);

Card.propTypes = {
  cardStyle: PropTypes.any,
  subtitle: PropTypes.string,
  subtitleStyle: PropTypes.any,
  title: PropTypes.any.isRequired,
  titleStyle: PropTypes.any,
};

export default memo(Card);
