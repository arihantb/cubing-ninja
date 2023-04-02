import RNModal from 'react-native-modal';
import React, {memo} from 'react';
import {View} from 'react-native';
import Header from './Header';

/**
 * Screen component.
 * @param {function} onClose the callback when the screen is closed.
 * @param {function} onHide the callback when the screen is completely hidden.
 * @param {string} title the title of the screen.
 * @param {JSX.Element} children the children of the screen.
 * @returns the Screen component.
 */
const Screen = ({onClose, onHide, title, children, ...props}) => (
  <RNModal
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    onModalHide={onHide}
    animationIn="slideInRight"
    animationOut="slideOutRight"
    hasBackdrop={false}
    className="m-0"
    {...props}>
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      <Header title={title} onClose={onClose} />
      {children}
    </View>
  </RNModal>
);

export default memo(Screen);
