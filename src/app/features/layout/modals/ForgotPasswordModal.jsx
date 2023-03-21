import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, Pressable, ToastAndroid, View} from 'react-native';
import {Input} from 'react-native-elements';
import {strings} from '../../../data/strings';
import {Text} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles/forgotPasswordModalStyle.js';
import {
  setEmailFromForgotPasswordModal,
  setEmailInputError,
  setInvalidEmailStatus,
  toggleForgotPasswordModalVisibilityFromModal,
  toggleSendingMailStatus,
} from '../redux/forgotPasswordModalSlice';
import {toggleForgotPasswordModalVisibility} from '../redux/signInSignUpSlice';
import {constants} from '../../../data/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../theme';
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
    <Modal
      onBackdropPress={() =>
        dispatch(toggleForgotPasswordModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleForgotPasswordModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleForgotPasswordModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isForgotPasswordModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.label}>{strings.forgotPassword}</Text>
        <View style={styles.inputView}>
          <Input
            ref={emailInput}
            inputMode="email"
            returnKeyType="go"
            inputStyle={styles.input}
            placeholder={strings.enterEmail}
            leftIcon={
              <FontAwesomeIcon
                icon={faEnvelope}
                size={18}
                color={colors.greyDark}
              />
            }
            onChangeText={text =>
              dispatch(setEmailFromForgotPasswordModal(text))
            }
            inputContainerStyle={[
              {
                borderColor: isInvalidEmail ? colors.red : colors.grey,
              },
              styles.inputContainer,
            ]}
            containerStyle={styles.container}
            errorStyle={errorMessage && styles.errorMessage}
            errorMessage={errorMessage}
            onSubmitEditing={() => {
              if (!_isInvalidInput) {
                dispatch(toggleSendingMailStatus());
                _sendMail().then(() => dispatch(toggleSendingMailStatus()));
              }
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Pressable
            onPress={() =>
              dispatch(toggleForgotPasswordModalVisibilityFromModal())
            }>
            <Text style={styles.cancelButtonText}>{strings.cancel}</Text>
          </Pressable>
          {isSendingMail ? (
            <ActivityIndicator color={colors.blue} size="small" />
          ) : (
            <Pressable
              disabled={_isInvalidInput}
              onPress={() => {
                if (!_isInvalidInput) {
                  dispatch(toggleSendingMailStatus());
                  _sendMail().then(() => dispatch(toggleSendingMailStatus()));
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

export default memo(ForgotPasswordModal);
