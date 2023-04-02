import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Dimensions, Image, Pressable, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Input, Loading, Text} from '_components';
import {strings} from '_data/strings';
import {
  setLoggedInStatus,
  toggleSignInSignUpVisibility,
} from '../redux/navigationDrawerSlice';
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
import {Icon} from '../../../components';
import {AnimatePresence, View as MotiView} from 'moti';
import {
  Layout,
  SlideInLeft,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

const SignInSignUp = () => {
  const netInfo = useNetInfo();

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
    dispatch(setUsernameInputVisibility(mode === strings.signUp));
    dispatch(setConfirmPasswordInputVisibility(mode === strings.signUp));
  }, [dispatch, mode]);

  return (
    <Modal
      onBackButtonPress={() =>
        dispatch(toggleSignInSignUpVisibilityFromModal())
      }
      onModalHide={() => dispatch(toggleSignInSignUpVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      className="m-0"
      isVisible={isSignInSignUpVisible}>
      {isForgotPasswordModalVisible && <ForgotPasswordModal />}
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
        <Header
          title={mode}
          onClose={() => dispatch(toggleSignInSignUpVisibilityFromModal())}
        />
        {netInfo.isConnected && netInfo.isInternetReachable ? (
          <KeyboardAwareScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View className="m-10 items-center">
              <Image source={{uri: logo}} className="h-24 w-24 rounded-md" />
            </View>
            <View className="flex-1">
              <View className="flex-1">
                <View className="p-4 gap-4">
                  <View className="flex-1">
                    <AnimatePresence>
                      {isUsernameInputVisible && (
                        <MotiView
                          className="flex-1"
                          from={{translateX: -Dimensions.get('window').width}}
                          animate={{translateX: 0}}
                          exit={{translateX: Dimensions.get('window').width}}
                          layout={Layout}
                          transition={{type: 'timing'}}>
                          <Input
                            ref={usernameInput}
                            inputMode="text"
                            returnKeyType="next"
                            placeholder={strings.username}
                            leftIcon={faUser}
                            value={username}
                            onChangeText={text => dispatch(setUsername(text))}
                            errorMessage={errorMessage.username}
                            onSubmitEditing={() =>
                              isUsernameInputVisible
                                ? emailInput.current.focus()
                                : passwordInput.current.focus()
                            }
                          />
                        </MotiView>
                      )}
                    </AnimatePresence>
                  </View>
                  <MotiView
                    className="flex-1"
                    from={{translateX: -Dimensions.get('window').width}}
                    animate={{translateX: 0}}
                    exit={{translateX: Dimensions.get('window').width}}
                    layout={Layout}
                    transition={{type: 'timing'}}>
                    <Input
                      ref={emailInput}
                      inputMode="email"
                      returnKeyType="next"
                      placeholder={strings.email}
                      leftIcon={faEnvelope}
                      value={email}
                      onChangeText={text => dispatch(setEmail(text))}
                      errorMessage={errorMessage.email}
                      onSubmitEditing={() => passwordInput.current.focus()}
                    />
                  </MotiView>
                  <MotiView
                    className="flex-1"
                    from={{translateX: -Dimensions.get('window').width}}
                    animate={{translateX: 0}}
                    exit={{translateX: Dimensions.get('window').width}}
                    layout={Layout}
                    transition={{type: 'timing'}}>
                    <Input
                      ref={passwordInput}
                      inputMode="text"
                      returnKeyType="next"
                      placeholder={strings.password}
                      leftIcon={faLock}
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
                          <Icon
                            icon={isPasswordShown ? faEye : faEyeSlash}
                            size={isPasswordShown ? 20 : 22}
                            color="bg-neutral-400"
                          />
                        </Pressable>
                      }
                      secureTextEntry={!isPasswordShown}
                      value={password}
                      onChangeText={text => dispatch(setPassword(text))}
                      errorMessage={errorMessage.password}
                      onSubmitEditing={() =>
                        isConfirmPasswordInputVisible
                          ? confirmPasswordInput.current.focus()
                          : _submit()
                      }
                    />
                  </MotiView>
                  <View className="flex-1">
                    <AnimatePresence>
                      {isConfirmPasswordInputVisible && (
                        <MotiView
                          className="flex-1"
                          from={{translateX: -Dimensions.get('window').width}}
                          animate={{translateX: 0}}
                          exit={{translateX: Dimensions.get('window').width}}
                          layout={Layout}
                          transition={{type: 'timing'}}>
                          <Input
                            ref={confirmPasswordInput}
                            inputMode="text"
                            returnKeyType="go"
                            placeholder={strings.confirmPassword}
                            leftIcon={faLock}
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
                                <Icon
                                  icon={
                                    isConfirmPasswordShown ? faEye : faEyeSlash
                                  }
                                  size={isConfirmPasswordShown ? 20 : 22}
                                  color="bg-neutral-400"
                                />
                              </Pressable>
                            }
                            secureTextEntry={!isConfirmPasswordShown}
                            value={confirmPassword}
                            onChangeText={text =>
                              dispatch(setConfirmPassword(text))
                            }
                            errorMessage={errorMessage.confirmPassword}
                            onSubmitEditing={() => _submit()}
                          />
                        </MotiView>
                      )}
                    </AnimatePresence>
                  </View>
                  <View className="flex-1">
                    {mode === strings.signIn && (
                      <MotiView
                        className="flex-1 items-end"
                        from={{translateX: Dimensions.get('window').width}}
                        animate={{translateX: 0}}
                        exit={{translateX: Dimensions.get('window').width}}
                        transition={{type: 'timing', delay: 400}}>
                        <Pressable
                          onPress={() => {
                            dispatch(toggleForgotPasswordModalVisibility());
                            dispatch(
                              toggleForgotPasswordModalVisibilityFromModal(),
                            );
                          }}>
                          <Text>{strings.forgotPassword}</Text>
                        </Pressable>
                      </MotiView>
                    )}
                  </View>
                </View>
              </View>
              <View className="flex-1 mb-20 justify-end">
                <Pressable
                  className={`m-4 p-4 rounded-md items-center justify-center ${
                    _isInvalidInput ? 'bg-indigo-300' : 'bg-indigo-500'
                  }`}
                  disabled={_isInvalidInput}
                  onPress={() => _submit()}>
                  {isLoggingIn ? (
                    <Loading color="bg-indigo-500" />
                  ) : (
                    <Text className="text-lg text-neutral-50">{mode}</Text>
                  )}
                </Pressable>
                <View className="flex-row gap-2 items-center justify-center">
                  <Text>
                    {mode === strings.signIn
                      ? strings.dontHaveAccountYet
                      : strings.alreadyHaveAnAccount}
                  </Text>
                  <Pressable
                    onPress={() => {
                      dispatch(setUsernameInputError(''));
                      dispatch(setEmailInputError(''));
                      dispatch(setPasswordInputError(''));
                      dispatch(setConfirmPasswordInputError(''));
                      dispatch(toggleMode());
                    }}>
                    <Text className="text-indigo-500">
                      {mode === strings.signIn
                        ? strings.signUp
                        : strings.signIn}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        ) : (
          <Text className="w-full p-2 text-lg text-neutral-50 bg-red-500 text-center">
            No Internet
          </Text>
        )}
      </View>
    </Modal>
  );
};

export default memo(SignInSignUp);
