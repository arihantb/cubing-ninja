import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ToastAndroid, View} from 'react-native';
import {strings} from '_data/strings';
import {Dialog, Input} from '_components';
import {useDispatch, useSelector} from 'react-redux';
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
import auth from '@react-native-firebase/auth';
import {faLock} from '@fortawesome/free-solid-svg-icons';

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
      passwordInput,
      password.length < 6 && password.length > 0 ? 'At least 6 characters' : '',
    );

    _setError(
      confirmPasswordInput,
      confirmPassword !== password
        ? confirmPassword.length > 0
          ? "Passwords don't match"
          : ''
        : '',
    );
  }, [dispatch, _setError, password, confirmPassword]);

  return (
    <Dialog
      isInvalid={_isInvalidInput}
      isVisible={isChangePasswordModalVisible}
      isLoading={isChangingPassword}
      onHide={() => dispatch(toggleChangePasswordModalVisibility())}
      onClose={() => dispatch(toggleChangePasswordModalVisibilityFromModal())}
      onSubmit={() => {
        if (!_isInvalidInput) {
          dispatch(toggleChangingPasswordStatus());
          _changePassword().then(() =>
            dispatch(toggleChangingPasswordStatus()),
          );
        }
      }}
      title={strings.changePassword}>
      <View className="gap-3">
        <View>
          <Input
            ref={passwordInput}
            inputMode="text"
            returnKeyType="next"
            placeholder={strings.enterNewPassword}
            leftIcon={faLock}
            secureTextEntry={true}
            onChangeText={text => dispatch(setPasswordFromModal(text))}
            errorMessage={errorMessage.password}
            onSubmitEditing={() => confirmPasswordInput.current.focus()}
          />
        </View>
        <View>
          <Input
            ref={confirmPasswordInput}
            inputMode="password"
            returnKeyType="go"
            placeholder={strings.confirmPassword}
            leftIcon={faLock}
            secureTextEntry={true}
            onChangeText={text => dispatch(setConfirmPasswordFromModal(text))}
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
      </View>
    </Dialog>
  );
};

export default memo(ChangePasswordModal);
