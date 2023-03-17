import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, View} from 'react-native';
import {faBackspace} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {constants} from '_data/constants';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {toggleEditScrambleModalVisibility} from '../redux/homeSlice';
import {
  addToScrambleText,
  clearScrambleText,
  removeFromScrambleText,
  toggleEditScrambleModalVisibilityFromModal,
} from '../redux/editScrambleModalSlice';
import styles from '../styles/editScrambleModalStyle';

const EditScrambleModal = props => {
  const [innerComponents, setInnerComponents] = useState([]);
  const isEditScrambleModalVisible = useSelector(
    state => state.editScrambleModal.isEditScrambleModalVisible,
  );
  const scrambleText = useSelector(
    state => state.editScrambleModal.scrambleText,
  );

  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  const outerComponents = [];
  const notations = constants.notations[constants.puzzles[puzzle]];
  const suffixes = constants.suffixes;

  const _innerComponentButton = (notation, suffix) => (
    <Button
      key={suffix}
      title={notation + suffix}
      buttonStyle={styles.notationButton}
      onPress={() => dispatch(addToScrambleText({notation, suffix}))}
    />
  );

  const _outerComponentButton = notation => (
    <Button
      key={notation}
      title={notation}
      buttonStyle={styles.notationButton}
      onPress={() => {
        const innerComponentsTemp = [];

        for (let j = 0; j < suffixes.length; j += 6) {
          innerComponentsTemp.push(
            <View key={suffixes[j]} style={styles.row}>
              {suffixes.map(
                (suffix, idx) =>
                  idx >= j &&
                  idx < j + 6 &&
                  _innerComponentButton(notation, suffix),
              )}
            </View>,
          );
        }

        setInnerComponents(innerComponentsTemp);
      }}
    />
  );

  for (let i = 0; i < notations.length; i += 6) {
    outerComponents.push(
      <View key={notations[i]} style={styles.row}>
        {notations.map(
          (notation, idx) =>
            idx >= i && idx < i + 6 && _outerComponentButton(notation),
        )}
      </View>,
    );
  }

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleEditScrambleModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleEditScrambleModalVisibilityFromModal())
      }
      animationInTiming={100}
      animationOutTiming={100}
      onModalHide={() => {
        dispatch(toggleEditScrambleModalVisibility());
        props.setScrambleText(scrambleText.join(' '));
      }}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      backdropTransitionOutTiming={0}
      isVisible={isEditScrambleModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.editScrambleLabel}>
            {strings.enterCustomScramble}
          </Text>
          {scrambleText.length !== 0 && (
            <View style={styles.backspaceView}>
              <Text style={styles.scrambleText}>{scrambleText.join(' ')}</Text>
              <Pressable
                onPress={() => dispatch(removeFromScrambleText(scrambleText))}>
                <FontAwesomeIcon
                  icon={faBackspace}
                  color={colors.darkgrey}
                  size={25}
                />
              </Pressable>
            </View>
          )}
          <View style={styles.notationView}>{innerComponents}</View>
          <View style={styles.notationView}>{outerComponents}</View>
          <View style={styles.buttonView}>
            <Button
              containerStyle={styles.clearButton}
              type="clear"
              title={strings.clear}
              disabled={scrambleText.length === 0}
              titleStyle={styles.clearButtonTitle}
              onPress={() => {
                dispatch(clearScrambleText());
              }}
            />
            <Button
              type="clear"
              title={strings.done}
              disabled={scrambleText.length === 0}
              onPress={() => {
                dispatch(toggleEditScrambleModalVisibilityFromModal());
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(EditScrambleModal);
