import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Input} from 'react-native-elements';
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  View,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Text} from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {
  setLoggedInStatus,
  toggleSignInSignUpVisibility,
} from '../redux/navigationDrawerSlice';
import styles from '../styles/signInSignUpStyle';
import {
  setConfirmPassword,
  setConfirmPasswordInputError,
  setConfirmPasswordInputVisibility,
  setEmail,
  setEmailInputError,
  setUsernameInputVisibility,
  setInvalidConfirmPasswordStatus,
  setInvalidEmailStatus,
  setInvalidPasswordStatus,
  setInvalidUsernameStatus,
  setPassword,
  setPasswordInputError,
  setUsername,
  setUsernameInputError,
  toggleForgotPasswordModalVisibility,
  toggleLoggingInStatus,
  toggleMode,
  toggleShowConfirmPasswordStatus,
  toggleShowPasswordStatus,
  toggleSignInSignUpVisibilityFromModal,
} from '../redux/signInSignUpSlice';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {saveToLocalStorage} from '../../../libs';
import {constants} from '../../../data/constants';
import {logo} from '../../../assets/images';
import ForgotPasswordModal from './ForgotPasswordModal';
import {toggleForgotPasswordModalVisibilityFromModal} from '../redux/forgotPasswordModalSlice';
import {getSolves} from '../../../utils';

