import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ToastAndroid} from 'react-native';
import {strings} from '../../../data/strings';
import {Dialog, Input} from '_components';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmailFromForgotPasswordModal,
  setEmailInputError,
  setInvalidEmailStatus,
  toggleForgotPasswordModalVisibilityFromModal,
  toggleSendingMailStatus,
} from '../redux/forgotPasswordModalSlice';
import {toggleForgotPasswordModalVisibility} from '../redux/signInSignUpSlice';
import {constants} from '../../../data/constants';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';

const ForgotPasswordModal = () => {
  const emailInput = useRef();

  const errorMessage = useSelector(
    state => state.forgotPasswordModal.errorMessage,
  );
  const email = useSelector(state => state.forgotPasswordModal.email);
  const isForgotPasswordModalVisible = useSelector(
    state => state.forgotPasswordModal.isForgotPasswordModalVisible,
  );
  const isInvalidEmail = useSelector(
    state => state.forgotPasswordModal.isInvalidEmail,
  );
  const isSendingMail = useSelector(
    state => state.forgotPasswordModal.isSendingMail,
  );

  const dispatch = useDispatch();

  const _isInvalidInput = email === '' || isInvalidEmail;

  const _setError = useCallback(
    errorMessage => {
      dispatch(setEmailInputError(errorMessage));
      dispatch(setInvalidEmailStatus(errorMessage !== ''));
    },
    [dispatch],
  );

  const _setErrorWithAlert = errorMessage => {
    emailInput.current.focus();
    emailInput.current.shake();
    _setError(errorMessage);
  };

  const _sendMail = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      ToastAndroid.show('Password reset email sent!', ToastAndroid.LONG);
      dispatch(toggleForgotPasswordModalVisibilityFromModal());
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          _setErrorWithAlert('Invalid email');
          break;
        case 'auth/user-not-found':
          _setErrorWithAlert('No user found');
          break;
      }
    }
  };

  useEffect(() => {
    _setError(
      email.length > 0 &&
        (email.includes(' ') || !email.match(constants.emailRegex))
        ? 'Invalid email'
        : '',
    );
  }, [dispatch, _setError, email]);

  return (
    <Dialog
      isVisible={isForgotPasswordModalVisible}
      isLoading={isSendingMail}
      onHide={() => dispatch(toggleForgotPasswordModalVisibility())}
      onClose={() => dispatch(toggleForgotPasswordModalVisibilityFromModal())}
      onSubmit={() => {
        if (!_isInvalidInput) {
          dispatch(toggleSendingMailStatus());
          _sendMail().then(() => dispatch(toggleSendingMailStatus()));
        }
      }}
      title={strings.resetPassword}>
      <Input
        ref={emailInput}
        inputMode="email"
        returnKeyType="go"
        placeholder={strings.enterEmail}
        leftIcon={faEnvelope}
        onChangeText={text => dispatch(setEmailFromForgotPasswordModal(text))}
        errorMessage={errorMessage}
        onSubmitEditing={() => {
          if (!_isInvalidInput) {
            dispatch(toggleSendingMailStatus());
            _sendMail().then(() => dispatch(toggleSendingMailStatus()));
          }
        }}
      />
    </Dialog>
  );
};

export default memo(ForgotPasswordModal);
