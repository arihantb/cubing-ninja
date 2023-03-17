import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {Image, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {Header, Text} from '_components';
import {constants} from '_data/constants';
import {strings} from '_data/strings';
import {toggleSignInSignUpVisibility} from '../redux/navigationDrawerSlice';
import styles from '../styles/signInSignUpStyle';

const SignInSignUp = props => {
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState('Sign In');
  const [screen, setScreen] = useState(0);
  const [firstName, setFirstName] = useState(constants.emptyString);
  const [lastName, setLastName] = useState(constants.emptyString);
  const [email, setEmail] = useState(constants.emptyString);
  const [password, setPassword] = useState(constants.emptyString);

  const dispatch = useDispatch();

  // const storeUserSession = async () => {
  //   try {
  //     await EncryptedStorage.setItem(
  //       'userSession',
  //       JSON.stringify({
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //         password: password,
  //       }),
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const screens = [
    <View key={'signInScreen'} style={styles.mainView}>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <Image
            source={require('_assets/images/logo.png')}
            style={styles.logo}
          />
          <Input
            placeholder={strings.email}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onSubmitEditing={({nativeEvent: {text}}) => {
              setEmail(text);
            }}
          />
          <Input
            placeholder={strings.password}
            secureTextEntry={true}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onSubmitEditing={({nativeEvent: {text}}) => {
              setPassword(text);
            }}
          />
        </View>
        <Button
          title={strings.signIn}
          buttonStyle={styles.button}
          onPress={() => {
            // storeUserSession();
            setVisible(false);
          }}
        />
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>{strings.dontHaveAccountYet}</Text>
          <Button
            title={strings.signUp}
            type="clear"
            TouchableComponent={''}
            onPress={() => {
              setTitle(strings.signUp);
              setScreen(1);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>,
    <View key={'signUpScreen'} style={styles.mainView}>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <Image
            source={require('_assets/images/logo.png')}
            style={styles.logo}
          />
          <View style={styles.row}>
            <View style={styles.flex}>
              <Input
                placeholder={strings.firstName}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onSubmitEditing={({nativeEvent: {text}}) => {
                  setFirstName(text);
                }}
              />
            </View>
            <View style={styles.flex}>
              <Input
                placeholder={strings.lastName}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onSubmitEditing={({nativeEvent: {text}}) => {
                  setLastName(text);
                }}
              />
            </View>
          </View>
          <Input
            placeholder={strings.email}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onSubmitEditing={({nativeEvent: {text}}) => {
              setEmail(text);
            }}
          />
          <Input
            placeholder={strings.password}
            secureTextEntry={true}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onSubmitEditing={({nativeEvent: {text}}) => {
              setPassword(text);
            }}
          />
          <Input
            placeholder={strings.confirmPassword}
            secureTextEntry={true}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
        </View>
        <Button
          title={strings.signUp}
          buttonStyle={styles.signUpButton}
          onPress={() => {
            // storeUserSession();
            setVisible(false);
          }}
        />
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>{strings.alreadyHaveAnAccount}</Text>
          <Button
            title={strings.signIn}
            type="clear"
            onPress={() => {
              setTitle(strings.signIn);
              setScreen(0);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>,
  ];

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onModalHide={() => dispatch(toggleSignInSignUpVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      style={styles.modalView}
      isVisible={visible}>
      <View style={styles.modalContainer}>
        <Header title={title} hideModal={setVisible} />
        {screens[screen]}
      </View>
    </Modal>
  );
};

export default memo(SignInSignUp);
