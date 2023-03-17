import Modal from 'react-native-modal';
import React, {memo, useCallback, useState} from 'react';
import {Avatar, Button, Input} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, View} from 'react-native';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '_components';
import {colors} from '_features/theme';
import {strings} from '_data/strings';
import {
  setEmail,
  setFirstName,
  setHeaderImage,
  setLastName,
  setProfilePicture,
  toggleEditProfileSubmitVisibility,
  toggleEditProfileVisibility,
} from '../redux/navigationDrawerSlice';
import styles from '../styles/editProfileStyle';

const EditProfile = () => {
  const email = useSelector(state => state.navigationDrawer.email);
  const firstName = useSelector(state => state.navigationDrawer.firstName);
  const isEditProfileVisible = useSelector(
    state => state.navigationDrawer.isEditProfileVisible,
  );
  const lastName = useSelector(state => state.navigationDrawer.lastName);
  const profilePicture = useSelector(
    state => state.navigationDrawer.profilePicture,
  );

  const [visible, setVisible] = useState(true);
  const [firstNameTemp, setFirstNameTemp] = useState(firstName);
  const [lastNameTemp, setLastNameTemp] = useState(lastName);
  const [emailTemp, setEmailTemp] = useState(email);

  const dispatch = useDispatch();

  const avatarPickerCallback = useCallback(response => {
    if (!response.didCancel) setProfilePicture(response.assets[0].uri);
  }, []);

  const headerPickerCallback = useCallback(response => {
    if (!response.didCancel) setHeaderImage(response.assets[0].uri);
  }, []);

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onModalHide={() => dispatch(toggleEditProfileVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      style={styles.modalView}
      isVisible={visible}>
      <View style={styles.modalContainer}>
        <Header
          title={strings.profile}
          setVisible={setVisible}
          right={
            isEditProfileVisible && (
              <Pressable
                onPress={() => {
                  dispatch(setFirstName(firstNameTemp));
                  dispatch(setLastName(lastNameTemp));
                  dispatch(setEmail(emailTemp));
                  setVisible(false);
                }}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color={colors.white}
                  size={20}
                />
              </Pressable>
            )
          }
        />
        <View style={styles.headerView}>
          <Pressable
            style={styles.avatar}
            onPress={() => launchImageLibrary({}, avatarPickerCallback)}>
            <Avatar
              rounded={true}
              size={100}
              icon={{
                name: 'user',
                type: 'font-awesome',
                color: colors.blue,
              }}
              source={{uri: profilePicture}}
              overlayContainerStyle={styles.avatarBackground}>
              <Avatar.Accessory size={25} style={styles.avatarPencil} />
            </Avatar>
          </Pressable>
          <View style={styles.editingView}>
            <View style={styles.row}>
              <View style={styles.flex}>
                <Input
                  placeholder={strings.firstName}
                  defaultValue={firstName}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  onChangeText={text => {
                    setFirstNameTemp(text);
                    text === firstName &&
                      dispatch(toggleEditProfileSubmitVisibility());
                  }}
                />
              </View>
              <View style={styles.flex}>
                <Input
                  placeholder={strings.lastName}
                  defaultValue={lastName}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  onChangeText={text => {
                    setLastNameTemp(text);
                    text === lastName &&
                      dispatch(toggleEditProfileSubmitVisibility());
                  }}
                />
              </View>
            </View>
            <Input
              placeholder={strings.email}
              defaultValue={email}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={text => {
                setEmailTemp(text);
                text === email && dispatch(toggleEditProfileSubmitVisibility());
              }}
            />
            <Button
              type="clear"
              title={strings.changePassword}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(EditProfile);
