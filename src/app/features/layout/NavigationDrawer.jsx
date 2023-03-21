import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';
import {Avatar, Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, View} from 'react-native';
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
import {Text} from '_components';
import {colors} from '_features/theme';
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
import styles from './styles/navigationDrawerStyle';
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
  }, [dispatch, isLoggedIn]);

  return (
    <View style={styles.drawerView}>
      {isSignInSignUpVisible && <SignInSignUp />}
      {isEditProfileVisible && <EditProfile />}
      <View style={styles.drawerHeaderView}>
        <Pressable
          style={styles.row}
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
            size="large"
            source={{uri: isLoggedIn ? profile : constants.placeholderUser}}
            overlayContainerStyle={styles.avatarBackground}
            containerStyle={styles.avatar}
          />
          <Text style={styles.profileName}>
            {isLoggedIn ? username : strings.signIn}
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={
          drawerItemIndex === 0
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(0));
          props.navigation.navigate('timer');
        }}>
        <FontAwesomeIcon icon={faStopwatch} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.timer}</Text>
      </Pressable>
      <Pressable
        style={
          drawerItemIndex === 1
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(1));
          props.navigation.navigate('trainer');
        }}>
        <FontAwesomeIcon icon={faBrain} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.trainer}</Text>
      </Pressable>
      <Pressable
        style={
          drawerItemIndex === 2
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(2));
          props.navigation.navigate('algorithms');
        }}>
        <FontAwesomeIcon icon={faShapes} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.algorithms}</Text>
      </Pressable>
      <Pressable
        style={
          drawerItemIndex === 3
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(3));
          props.navigation.navigate('patterns');
        }}>
        <FontAwesomeIcon icon={faPalette} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.patterns}</Text>
      </Pressable>
      <Divider orientation="horizontal" width={1} color={colors.secondary} />
      <Pressable
        style={
          drawerItemIndex === 4
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(4));
          props.navigation.navigate('theme');
        }}>
        <FontAwesomeIcon icon={faFolder} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.theme}</Text>
      </Pressable>
      <Pressable
        style={
          drawerItemIndex === 5
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(5));
          props.navigation.navigate('settings');
        }}>
        <FontAwesomeIcon icon={faCog} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.settings}</Text>
      </Pressable>
      <Divider orientation="horizontal" width={1} color={colors.secondary} />
      <Pressable
        style={
          drawerItemIndex === 6
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(6));
          props.navigation.navigate('donate');
        }}>
        <FontAwesomeIcon icon={faDonate} color={colors.white} size={20} />
        <Text style={styles.drawerItemText}>{strings.donate}</Text>
      </Pressable>
      <Pressable
        style={
          drawerItemIndex === 7
            ? styles.drawerItemSelected
            : styles.drawerItemUnselected
        }
        onPress={() => {
          dispatch(setDrawerItemIndex(7));
          props.navigation.navigate('about');
        }}>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          color={colors.white}
          size={20}
        />
        <Text style={styles.drawerItemText}>{strings.about}</Text>
      </Pressable>
    </View>
  );
};

NavigationDrawer.propTypes = {
  navigation: PropTypes.object,
};

export default memo(NavigationDrawer);
