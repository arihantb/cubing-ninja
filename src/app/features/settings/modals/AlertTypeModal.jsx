import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import React, {memo, useState} from 'react';
import {Divider} from 'react-native-elements';
import {Image, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {
  setAlertType,
  toggleAlertTypeModalVisibility,
} from '../redux/settingsSlice';
import {sound, soundVibrate, vibrate} from '../../../assets/images';
import {useHexColor} from '../../../hooks/useHexColor';

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
      useNativeDriver
      useNativeDriverForBackdrop
      onModalHide={() => {
        dispatch(toggleAlertTypeModalVisibility());
        dispatch(setAlertType(alertType));
      }}
      backdropTransitionOutTiming={0}
      isVisible={visible}
      className="m-0">
      <View style={[{bottom: props.offset + 310}]}>
        <Pressable
          className={`w-36 flex-row items-center ${
            alertType === 'Sound' ? 'bg-indigo-500' : 'bg-neutral-50'
          }`}
          onPress={() => {
            dispatch(setAlertType('Sound'));
            setVisible(false);
          }}>
          <Image
            source={{uri: sound}}
            className="h-5 w-5 m-3"
            style={{
              tintColor: alertType === 'Sound' ? '#FFFFFF' : '#000000',
            }}
          />
          <Text
            style={{
              color: alertType === 'Sound' ? '#FFFFFF' : '#000000',
            }}>
            Sound
          </Text>
        </Pressable>
        {alertType !== 'Sound' && alertType !== 'Vibrate' && (
          <Divider color={useHexColor('bg-neutral-500')} width={1} />
        )}
        <Pressable
          className={`w-36 flex-row items-center ${
            alertType === 'Sound' ? 'bg-indigo-500' : 'bg-neutral-50'
          }`}
          onPress={() => {
            dispatch(setAlertType('Vibrate'));
            setVisible(false);
          }}>
          <Image
            source={{uri: vibrate}}
            className="h-5 w-5 m-3"
            style={{
              tintColor: alertType === 'Vibrate' ? '#FFFFFF' : '#000000',
            }}
          />
          <Text
            style={{
              color: alertType === 'Vibrate' ? '#FFFFFF' : '#000000',
            }}>
            Vibrate
          </Text>
        </Pressable>
        {alertType !== 'Vibrate' && alertType !== 'Both' && (
          <Divider color={useHexColor('bg-neutral-500')} width={1} />
        )}
        <Pressable
          className={`w-36 flex-row items-center ${
            alertType === 'Sound' ? 'bg-indigo-500' : 'bg-neutral-50'
          }`}
          onPress={() => {
            dispatch(setAlertType('Both'));
            setVisible(false);
          }}>
          <Image
            source={{uri: soundVibrate}}
            className="h-5 w-5 m-3"
            style={{
              tintColor: alertType === 'Both' ? '#FFFFFF' : '#000000',
            }}
          />
          <Text
            style={{
              color: alertType === 'Both' ? '#FFFFFF' : '#000000',
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
