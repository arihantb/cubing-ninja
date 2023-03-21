import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {ActivityIndicator, Pressable, ToastAndroid, View} from 'react-native';
import {strings} from '../../../data/strings';
import {Text} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles/confirmDeleteAccountModalStyle.js';
import {
  setDeletingAccountStatus,
  toggleConfirmDeleteAccountModalVisibilityFromModal,
} from '../redux/confirmDeleteAccountModalSlice';
import {
  toggleConfirmDeleteAccountModalVisibility,
  toggleEditProfileVisibilityFromModal,
} from '../redux/editProfileSlice';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {loadFromLocalStorage} from '../../../libs';
import {clearLocalStorage} from '../../../libs/localStorageManagement';
import {setLoggedInStatus} from '../redux/navigationDrawerSlice';
import {colors} from '../../theme';

const ConfirmDeleteAccountModal = () => {
  const isConfirmDeleteAccountModalVisible = useSelector(
    state => state.confirmDeleteAccountModal.isConfirmDeleteAccountModalVisible,
  );
  const isDeletingAccount = useSelector(
    state => state.confirmDeleteAccountModal.isDeletingAccount,
  );

  const dispatch = useDispatch();

  const _deleteAccount = async () => {
    try {
      auth()
        .currentUser.delete()
        .then(() => {
          loadFromLocalStorage('userData').then(userData =>
            database().ref(`users/${userData.uid}`).remove(),
          );
          clearLocalStorage();
          ToastAndroid.show('Account deleted successfully', ToastAndroid.LONG);
          dispatch(setLoggedInStatus(false));
          dispatch(setDeletingAccountStatus(false));
          dispatch(toggleEditProfileVisibilityFromModal());
        });
    } catch (err) {
      ToastAndroid.show(
        'Error deleting account! Try logging in again.',
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleConfirmDeleteAccountModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleConfirmDeleteAccountModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleConfirmDeleteAccountModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isConfirmDeleteAccountModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.label}>{strings.areYouSure}</Text>
        <Text style={styles.info}>{strings.deleteAccountInfo}</Text>
        <View style={styles.buttons}>
          <Pressable
            onPress={() =>
              dispatch(toggleConfirmDeleteAccountModalVisibilityFromModal())
            }>
            <Text style={styles.cancelButtonText}>{strings.cancel}</Text>
          </Pressable>
          {isDeletingAccount ? (
            <ActivityIndicator color={colors.blue} size="small" />
          ) : (
            <Pressable
              onPress={() => {
                dispatch(setDeletingAccountStatus(true));
                _deleteAccount().then(() =>
                  dispatch(
                    toggleConfirmDeleteAccountModalVisibilityFromModal(),
                  ),
                );
              }}>
              <Text style={styles.doneButtonText}>{strings.done}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default memo(ConfirmDeleteAccountModal);
