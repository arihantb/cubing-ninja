import RNModal from 'react-native-modal';
import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {strings} from '_data/strings';
import Text from './Text';

/**
 * Modal component.
 * @param {function} onClose the callback when the modal is closed.
 * @param {function} onHide the callback when the modal is completely hidden.
 * @param {string} title the title of the modal.
 * @param {JSX.Element} children the children of the modal.
 * @returns the Modal component.
 */
const Modal = ({onClose, onHide, title, children, ...props}) => (
  <RNModal
    onBackButtonPress={onClose}
    onModalHide={onHide}
    className="m-0"
    hideModalContentWhileAnimating
    propagateSwipe
    onSwipeComplete={onClose}
    {...props}>
    <View className="flex-1 mt-20 items-center justify-center">
      <View className="flex-1 overflow-hidden rounded-t-xl justify-between w-full bg-neutral-50 dark:bg-neutral-800">
        <View className="flex-row p-4 items-center bg-neutral-50 dark:bg-neutral-700 shadow-xl shadow-neutral-50 dark:shadow-none">
          <Text className="absolute left-0 right-0 justify-center text-xl text-center">
            {title}
          </Text>
          <Pressable onPress={onClose}>
            <Text className="text-lg text-red-500">{strings.close}</Text>
          </Pressable>
        </View>
        <View className="flex-1 px-4">{children}</View>
      </View>
    </View>
  </RNModal>
);

export default memo(Modal);
