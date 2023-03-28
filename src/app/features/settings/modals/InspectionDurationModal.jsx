import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '_components';
import {strings} from '_data/strings';
import {constants} from '_data/constants';
import {
  setInspectionDuration,
  toggleInspectionDurationModalVisibility,
} from '../redux/settingsSlice';

const InspectionDurationModal = props => {
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(false);

  const inspectionDuration = useSelector(
    state => state.timerSettingsReducer.inspectionDuration,
  );

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      useNativeDriver
      useNativeDriverForBackdrop
      onModalHide={() => dispatch(toggleInspectionDurationModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={visible}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: '#D2D2D2', borderRadius: 5}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              marginTop: 10,
              alignSelf: 'center',
            }}>
            {strings.inspectionDuration}
          </Text>
          <View style={{marginTop: 20, width: 250}}>
            <Input
              inputStyle={{
                fontFamily: 'GoogleSans-Bold',
                fontSize: 18,
                paddingBottom: 0,
              }}
              placeholder="1-999 seconds"
              defaultValue={inspectionDuration}
              onChangeText={val => {
                if (/^\d+$/.test(val)) {
                  setError(false);
                  parseInt(val) < 1000 && parseInt(val) > 0
                    ? setError(false)
                    : setError(true);
                } else setError(true);
                error && dispatch(setInspectionDuration(parseInt(val)));
              }}
              inputContainerStyle={{
                borderColor: error ? '#FF0000' : '#0000FF',
                borderBottomWidth: 2,
              }}
              errorStyle={{
                display: error ? 'flex' : 'none',
                fontFamily: 'GoogleSans-Bold',
              }}
              errorMessage="Please enter a valid duration"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 10,
            }}>
            <Button
              type="clear"
              title={strings.done}
              titleStyle={{fontFamily: 'GoogleSans-Bold'}}
              disabled={inspectionDuration === constants.emptyString || error}
              onPress={() => {
                setVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(InspectionDurationModal);
