import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, ScrollView, View} from 'react-native';
import {faCheck, faEdit, faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {PuzzlePlayer, Text} from '_components';
import {colors} from '_features/theme';
import {
  addToCompletedAlgorithms,
  removeFromCompletedAlgorithms,
  toggleAlgorithmsModalVisibility,
} from '../redux/algorithmsGridSlice';
import {
  setSelectedAlgorithmIndex,
  toggleAlgorithmsModalVisibilityFromModal,
} from '../redux/algorithmsModalSlice';
import styles from '../styles/algorithmsModalStyle';

const AlgorithmsModal = props => {
  const completedAlgorithms = useSelector(
    state => state.algorithmsGrid.completedAlgorithms,
  );
  const isAlgorithmsModalVisible = useSelector(
    state => state.algorithmsModal.isAlgorithmsModalVisible,
  );
  const selectedAlgorithmIndex = useSelector(
    state => state.algorithmsModal.selectedAlgorithmIndex,
  );
  const selectedAlgorithm = useSelector(
    state => state.algorithmsGrid.selectedAlgorithm,
  );
  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  const _renderAlgorithms = () =>
    selectedAlgorithm.scrambles.map((algorithm, idx) => (
      <Pressable
        key={idx}
        style={[
          {
            backgroundColor:
              selectedAlgorithmIndex === idx
                ? colors.primary
                : colors.secondary,
          },
          styles.algorithmView,
        ]}
        onPress={() => dispatch(setSelectedAlgorithmIndex(idx))}>
        <Text
          style={[
            {color: selectedAlgorithmIndex === idx && colors.blue},
            styles.algorithmText,
          ]}>
          {algorithm}
        </Text>
      </Pressable>
    ));

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleAlgorithmsModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleAlgorithmsModalVisibilityFromModal())
      }
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleAlgorithmsModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isAlgorithmsModalVisible}>
      <View style={styles.backdrop}>
        <View style={styles.mainContainer}>
          <Text style={styles.algorithmNameText}>{selectedAlgorithm.name}</Text>
          <Divider color={colors.grey} />
          <View style={styles.puzzlePlayerView}>
            <PuzzlePlayer
              puzzle={puzzle}
              alg={selectedAlgorithm.solutions[selectedAlgorithmIndex]}
              mask={props.mask}
              setupAlg="x2 y2"
            />
          </View>
          <ScrollView
            style={{
              height: (selectedAlgorithm.scrambles.length > 4 && 150) || 'auto',
            }}
            showsVerticalScrollIndicator={false}>
            {_renderAlgorithms()}
          </ScrollView>
          <Divider color={colors.grey} />
          <View style={styles.bottomIconsView}>
            <FontAwesomeIcon icon={faSyncAlt} color={colors.grey} />
            <FontAwesomeIcon icon={faEdit} color={colors.grey} />
            <Pressable
              onPress={() =>
                completedAlgorithms[props.puzzle][props.category].includes(
                  selectedAlgorithm.id,
                )
                  ? dispatch(
                      removeFromCompletedAlgorithms({
                        puzzle: props.puzzle,
                        category: props.category,
                        index: selectedAlgorithm.id,
                      }),
                    )
                  : dispatch(
                      addToCompletedAlgorithms({
                        puzzle: props.puzzle,
                        category: props.category,
                        index: selectedAlgorithm.id,
                      }),
                    )
              }>
              <FontAwesomeIcon
                icon={faCheck}
                color={
                  completedAlgorithms[props.puzzle][props.category].includes(
                    selectedAlgorithm.id,
                  )
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

export default memo(AlgorithmsModal);
