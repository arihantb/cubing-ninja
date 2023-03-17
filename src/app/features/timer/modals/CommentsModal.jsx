import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {
  setTimerOptions,
  toggleCommentsModalVisibility,
} from '../redux/timerScreenSlice';
import {toggleUpdateSolvesStatus} from '../redux/solvesScreenSlice';
import styles from '../styles/solvesScreenStyle';

const CommentsModal = () => {
  const [visible, setVisible] = useState(true);

  const timerOptions = useSelector(state => state.timerScreen.timerOptions);

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => {
        dispatch(toggleUpdateSolvesStatus());
        dispatch(toggleCommentsModalVisibility());
      }}
      backdropTransitionOutTiming={0}
      isVisible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.selectPuzzleLabel}>{strings.addNotes}</Text>
          <View style={{marginTop: 20, width: 250}}>
            <Input
              inputStyle={{
                fontFamily: 'GoogleSans-Bold',
                fontSize: 18,
                paddingBottom: 0,
              }}
              defaultValue={timerOptions.comments}
              multiline={true}
              onChangeText={val =>
                dispatch(
                  setTimerOptions({
                    id: timerOptions.id,
                    option: 'comments',
                    penalty: timerOptions.penalty,
                    comments: val.trim(),
                  }),
                )
              }
              inputContainerStyle={{
                borderColor: colors.blue,
                borderBottomWidth: 2,
              }}
              containerStyle={{
                maxHeight: 150,
              }}
              placeholder="Notes"
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
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(CommentsModal);
