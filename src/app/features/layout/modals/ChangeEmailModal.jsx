import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, Pressable, ToastAndroid, View} from 'react-native';
import {Input} from 'react-native-elements';
import {strings} from '../../../data/strings';
import {Text} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles/changeEmailModalStyle.js';
import {
  setEmailFromModal,
  setEmailInputError,
  setInvalidEmailStatus,
  toggleChangeEmailModalVisibilityFromModal,
  toggleChangingEmailStatus,
} from '../redux/changeEmailModalSlice';
import {toggleChangeEmailModalVisibility} from '../redux/editProfileSlice';
import {constants} from '../../../data/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../theme';
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
    <Modal
      onBackdropPress={() =>
        dispatch(toggleChangeEmailModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleChangeEmailModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleChangeEmailModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isChangeEmailModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.label}>{strings.changeEmail}</Text>
        <View style={styles.inputView}>
          <Input
            ref={emailInput}
            inputMode="email"
            returnKeyType="go"
            inputStyle={styles.input}
            placeholder={strings.enterNewEmail}
            leftIcon={
              <FontAwesomeIcon
                icon={faEnvelope}
                size={18}
                color={colors.greyDark}
              />
            }
            leftIconContainerStyle={styles.leftIconStyle}
            onChangeText={text => dispatch(setEmailFromModal(text))}
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
                dispatch(toggleChangingEmailStatus());
                _changeEmail().then(() =>
                  dispatch(toggleChangingEmailStatus()),
                );
              }
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Pressable
            onPress={() =>
              dispatch(toggleChangeEmailModalVisibilityFromModal())
            }>
            <Text style={styles.cancelButtonText}>{strings.cancel}</Text>
          </Pressable>
          {isChangingEmail ? (
            <ActivityIndicator color={colors.blue} size="small" />
          ) : (
            <Pressable
              onPress={() => {
                if (!_isInvalidInput) {
                  dispatch(toggleChangingEmailStatus());
                  _changeEmail().then(() =>
                    dispatch(toggleChangingEmailStatus()),
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

export default memo(ChangeEmailModal);
