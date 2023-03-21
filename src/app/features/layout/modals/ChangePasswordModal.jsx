import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, Pressable, ToastAndroid, View} from 'react-native';
import {Input} from 'react-native-elements';
import {strings} from '../../../data/strings';
import {Text} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles/changePasswordModalStyle.js';
import {
  setConfirmPasswordFromModal,
  setConfirmPasswordInputError,
  setInvalidConfirmPasswordStatus,
  setInvalidPasswordStatus,
  setPasswordFromModal,
  setPasswordInputError,
  toggleChangePasswordModalVisibilityFromModal,
  toggleChangingPasswordStatus,
} from '../redux/changePasswordModalSlice';
import {toggleChangePasswordModalVisibility} from '../redux/editProfileSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../theme';
import auth from '@react-native-firebase/auth';

const ChangePasswordModal = () => {
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const errorMessage = useSelector(
    state => state.changePasswordModal.errorMessage,
  );
  const password = useSelector(state => state.changePasswordModal.password);
  const confirmPassword = useSelector(
    state => state.changePasswordModal.confirmPassword,
  );
  const isChangePasswordModalVisible = useSelector(
    state => state.changePasswordModal.isChangePasswordModalVisible,
  );
  const isInvalidPassword = useSelector(
    state => state.changePasswordModal.isInvalidPassword,
  );
  const isInvalidConfirmPassword = useSelector(
    state => state.changePasswordModal.isInvalidConfirmPassword,
  );
  const isChangingPassword = useSelector(
    state => state.changePasswordModal.isChangingPassword,
  );

  const dispatch = useDispatch();

  const _isInvalidInput =
    password === '' ||
    isInvalidPassword ||
    confirmPassword === '' ||
    isInvalidConfirmPassword;

  const _setError = useCallback(
    (inputField, errorMessage) => {
      switch (inputField) {
        case passwordInput:
          dispatch(setPasswordInputError(errorMessage));
          dispatch(setInvalidPasswordStatus(errorMessage !== ''));
          break;
        case confirmPasswordInput:
          dispatch(setConfirmPasswordInputError(errorMessage));
          dispatch(setInvalidConfirmPasswordStatus(errorMessage !== ''));
          break;
      }
    },
    [dispatch],
  );

  const _setErrorWithAlert = (inputField, errorMessage) => {
    inputField.current.focus();
    inputField.current.shake();
    _setError(inputField, errorMessage);
  };

  const _changePassword = async () => {
    try {
      await auth().currentUser.updatePassword(password);
      ToastAndroid.show('Password changed successfully!', ToastAndroid.LONG);
      dispatch(toggleChangePasswordModalVisibilityFromModal());
    } catch (err) {
      switch (err.code) {
        case 'auth/weak-password':
          _setErrorWithAlert(passwordInput, 'Weak password');
          break;
        case 'auth/requires-recent-login':
          ToastAndroid.show(
            'Error updating password! Try logging in again.',
            ToastAndroid.LONG,
          );
          break;
      }
    }
  };

  useEffect(() => {
    _setError(
      password.length < 6 && password.length > 0 ? 'At least 6 characters' : '',
    );

    _setError(
      confirmPassword !== password
        ? confirmPassword.length > 0
          ? "Passwords don't match"
          : ''
        : '',
    );
  }, [dispatch, _setError, password, confirmPassword]);

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleChangePasswordModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleChangePasswordModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleChangePasswordModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isChangePasswordModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.label}>{strings.changePassword}</Text>
        <View style={styles.inputView}>
          <Input
            ref={passwordInput}
            inputMode="text"
            returnKeyType="next"
            inputStyle={styles.input}
            secureTextEntry={true}
            placeholder={strings.enterNewPassword}
            leftIcon={
              <FontAwesomeIcon
                icon={faLock}
                size={18}
                color={colors.greyDark}
              />
            }
            leftIconContainerStyle={styles.leftIconStyle}
            onChangeText={text => dispatch(setPasswordFromModal(text))}
            inputContainerStyle={[
              {
                borderColor: isInvalidPassword ? colors.red : colors.grey,
              },
              styles.inputContainer,
            ]}
            containerStyle={styles.container}
            errorStyle={errorMessage.password && styles.errorMessage}
            errorMessage={errorMessage.password}
            onSubmitEditing={() => confirmPasswordInput.current.focus()}
          />
          <Input
            ref={confirmPasswordInput}
            inputMode="text"
            returnKeyType="go"
            inputStyle={styles.input}
            secureTextEntry={true}
            placeholder={strings.confirmPassword}
            leftIcon={
              <FontAwesomeIcon
                icon={faLock}
                size={18}
                color={colors.greyDark}
              />
            }
            leftIconContainerStyle={styles.leftIconStyle}
            onChangeText={text => dispatch(setConfirmPasswordFromModal(text))}
            inputContainerStyle={[
              {
                borderColor: isInvalidConfirmPassword
                  ? colors.red
                  : colors.grey,
              },
              styles.inputContainer,
            ]}
            containerStyle={styles.container}
            errorStyle={errorMessage.confirmPassword && styles.errorMessage}
            errorMessage={errorMessage.confirmPassword}
            onSubmitEditing={() => {
              if (!_isInvalidInput) {
                dispatch(toggleChangingPasswordStatus());
                _changePassword().then(() =>
                  dispatch(toggleChangingPasswordStatus()),
                );
              }
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Pressable
            onPress={() =>
              dispatch(toggleChangePasswordModalVisibilityFromModal())
            }>
            <Text style={styles.cancelButtonText}>{strings.cancel}</Text>
          </Pressable>
          {isChangingPassword ? (
            <ActivityIndicator color={colors.blue} size="small" />
          ) : (
            <Pressable
              onPress={() => {
                if (!_isInvalidInput) {
                  dispatch(toggleChangingPasswordStatus());
                  _changePassword().then(() =>
                    dispatch(toggleChangingPasswordStatus()),
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

export default memo(ChangePasswordModal);
