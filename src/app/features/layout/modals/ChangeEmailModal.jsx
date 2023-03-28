import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ToastAndroid} from 'react-native';
import {strings} from '_data/strings';
import {Dialog, Input} from '_components';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmailFromModal,
  setEmailInputError,
  setInvalidEmailStatus,
  toggleChangeEmailModalVisibilityFromModal,
  toggleChangingEmailStatus,
} from '../redux/changeEmailModalSlice';
import {toggleChangeEmailModalVisibility} from '../redux/editProfileSlice';
import {constants} from '../../../data/constants';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';
import {loadFromLocalStorage, saveToLocalStorage} from '../../../libs';

const ChangeEmailModal = () => {
  const emailInput = useRef();

  const errorMessage = useSelector(
    state => state.changeEmailModal.errorMessage,
  );
  const email = useSelector(state => state.changeEmailModal.email);
  const isChangeEmailModalVisible = useSelector(
    state => state.changeEmailModal.isChangeEmailModalVisible,
  );
  const isInvalidEmail = useSelector(
    state => state.changeEmailModal.isInvalidEmail,
  );
  const isChangingEmail = useSelector(
    state => state.changeEmailModal.isChangingEmail,
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

  const _changeEmail = async () => {
    try {
      await auth().currentUser.updateEmail(email);
      loadFromLocalStorage('userData').then(userData => {
        userData.email = email;
        saveToLocalStorage('userData', userData).then(() => {
          ToastAndroid.show('Email changed successfully!', ToastAndroid.LONG);
          dispatch(toggleChangeEmailModalVisibilityFromModal());
        });
      });
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          _setErrorWithAlert('Invalid Email');
          break;
        case 'auth/email-already-in-use':
          _setErrorWithAlert('Email already exists');
          break;
        case 'auth/requires-recent-login':
          ToastAndroid.show(
            'Error updating email! Try logging in again.',
            ToastAndroid.LONG,
          );
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
      isInvalid={_isInvalidInput}
      isVisible={isChangeEmailModalVisible}
      isLoading={isChangingEmail}
      onHide={() => dispatch(toggleChangeEmailModalVisibility())}
      onClose={() => dispatch(toggleChangeEmailModalVisibilityFromModal())}
      onSubmit={() => {
        if (!_isInvalidInput) {
          dispatch(toggleChangingEmailStatus());
          _changeEmail().then(() => dispatch(toggleChangingEmailStatus()));
        }
      }}
      title={strings.changeEmail}>
      <Input
        ref={emailInput}
        inputMode="email"
        returnKeyType="go"
        placeholder={strings.enterNewEmail}
        leftIcon={faEnvelope}
        onChangeText={text => dispatch(setEmailFromModal(text))}
        errorMessage={errorMessage}
        onSubmitEditing={() => {
          if (!_isInvalidInput) {
            dispatch(toggleChangingEmailStatus());
            _changeEmail().then(() => dispatch(toggleChangingEmailStatus()));
          }
        }}
      />
    </Dialog>
  );
};

export default memo(ChangeEmailModal);
