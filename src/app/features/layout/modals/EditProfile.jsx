import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import {Pressable, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Text} from '_components';
import {strings} from '_data/strings';
import {
  setEmailFromModal,
  setProfileFromModal,
  setUsernameFromModal,
  toggleChangeEmailModalVisibility,
  toggleChangePasswordModalVisibility,
  toggleChangeUsernameModalVisibility,
  toggleConfirmDeleteAccountModalVisibility,
  toggleEditProfileVisibilityFromModal,
} from '../redux/editProfileSlice';
import {
  setLoggedInStatus,
  setProfile,
  toggleEditProfileVisibility,
} from '../redux/navigationDrawerSlice';
import {loadFromLocalStorage, saveToLocalStorage} from '../../../libs';
import auth from '@react-native-firebase/auth';
import {toggleChangeEmailModalVisibilityFromModal} from '../redux/changeEmailModalSlice';
import {toggleChangePasswordModalVisibilityFromModal} from '../redux/changePasswordModalSlice';
import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import {constants} from '../../../data/constants';
import ChangeUsernameModal from './ChangeUsernameModal';
import {toggleChangeUsernameModalVisibilityFromModal} from '../redux/changeUsernameModalSlice';
import {removeFromLocalStorage} from '../../../libs/localStorageManagement';
import ConfirmDeleteAccountModal from './ConfirmDeleteAccountModal';
import {toggleConfirmDeleteAccountModalVisibilityFromModal} from '../redux/confirmDeleteAccountModalSlice';
import {useNetInfo} from '@react-native-community/netinfo';

const EditProfile = () => {
  const netInfo = useNetInfo();

  const username = useSelector(state => state.editProfile.username);
  const email = useSelector(state => state.editProfile.email);
  const profile = useSelector(state => state.editProfile.profile);
  const isEditProfileVisible = useSelector(
    state => state.editProfile.isEditProfileVisible,
  );
  const isChangeEmailModalVisible = useSelector(
    state => state.editProfile.isChangeEmailModalVisible,
  );
  const isChangePasswordModalVisible = useSelector(
    state => state.editProfile.isChangePasswordModalVisible,
  );
  const isChangeUsernameModalVisible = useSelector(
    state => state.editProfile.isChangeUsernameModalVisible,
  );
  const isLoggedIn = useSelector(state => state.navigationDrawer.isLoggedIn);
  const isConfirmDeleteAccountModalVisible = useSelector(
    state => state.editProfile.isConfirmDeleteAccountModalVisible,
  );

  const dispatch = useDispatch();

  const avatarPickerCallback = useCallback(
    response => {
      if (!response.didCancel) {
        dispatch(setProfileFromModal(response.assets[0].uri));
        dispatch(setProfile(response.assets[0].uri));
        loadFromLocalStorage('userData').then(userData => {
          userData.profile = response.assets[0].uri;

          try {
            auth().currentUser.updateProfile({
              photoURL: response.assets[0].uri,
            });
          } catch (err) {
            console.error(err);
          }

          saveToLocalStorage('userData', userData);
        });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadFromLocalStorage('userData').then(userData =>
      dispatch(setEmailFromModal(userData.email)),
    );
  }, [dispatch, isChangeEmailModalVisible]);

  useEffect(() => {
    loadFromLocalStorage('userData').then(userData =>
      dispatch(setUsernameFromModal(userData.username)),
    );
  }, [dispatch, isChangeUsernameModalVisible]);

  return (
    <Modal
      onBackButtonPress={() => dispatch(toggleEditProfileVisibilityFromModal())}
      onModalHide={() => dispatch(toggleEditProfileVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      className="m-0"
      isVisible={isEditProfileVisible}>
      {isChangeEmailModalVisible && <ChangeEmailModal />}
      {isChangePasswordModalVisible && <ChangePasswordModal />}
      {isChangeUsernameModalVisible && <ChangeUsernameModal />}
      {isConfirmDeleteAccountModalVisible && <ConfirmDeleteAccountModal />}
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
        <Header
          title={strings.profile}
          onClose={() => {
            dispatch(toggleEditProfileVisibilityFromModal());
          }}
        />
        {netInfo.isConnected && netInfo.isInternetReachable ? (
          <View className="p-4 gap-8">
            <Pressable
              onPress={() => launchImageLibrary({}, avatarPickerCallback)}>
              <Avatar
                size="large"
                source={{uri: isLoggedIn ? profile : constants.placeholderUser}}
              />
            </Pressable>
            <View className="flex-row justify-between">
              <Text className="text-lg">Username</Text>
              <Pressable
                onPress={() => {
                  dispatch(toggleChangeUsernameModalVisibility());
                  dispatch(toggleChangeUsernameModalVisibilityFromModal());
                }}>
                <Text className="text-lg text-indigo-500">{username}</Text>
              </Pressable>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg">Email</Text>
              <Pressable
                onPress={() => {
                  dispatch(toggleChangeEmailModalVisibility());
                  dispatch(toggleChangeEmailModalVisibilityFromModal());
                }}>
                <Text className="text-lg text-indigo-500">{email}</Text>
              </Pressable>
            </View>
            <View className="flex-row justify-between">
              <Pressable
                onPress={() => {
                  dispatch(toggleChangePasswordModalVisibility());
                  dispatch(toggleChangePasswordModalVisibilityFromModal());
                }}>
                <Text className="text-lg text-indigo-500">
                  {strings.changePassword}
                </Text>
              </Pressable>
            </View>
            <View className="flex-row justify-between">
              <Pressable
                onPress={() => {
                  dispatch(toggleConfirmDeleteAccountModalVisibility());
                  dispatch(
                    toggleConfirmDeleteAccountModalVisibilityFromModal(),
                  );
                }}>
                <Text className="text-lg text-red-500">
                  {strings.deleteAccount}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  auth().signOut();
                  removeFromLocalStorage('userData').then(() =>
                    dispatch(setLoggedInStatus(false)),
                  );
                  dispatch(toggleEditProfileVisibilityFromModal());
                }}>
                <Text className="text-lg text-red-500">{strings.signOut}</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text className="w-full p-2 text-lg text-neutral-50 bg-red-500 text-center">
            No Internet
          </Text>
        )}
      </View>
    </Modal>
  );
};

export default memo(EditProfile);
