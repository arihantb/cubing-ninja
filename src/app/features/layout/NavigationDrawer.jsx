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
  toggleEditProfileVisibility,
  toggleSignInSignUpVisibility,
} from './redux/navigationDrawerSlice';
import EditProfile from './modals/EditProfile';
import SignInSignUp from './modals/SignInSignUp';
import styles from './styles/navigationDrawerStyle';

const NavigationDrawer = ({props}) => {
  const drawerItemIndex = useSelector(state => state.home.drawerItemIndex);
  const email = useSelector(state => state.navigationDrawer.email);
  const firstName = useSelector(state => state.navigationDrawer.firstName);
  const isEditProfileVisible = useSelector(
    state => state.navigationDrawer.isEditProfileVisible,
  );
  const isSignInSignUpVisible = useSelector(
    state => state.navigationDrawer.isSignInSignUpVisible,
  );
  const lastName = useSelector(state => state.navigationDrawer.firstName);
  const password = useSelector(state => state.navigationDrawer.firstName);
  const profilePicture = useSelector(
    state => state.navigationDrawer.profilePicture,
  );

  const dispatch = useDispatch();

  const _retrieveUserSession = async () => {
    try {
      // const session = await EncryptedStorage.getItem('userSession');
      // if (session !== undefined) {
      // const data = JSON.parse(session);
      // dispatch(setHeaderImage(data.headerImage));
      // dispatch(setProfilePicture(data.profilePicture));
      // dispatch(setFirstName(data.firstName));
      // dispatch(setLastName(data.lastName));
      // dispatch(setEmail(data.email));
      // dispatch(setPassword(data.password));
      // }
      // return session;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _retrieveUserSession();
  }, []);

  console.log(drawerItemIndex);

  return (
    <View style={styles.drawerView}>
      {isSignInSignUpVisible && <SignInSignUp />}
      {isEditProfileVisible && (
        <EditProfile
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
        />
      )}
      <View style={styles.drawerHeaderView}>
        <Pressable
          style={styles.row}
          onPress={() => {
            firstName === ''
              ? dispatch(toggleSignInSignUpVisibility())
              : dispatch(toggleEditProfileVisibility());
          }}>
          <Avatar
            rounded={true}
            size="large"
            icon={{
              name: 'user',
              type: 'font-awesome',
              color: colors.blue,
            }}
            source={profilePicture ? {uri: profilePicture} : {}}
            overlayContainerStyle={styles.avatarBackground}
            containerStyle={styles.avatar}
          />
          <Text style={styles.profileName}>
            {firstName === '' ? strings.signIn : firstName}
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
