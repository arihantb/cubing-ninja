import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import Loading from './Loading';
import Text from './Text';
import {strings} from '_data/strings';

/**
 * Dialog component.
 * @param {boolean} isInvalid the action button is disabled if this is true.
 * @param {boolean} isLoading the action button will be in loading state if this is true.
 * @param {function} onClose the callback when the dialog is closed.
 * @param {function} onHide the callback when the dialog is completely hidden.
 * @param {function} onSubmit the callback when the action button is pressed.
 * @param {string} title the title of the dialog.
 * @param {JSX.Element} children the children of the dialog.
 * @returns the Dialog component.
 */
const Dialog = ({
  isInvalid,
  isLoading,
  onClose,
  onHide,
  onSubmit,
  title,
  children,
  ...props
}) => (
  <Modal
    className="items-center"
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
    onModalHide={onHide}
    backdropTransitionOutTiming={0}
    useNativeDriverForBackdrop
    hideModalContentWhileAnimating
    {...props}>
    <View className="p-4 min-w-[250] justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
      <View className="gap-6">
        <View className="flex-row justify-between">
          <Text className="text-lg">{title}</Text>
          <Pressable onPress={onClose}>
            <Icon icon={faTimes} color="bg-neutral-500" size={20} />
          </Pressable>
        </View>
        <View>{children}</View>
        <View className="flex-row justify-end">
          <Pressable
            disabled={isInvalid}
            className={`p-2 rounded-md ${
              isLoading || isInvalid ? 'bg-indigo-300' : 'bg-indigo-500'
            } items-center justify-center`}
            onPress={onSubmit}>
            {isLoading ? (
              <Loading color="bg-indigo-500" />
            ) : (
              <Text className="text-sm">{strings.done}</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default memo(Dialog);