const SignInSignUp = () => {
  const netInfo = useNetInfo();

  const heightAnim = useRef(new Animated.Value(100)).current;
  const confirmPasswordInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const usernameInput = useRef();

  const confirmPassword = useSelector(
    state => state.signInSignUp.confirmPassword,
  );
  const email = useSelector(state => state.signInSignUp.email);
  const errorMessage = useSelector(state => state.signInSignUp.errorMessage);
  const isConfirmPasswordInputVisible = useSelector(
    state => state.signInSignUp.isConfirmPasswordInputVisible,
  );
  const isUsernameInputVisible = useSelector(
    state => state.signInSignUp.isUsernameInputVisible,
  );
  const isInvalidConfirmPassword = useSelector(
    state => state.signInSignUp.isInvalidConfirmPassword,
  );
  const isInvalidEmail = useSelector(
    state => state.signInSignUp.isInvalidEmail,
  );
  const isInvalidPassword = useSelector(
    state => state.signInSignUp.isInvalidPassword,
  );
  const isInvalidUsername = useSelector(
    state => state.signInSignUp.isInvalidUsername,
  );
  const isLoggingIn = useSelector(state => state.signInSignUp.isLoggingIn);
  const isSignInSignUpVisible = useSelector(
    state => state.signInSignUp.isSignInSignUpVisible,
  );
  const isForgotPasswordModalVisible = useSelector(
    state => state.signInSignUp.isForgotPasswordModalVisible,
  );
  const isPasswordShown = useSelector(
    state => state.signInSignUp.isPasswordShown,
  );
  const isConfirmPasswordShown = useSelector(
    state => state.signInSignUp.isConfirmPasswordShown,
  );
  const mode = useSelector(state => state.signInSignUp.mode);
  const password = useSelector(state => state.signInSignUp.password);
  const username = useSelector(state => state.signInSignUp.username);

  const dispatch = useDispatch();

  const _setError = useCallback(
    (inputField, errorMessage, shouldAlert = true) => {
      if (shouldAlert) {
        inputField.current.focus();
        inputField.current.shake();
      }

      if (inputField === usernameInput) {
        dispatch(setUsernameInputError(errorMessage));
      } else if (inputField === passwordInput) {
        dispatch(setPasswordInputError(errorMessage));
      } else if (inputField === confirmPasswordInput) {
        dispatch(setConfirmPasswordInputError(errorMessage));
      } else {
        dispatch(setEmailInputError(errorMessage));
      }
    },
    [dispatch],
  );

  const _trySignIn = async () => {
    try {
      const currentUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      await saveToLocalStorage('userData', {
        email: currentUser.user.email,
        profile: currentUser.user.photoURL,
        uid: currentUser.user.uid,
        username: currentUser.user.displayName,
      });

      dispatch(setEmail(''));
      dispatch(setLoggedInStatus(true));
      dispatch(setPassword(''));
      dispatch(toggleSignInSignUpVisibilityFromModal());
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          _setError(passwordInput, 'Incorrect password');
          break;
        case 'auth/user-not-found':
          _setError(emailInput, 'No user found');
          break;
      }
    }
  };

  const _trySignUp = async () => {
    try {
      const currentUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      currentUser.user.updateProfile({
        displayName: username,
        photoURL: constants.placeholderUser,
      });

      await database()
        .ref(`/users/${currentUser.user.uid}`)
        .set({
          solves: await getSolves(),
        });

      await saveToLocalStorage('userData', {
        email: email,
        profile: constants.placeholderUser,
        uid: currentUser.user.uid,
        username: username,
      });

      dispatch(setConfirmPassword(''));
      dispatch(setEmail(''));
      dispatch(setLoggedInStatus(true));
      dispatch(setPassword(''));
      dispatch(setUsername(''));
      dispatch(toggleSignInSignUpVisibilityFromModal());
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          _setError(emailInput, 'Email already exists');
          break;
        case 'auth/invalid-email':
          _setError(emailInput, 'Invalid email');
          break;
      }
    }
  };

  const _submit = () => {
    if (!_isInvalidInput) {
      dispatch(setConfirmPasswordInputError(''));
      dispatch(setEmailInputError(''));
      dispatch(setPasswordInputError(''));
      dispatch(setUsernameInputError(''));
      dispatch(toggleLoggingInStatus());
      mode === strings.signUp
        ? _trySignUp().then(() => dispatch(toggleLoggingInStatus()))
        : _trySignIn().then(() => dispatch(toggleLoggingInStatus()));
    }
  };

  const _isInvalidInput =
    (isConfirmPasswordInputVisible && confirmPassword === '') ||
    (isUsernameInputVisible && username === '') ||
    email === '' ||
    password === '' ||
    isLoggingIn ||
    isInvalidUsername ||
    isInvalidEmail ||
    isInvalidPassword ||
    isInvalidConfirmPassword;

  useEffect(() => {
    if (username.includes(' ')) {
      _setError(usernameInput, 'Spaces not allowed', false);
      dispatch(setInvalidUsernameStatus(true));
    } else if (username.length < 6 && username.length > 0) {
      _setError(usernameInput, 'At least 6 characters', false);
      dispatch(setInvalidUsernameStatus(true));
    } else {
      dispatch(setUsernameInputError(''));
      dispatch(setInvalidUsernameStatus(false));
    }

    if (
      email.length > 0 &&
      (email.includes(' ') || !email.match(constants.emailRegex))
    ) {
      _setError(emailInput, 'Invalid email', false);
      dispatch(setInvalidEmailStatus(true));
    } else {
      dispatch(setEmailInputError(''));
      dispatch(setInvalidEmailStatus(false));
    }

    if (password.length < 6 && password.length > 0) {
      _setError(passwordInput, 'At least 6 characters', false);
      dispatch(setInvalidPasswordStatus(true));
    } else {
      dispatch(setPasswordInputError(''));
      dispatch(setInvalidPasswordStatus(false));
    }

    if (confirmPassword !== password) {
      if (confirmPassword.length > 0) {
        _setError(confirmPasswordInput, "Passwords don't match", false);
        dispatch(setInvalidConfirmPasswordStatus(true));
      } else {
        dispatch(setConfirmPasswordInputError(''));
      }
    } else {
      dispatch(setConfirmPasswordInputError(''));
      dispatch(setInvalidConfirmPasswordStatus(false));
    }
  }, [dispatch, _setError, confirmPassword, email, password, username]);

  useEffect(() => {
    const heightAnimIn = () => {
      dispatch(setUsernameInputVisibility(false));
      dispatch(setConfirmPasswordInputVisibility(false));
      Animated.timing(heightAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    const heightAnimOut = () => {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        dispatch(setUsernameInputVisibility(true));
        dispatch(setConfirmPasswordInputVisibility(true));
      });
    };

    mode === strings.signIn ? heightAnimIn() : heightAnimOut();
  }, [dispatch, heightAnim, mode]);

  return (
    <Modal
      onBackButtonPress={() =>
        dispatch(toggleSignInSignUpVisibilityFromModal())
      }
      onModalHide={() => dispatch(toggleSignInSignUpVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      style={styles.modalView}
      isVisible={isSignInSignUpVisible}>
      {isForgotPasswordModalVisible && <ForgotPasswordModal />}
      <View style={styles.modalContainer}>
        <Header
          title={mode}
          hideModal={() => dispatch(toggleSignInSignUpVisibilityFromModal())}
        />
        {netInfo.isConnected && netInfo.isInternetReachable ? (
          <View style={styles.mainView}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mainContainer}>
                <Image source={{uri: logo}} style={styles.logo} />
              </View>
              <Animated.View
                style={{
                  height: heightAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [errorMessage.email ? 90 : 75, 0],
                  }),
                }}>
                {isUsernameInputVisible && (
                  <Input
                    ref={usernameInput}
                    inputMode="text"
                    returnKeyType="next"
                    placeholder={strings.username}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faUser}
                        size={18}
                        color={colors.greyDark}
                      />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    inputContainerStyle={[
                      errorMessage.username && {borderColor: colors.red},
                      styles.inputContainer,
                    ]}
                    inputStyle={styles.input}
                    value={username}
                    onChangeText={text => dispatch(setUsername(text))}
                    errorStyle={errorMessage.username && styles.errorMessage}
                    errorMessage={errorMessage.username}
                    onSubmitEditing={() =>
                      isUsernameInputVisible
                        ? emailInput.current.focus()
                        : passwordInput.current.focus()
                    }
                  />
                )}
              </Animated.View>
              <Input
                ref={emailInput}
                inputMode="email"
                returnKeyType="next"
                placeholder={strings.email}
                leftIcon={
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={18}
                    color={colors.greyDark}
                  />
                }
                leftIconContainerStyle={styles.leftIconStyle}
                inputContainerStyle={[
                  errorMessage.email && {borderColor: colors.red},
                  styles.inputContainer,
                ]}
                inputStyle={styles.input}
                value={email}
                onChangeText={text => dispatch(setEmail(text))}
                errorStyle={errorMessage.email && styles.errorMessage}
                errorMessage={errorMessage.email}
                onSubmitEditing={() => passwordInput.current.focus()}
              />
              <Input
                ref={passwordInput}
                inputMode="text"
                returnKeyType="next"
                placeholder={strings.password}
                leftIcon={
                  <FontAwesomeIcon
                    icon={faLock}
                    size={18}
                    color={colors.greyDark}
                  />
                }
                rightIcon={
                  <Pressable
                    onPressIn={() => {
                      if (!isPasswordShown) {
                        dispatch(toggleShowPasswordStatus());
                      }
                    }}
                    onPressOut={() => {
                      if (isPasswordShown) {
                        dispatch(toggleShowPasswordStatus());
                      }
                    }}>
                    <FontAwesomeIcon
                      icon={isPasswordShown ? faEye : faEyeSlash}
                      size={isPasswordShown ? 20 : 22}
                      color={colors.greyDark}
                    />
                  </Pressable>
                }
                leftIconContainerStyle={styles.leftIconStyle}
                rightIconContainerStyle={{
                  paddingRight: (!isPasswordShown && 14) || 15,
                }}
                secureTextEntry={!isPasswordShown}
                inputContainerStyle={[
                  errorMessage.password && {borderColor: colors.red},
                  styles.inputContainer,
                ]}
                inputStyle={styles.input}
                value={password}
                onChangeText={text => dispatch(setPassword(text))}
                errorStyle={errorMessage.password && styles.errorMessage}
                errorMessage={errorMessage.password}
                onSubmitEditing={() =>
                  isConfirmPasswordInputVisible
                    ? confirmPasswordInput.current.focus()
                    : _submit()
                }
              />
              <Animated.View
                style={{
                  height: heightAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [errorMessage.confirmPassword ? 90 : 75, 0],
                  }),
                }}>
                {isConfirmPasswordInputVisible && (
                  <Input
                    ref={confirmPasswordInput}
                    inputMode="text"
                    returnKeyType="go"
                    placeholder={strings.confirmPassword}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faLock}
                        size={18}
                        color={colors.greyDark}
                      />
                    }
                    rightIcon={
                      <Pressable
                        onPressIn={() => {
                          if (!isConfirmPasswordShown) {
                            dispatch(toggleShowConfirmPasswordStatus());
                          }
                        }}
                        onPressOut={() => {
                          if (isConfirmPasswordShown) {
                            dispatch(toggleShowConfirmPasswordStatus());
                          }
                        }}>
                        <FontAwesomeIcon
                          icon={isConfirmPasswordShown ? faEye : faEyeSlash}
                          size={isConfirmPasswordShown ? 20 : 22}
                          color={colors.greyDark}
                        />
                      </Pressable>
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    rightIconContainerStyle={{
                      paddingRight: (!isConfirmPasswordShown && 14) || 15,
                    }}
                    secureTextEntry={!isConfirmPasswordShown}
                    inputContainerStyle={[
                      errorMessage.confirmPassword && {borderColor: colors.red},
                      styles.inputContainer,
                    ]}
                    inputStyle={styles.input}
                    value={confirmPassword}
                    onChangeText={text => dispatch(setConfirmPassword(text))}
                    errorStyle={
                      errorMessage.confirmPassword && styles.errorMessage
                    }
                    errorMessage={errorMessage.confirmPassword}
                    onSubmitEditing={() => _submit()}
                  />
                )}
              </Animated.View>
              {mode === strings.signIn && (
                <View style={styles.forgotPassword}>
                  <Pressable
                    onPress={() => {
                      dispatch(toggleForgotPasswordModalVisibility());
                      dispatch(toggleForgotPasswordModalVisibilityFromModal());
                    }}>
                    <Text style={styles.forgotPasswordText}>
                      {strings.forgotPassword}
                    </Text>
                  </Pressable>
                </View>
              )}
              <Pressable
                style={_isInvalidInput ? styles.buttonDisabled : styles.button}
                disabled={_isInvalidInput}
                onPress={() => _submit()}>
                {isLoggingIn ? (
                  <ActivityIndicator color={colors.white} size="large" />
                ) : (
                  <Text style={styles.buttonText}>{mode}</Text>
                )}
              </Pressable>
              <View style={styles.bottomView}>
                <Text style={styles.bottomText}>
                  {mode === strings.signIn
                    ? strings.dontHaveAccountYet
                    : strings.alreadyHaveAnAccount}
                </Text>
                <Pressable onPress={() => dispatch(toggleMode())}>
                  <Text style={styles.signInSignUpToggle}>
                    {mode === strings.signIn ? strings.signUp : strings.signIn}
                  </Text>
                </Pressable>
              </View>
            </KeyboardAwareScrollView>
          </View>
        ) : (
          <View style={styles.noInternet}>
            <Text style={styles.noInternetText}>No Internet</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default memo(SignInSignUp);
