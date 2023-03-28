import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ToastAndroid} from 'react-native';
import {strings} from '_data/strings';
import {Dialog, Input} from '_components';
import {useDispatch, useSelector} from 'react-redux';
import {
  setUsernameFromModal,
  setUsernameInputError,
  setInvalidUsernameStatus,
  toggleChangeUsernameModalVisibilityFromModal,
  toggleChangingUsernameStatus,
} from '../redux/changeUsernameModalSlice';
import {toggleChangeUsernameModalVisibility} from '../redux/editProfileSlice';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';
import {loadFromLocalStorage, saveToLocalStorage} from '_libs';

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
    <Dialog
      isInvalid={_isInvalidInput}
      isVisible={isChangeUsernameModalVisible}
      isLoading={isChangingUsername}
      onHide={() => dispatch(toggleChangeUsernameModalVisibility())}
      onClose={() => dispatch(toggleChangeUsernameModalVisibilityFromModal())}
      onSubmit={() => {
        if (!_isInvalidInput) {
          dispatch(toggleChangingUsernameStatus());
          _changeUsername().then(() =>
            dispatch(toggleChangingUsernameStatus()),
          );
        }
      }}
      title={strings.changeUsername}>
      <Input
        ref={usernameInput}
        inputMode="text"
        returnKeyType="go"
        placeholder={strings.enterNewUsername}
        leftIcon={faUser}
        onChangeText={text => dispatch(setUsernameFromModal(text))}
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
    </Dialog>
  );
};

export default memo(ChangeUsernameModal);
