import React, {memo} from 'react';
import {ToastAndroid} from 'react-native';
import {strings} from '../../../data/strings';
import {Dialog, Text} from '_components';
import {useDispatch, useSelector} from 'react-redux';
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
          dispatch(toggleConfirmDeleteAccountModalVisibilityFromModal());
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
    <Dialog
      isVisible={isConfirmDeleteAccountModalVisible}
      isLoading={isDeletingAccount}
      onHide={() => dispatch(toggleConfirmDeleteAccountModalVisibility())}
      onClose={() =>
        dispatch(toggleConfirmDeleteAccountModalVisibilityFromModal())
      }
      onSubmit={() => {
        dispatch(setDeletingAccountStatus(true));
        _deleteAccount().then(() => dispatch(setDeletingAccountStatus(false)));
      }}
      title={strings.areYouSure}>
      <Text className="text-base [font-family:GoogleSans-Bold] text-neutral-900 dark:text-neutral-400">
        {strings.deleteAccountInfo}
      </Text>
    </Dialog>
  );
};

export default memo(ConfirmDeleteAccountModal);
