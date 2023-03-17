import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ScrollView, Pressable, View} from 'react-native';
import {faCheck, faEdit, faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {PuzzlePlayer, Text} from '_components';
import {colors} from '_features/theme';
import {
  addToCompletedPatterns,
  removeFromCompletedPatterns,
  togglePatternsModalVisibility,
} from '../redux/patternsGridSlice';
import {
  setSelectedPatternIndex,
  togglePatternsModalVisibilityFromModal,
} from '../redux/patternsModalSlice';
import styles from '../styles/patternsModalStyle';

const PatternsModal = props => {
  const completedPatterns = useSelector(
    state => state.patternsGrid.completedPatterns,
  );
  const isPatternsModalVisible = useSelector(
    state => state.patternsModal.isPatternsModalVisible,
  );
  const selectedPatternIndex = useSelector(
    state => state.patternsModal.selectedPatternIndex,
  );
  const selectedPattern = useSelector(
    state => state.patternsGrid.selectedPattern,
  );
  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  const _renderPatterns = () =>
    selectedPattern.algorithms.map((algorithm, idx) => (
      <Pressable
        key={idx}
        style={[
          {
            backgroundColor:
              selectedPatternIndex === idx ? colors.primary : colors.secondary,
          },
          styles.patternView,
        ]}
        onPress={() => dispatch(setSelectedPatternIndex(idx))}>
        <Text
          style={[
            {color: selectedPatternIndex === idx && colors.blue},
            styles.patternText,
          ]}>
          {algorithm}
        </Text>
      </Pressable>
    ));

  return (
    <Modal
      onBackdropPress={() => dispatch(togglePatternsModalVisibilityFromModal())}
      onBackButtonPress={() =>
        dispatch(togglePatternsModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(togglePatternsModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isPatternsModalVisible}>
      <View style={styles.backdrop}>
        <View style={styles.mainContainer}>
          <Text style={styles.patternNameText}>{selectedPattern.name}</Text>
          <Divider colors={colors.grey} />
          <View style={styles.puzzlePlayerView}>
            <PuzzlePlayer
              puzzle={puzzle}
              alg={selectedPattern.algorithms[selectedPatternIndex]}
              setupAlg="x2 y2"
            />
          </View>
          <ScrollView
            style={{
              height: (selectedPattern.algorithms.length > 4 && 150) || 'auto',
            }}
            showsVerticalScrollIndicator={false}>
            {_renderPatterns()}
          </ScrollView>
          <Divider color={colors.grey} />
          <View style={styles.bottomIconsView}>
            <Pressable
              onPress={() =>
                completedPatterns[props.puzzle].includes(selectedPattern.id)
                  ? dispatch(
                      removeFromCompletedPatterns({
                        puzzle: props.puzzle,
                        index: selectedPattern.id,
                      }),
                    )
                  : dispatch(
                      addToCompletedPatterns({
                        puzzle: props.puzzle,
                        index: selectedPattern.id,
                      }),
                    )
              }>
              <FontAwesomeIcon
                icon={faCheck}
                color={
                  completedPatterns[props.puzzle].includes(selectedPattern.id)
                    ? colors.green
                    : colors.gray
                }
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(PatternsModal);
