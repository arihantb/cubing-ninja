import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import React, {memo, useState} from 'react';
import {Divider} from 'react-native-elements';
import {Image, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {colors} from '_features/theme';
import {
  setAlertType,
  toggleAlertTypeModalVisibility,
} from '../redux/settingsSlice';
import styles from '../styles/alertTypeModalStyle';
import {sound, soundVibrate, vibrate} from '../../../assets/images';

const AlertTypeModal = props => {
  const [visible, setVisible] = useState(true);

  const alertType = useSelector(state => state.timerSettings.alertType);

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={100}
      animationOutTiming={100}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => {
        dispatch(toggleAlertTypeModalVisibility());
        dispatch(setAlertType(alertType));
      }}
      backdropTransitionOutTiming={0}
      isVisible={visible}
      style={{margin: 0}}>
      <View style={[{bottom: props.offset + 310}, styles.modalContainer]}>
        <Pressable
          style={{
            backgroundColor: alertType === 'Sound' ? colors.blue : colors.white,
            width: 150,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(setAlertType('Sound'));
            setVisible(false);
          }}>
          <Image
            source={{uri: sound}}
            style={{
              margin: 10,
              width: 20,
              height: 20,
              tintColor: alertType === 'Sound' ? colors.white : colors.black,
            }}
          />
          <Text
            style={{
              color: alertType === 'Sound' ? colors.white : colors.black,
              fontSize: 18,
            }}>
            Sound
          </Text>
        </Pressable>
        {alertType !== 'Sound' && alertType !== 'Vibrate' && (
          <Divider color={colors.lightgrey} width={1} />
        )}
        <Pressable
          style={{
            backgroundColor:
              alertType === 'Vibrate' ? colors.blue : colors.white,
            width: 150,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(setAlertType('Vibrate'));
            setVisible(false);
          }}>
          <Image
            source={{uri: vibrate}}
            style={{
              margin: 10,
              width: 20,
              height: 20,
              tintColor: alertType === 'Vibrate' ? colors.white : colors.black,
            }}
          />
          <Text
            style={{
              color: alertType === 'Vibrate' ? colors.white : colors.black,
              fontSize: 18,
            }}>
            Vibrate
          </Text>
        </Pressable>
        {alertType !== 'Vibrate' && alertType !== 'Both' && (
          <Divider color={colors.lightgrey} width={1} />
        )}
        <Pressable
          style={{
            backgroundColor: alertType === 'Both' ? colors.blue : colors.white,
            width: 150,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(setAlertType('Both'));
            setVisible(false);
          }}>
          <Image
            source={{uri: soundVibrate}}
            style={{
              margin: 10,
              width: 20,
              height: 20,
              tintColor: alertType === 'Both' ? colors.white : colors.black,
            }}
          />
          <Text
            style={{
              color: alertType === 'Both' ? colors.white : colors.black,
              fontSize: 18,
            }}>
            Both
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

AlertTypeModal.propTypes = {
  visibility: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  alertType: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};

export default memo(AlertTypeModal);
