import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, Pressable, ToastAndroid, View} from 'react-native';
import {Input} from 'react-native-elements';
import {strings} from '../../../data/strings';
import {Text} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles/changeUsernameModalStyle.js';
import {
  setUsernameFromModal,
  setUsernameInputError,
  setInvalidUsernameStatus,
  toggleChangeUsernameModalVisibilityFromModal,
  toggleChangingUsernameStatus,
} from '../redux/changeUsernameModalSlice';
import {toggleChangeUsernameModalVisibility} from '../redux/editProfileSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../theme';
import auth from '@react-native-firebase/auth';
import {loadFromLocalStorage, saveToLocalStorage} from '../../../libs';

const ChangeUsernameModal = () => {
  const usernameInput = useRef();

  const errorMessage = useSelector(
    state => state.changeUsernameModal.errorMessage,
  );
  const username = useSelector(state => state.changeUsernameModal.username);
  const isChangeUsernameModalVisible = useSelector(
    state => state.changeUsernameModal.isChangeUsernameModalVisible,
  );
  const isInvalidUsername = useSelector(
    state => state.changeUsernameModal.isInvalidUsername,
  );
  const isChangingUsername = useSelector(
    state => state.changeUsernameModal.isChangingUsername,
  );

  const dispatch = useDispatch();

  const _isInvalidInput = username === '' || isInvalidUsername;

  const _setError = useCallback(
    errorMessage => {
      dispatch(setUsernameInputError(errorMessage));
      dispatch(setInvalidUsernameStatus(errorMessage !== ''));
    },
    [dispatch],
  );

  const _changeUsername = async () => {
    try {
      await auth().currentUser.updateProfile({displayName: username});
      loadFromLocalStorage('userData').then(userData => {
        userData.username = username;
        saveToLocalStorage('userData', userData).then(() => {
          ToastAndroid.show(
            'Username changed successfully!',
            ToastAndroid.LONG,
          );
          dispatch(toggleChangeUsernameModalVisibilityFromModal());
        });
      });
    } catch (err) {
      ToastAndroid.show(
        'Error updating profile! Try logging in again.',
        ToastAndroid.LONG,
      );
    }
  };

  useEffect(() => {
    _setError(
      username.includes(' ')
        ? 'Spaces not allowed'
        : username.length < 6 && username.length > 0
        ? 'At least 6 characters'
        : '',
    );
  }, [dispatch, _setError, username]);

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleChangeUsernameModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleChangeUsernameModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleChangeUsernameModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isChangeUsernameModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.label}>{strings.changeUsername}</Text>
        <View style={styles.inputView}>
          <Input
            ref={usernameInput}
            inputMode="username"
            returnKeyType="go"
            inputStyle={styles.input}
            placeholder={strings.enterNewUsername}
            leftIcon={
              <FontAwesomeIcon
                icon={faUser}
                size={18}
                color={colors.greyDark}
              />
            }
            leftIconContainerStyle={styles.leftIconStyle}
            onChangeText={text => dispatch(setUsernameFromModal(text))}
            inputContainerStyle={[
              {
                borderColor: isInvalidUsername ? colors.red : colors.grey,
              },
              styles.inputContainer,
            ]}
            containerStyle={styles.container}
            errorStyle={errorMessage && styles.errorMessage}
            errorMessage={errorMessage}
            onSubmitEditing={() => {
              if (!_isInvalidInput) {
                dispatch(toggleChangingUsernameStatus());
                _changeUsername().then(() =>
                  dispatch(toggleChangingUsernameStatus()),
                );
              }
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Pressable
            onPress={() =>
              dispatch(toggleChangeUsernameModalVisibilityFromModal())
            }>
            <Text style={styles.cancelButtonText}>{strings.cancel}</Text>
          </Pressable>
          {isChangingUsername ? (
            <ActivityIndicator color={colors.blue} size="small" />
          ) : (
            <Pressable
              onPress={() => {
                if (!_isInvalidInput) {
                  dispatch(toggleChangingUsernameStatus());
                  _changeUsername().then(() =>
                    dispatch(toggleChangingUsernameStatus()),
                  );
                }
              }}>
              <Text
                style={
                  _isInvalidInput
                    ? styles.doneButtonTextDisabled
                    : styles.doneButtonText
                }>
                {strings.done}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default memo(ChangeUsernameModal);
