import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';
import {Avatar, Divider, Pressable, View} from 'react-native';
import {
  faStopwatch,
  faBrain,
  faShapes,
  faFolder,
  faCog,
  faDonate,
  faQuestionCircle,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Text} from '_components';
import {strings} from '_data/strings';
import {setDrawerItemIndex} from '_features/home/redux/homeSlice';
import {
  setUsername,
  setProfile,
  toggleEditProfileVisibility,
  toggleSignInSignUpVisibility,
  setLoggedInStatus,
} from './redux/navigationDrawerSlice';
import EditProfile from './modals/EditProfile';
import SignInSignUp from './modals/SignInSignUp';
import {toggleSignInSignUpVisibilityFromModal} from './redux/signInSignUpSlice';
import {
  setEmailFromModal,
  setProfileFromModal,
  setUsernameFromModal,
  toggleEditProfileVisibilityFromModal,
} from './redux/editProfileSlice';
import {loadFromLocalStorage} from '../../libs';
import {constants} from '../../data/constants';

const NavigationDrawer = ({props}) => {
  const drawerItemIndex = useSelector(state => state.home.drawerItemIndex);
  const isLoggedIn = useSelector(state => state.navigationDrawer.isLoggedIn);
  const isEditProfileVisible = useSelector(
    state => state.navigationDrawer.isEditProfileVisible,
  );
  const isSignInSignUpVisible = useSelector(
    state => state.navigationDrawer.isSignInSignUpVisible,
  );
  const profile = useSelector(state => state.navigationDrawer.profile);
  const username = useSelector(state => state.navigationDrawer.username);

  const dispatch = useDispatch();

  useEffect(() => {
    loadFromLocalStorage('userData').then(userData => {
      if (userData !== null) {
        dispatch(setLoggedInStatus(true));
        dispatch(setUsername(userData.username));
        dispatch(setProfile(userData.profile));
        dispatch(setProfileFromModal(userData.profile));
        dispatch(setEmailFromModal(userData.email));
        dispatch(setUsernameFromModal(userData.username));
      }
    });
  }, [isLoggedIn]);

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      {isSignInSignUpVisible && <SignInSignUp />}
      {isEditProfileVisible && <EditProfile />}
      <View className="p-8 bg-neutral-50 dark:bg-neutral-800 shadow-xl shadow-neutral-900 dark:shadow-none">
        <Pressable
          className="flex-row gap-4 items-center"
          onPress={() => {
            if (isLoggedIn) {
              dispatch(toggleEditProfileVisibility());
              dispatch(toggleEditProfileVisibilityFromModal());
            } else {
              dispatch(toggleSignInSignUpVisibility());
              dispatch(toggleSignInSignUpVisibilityFromModal());
            }
          }}>
          <Avatar
            size="lg"
            source={{uri: isLoggedIn ? profile : constants.placeholderUser}}
          />
          <Text className="text-2xl">
            {isLoggedIn ? username : strings.signIn}
          </Text>
        </Pressable>
      </View>
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 0
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(0));
          props.navigation.navigate('timer');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faStopwatch}
            color={
              drawerItemIndex === 0
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.timer}</Text>
        </View>
      </Pressable>
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 1
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(1));
          props.navigation.navigate('trainer');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faBrain}
            color={
              drawerItemIndex === 1
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.trainer}</Text>
        </View>
      </Pressable>
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 2
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(2));
          props.navigation.navigate('algorithms');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faShapes}
            color={
              drawerItemIndex === 2
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.algorithms}</Text>
        </View>
      </Pressable>
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 3
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(3));
          props.navigation.navigate('patterns');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faPalette}
            color={
              drawerItemIndex === 3
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.patterns}</Text>
        </View>
      </Pressable>
      <Divider orientation="horizontal" backgroundColor={'#FFFF00'} />
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 4
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(4));
          props.navigation.navigate('theme');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faFolder}
            color={
              drawerItemIndex === 4
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text
            className={`text-xl ${drawerItemIndex === 4 && 'text-neutral-50'}`}>
            {strings.theme}
          </Text>
        </View>
      </Pressable>
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 5
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(5));
          props.navigation.navigate('settings');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faCog}
            color={
              drawerItemIndex === 5
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.settings}</Text>
        </View>
      </Pressable>
      <Divider orientation="horizontal" backgroundColor={'#FF00FF'} />
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 6
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(6));
          props.navigation.navigate('donate');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faDonate}
            color={
              drawerItemIndex === 6
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.donate}</Text>
        </View>
      </Pressable>
      <Pressable
        className={`p-4 ${
          drawerItemIndex === 7
            ? 'bg-indigo-500'
            : 'bg-neutral-50 dark:bg-neutral-900'
        }`}
        onPress={() => {
          dispatch(setDrawerItemIndex(7));
          props.navigation.navigate('about');
        }}>
        <View className="flex-row gap-4">
          <Icon
            icon={faQuestionCircle}
            color={
              drawerItemIndex === 7
                ? 'dark:bg-neutral-50'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
          <Text className="text-xl">{strings.about}</Text>
        </View>
      </Pressable>
    </View>
  );
};

NavigationDrawer.propTypes = {
  navigation: PropTypes.object,
};

export default memo(NavigationDrawer);
