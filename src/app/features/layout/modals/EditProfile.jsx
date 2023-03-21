import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import {Pressable, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '_components';
import {strings} from '_data/strings';
import styles from '../styles/editProfileStyle';
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
import {Text} from '../../../components';
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
            console.log(err);
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
      style={styles.modalView}
      isVisible={isEditProfileVisible}>
      {isChangeEmailModalVisible && <ChangeEmailModal />}
      {isChangePasswordModalVisible && <ChangePasswordModal />}
      {isChangeUsernameModalVisible && <ChangeUsernameModal />}
      {isConfirmDeleteAccountModalVisible && <ConfirmDeleteAccountModal />}
      <View style={styles.modalContainer}>
        <Header
          title={strings.profile}
          hideModal={() => dispatch(toggleEditProfileVisibilityFromModal())}
        />
        {netInfo.isConnected && netInfo.isInternetReachable ? (
          <>
            <Pressable
              onPress={() => launchImageLibrary({}, avatarPickerCallback)}>
              <Avatar
                size="large"
                source={{uri: isLoggedIn ? profile : constants.placeholderUser}}
                overlayContainerStyle={styles.avatarBackground}
                containerStyle={styles.avatar}
              />
            </Pressable>
            <View style={styles.row}>
              <Text style={styles.label}>Username</Text>
              <Pressable
                onPress={() => {
                  dispatch(toggleChangeUsernameModalVisibility());
                  dispatch(toggleChangeUsernameModalVisibilityFromModal());
                }}>
                <Text style={styles.username}>{username}</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Pressable
                onPress={() => {
                  dispatch(toggleChangeEmailModalVisibility());
                  dispatch(toggleChangeEmailModalVisibilityFromModal());
                }}>
                <Text style={styles.email}>{email}</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable
                onPress={() => {
                  dispatch(toggleChangePasswordModalVisibility());
                  dispatch(toggleChangePasswordModalVisibilityFromModal());
                }}>
                <Text style={styles.password}>{strings.changePassword}</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable
                onPress={() => {
                  dispatch(toggleConfirmDeleteAccountModalVisibility());
                  dispatch(
                    toggleConfirmDeleteAccountModalVisibilityFromModal(),
                  );
                }}>
                <Text style={styles.deleteAccount}>
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
                <Text style={styles.signOut}>{strings.signOut}</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.noInternet}>
            <Text style={styles.noInternetText}>No Internet</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default memo(EditProfile);
