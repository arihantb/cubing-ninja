import {Animated} from 'react-native';

/**
 * Animation to increase the font size.
 * @param {object} fontSizeAnim the font size animation reference variable.
 */
export const fontSizeAnimIn = fontSizeAnim => {
  Animated.timing(fontSizeAnim, {
    toValue: 100,
    duration: 200,
    useNativeDriver: false,
  }).start();
};

/**
 * Animation to decrease the font size.
 * @param {object} fontSizeAnim the font size animation reference variable.
 */
export const fontSizeAnimOut = fontSizeAnim => {
  Animated.timing(fontSizeAnim, {
    toValue: 80,
    duration: 200,
    useNativeDriver: false,
  }).start();
};

/**
 * Animation to increase the height.
 * @param {object} heightAnim the height animation reference variable.
 */
export const heightAnimIn = heightAnim => {
  Animated.timing(heightAnim, {
    toValue: 100,
    duration: 300,
    useNativeDriver: false,
  }).start();
};

/**
 * Animation to decrease the height.
 * @param {object} heightAnim the height animation reference variable.
 */
export const heightAnimOut = heightAnim => {
  Animated.timing(heightAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start();
};

/**
 * Animation to rotate clockwise.
 * @param {object} rotationAnim the rotation animation reference variable.
 */
export const rotateAnimIn = rotationAnim => {
  Animated.timing(rotationAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  }).start();
};

/**
 * Animation to rotate anti-clockwise.
 * @param {object} rotationAnim the rotation animation reference variable.
 */
export const rotateAnimOut = rotationAnim => {
  Animated.timing(rotationAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start();
};
