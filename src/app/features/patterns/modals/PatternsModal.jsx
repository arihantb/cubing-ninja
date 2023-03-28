import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Divider} from 'react-native-elements';
import {ScrollView, Pressable, View} from 'react-native';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {PuzzlePlayer, Text} from '_components';
import {
  addToCompletedPatterns,
  removeFromCompletedPatterns,
  togglePatternsModalVisibility,
} from '../redux/patternsGridSlice';
import {
  setSelectedPatternIndex,
  togglePatternsModalVisibilityFromModal,
} from '../redux/patternsModalSlice';
import {useHexColor} from '../../../hooks/useHexColor';
import {Icon} from '../../../components';

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
        className={`p-3 ${
          selectedPatternIndex === idx
            ? 'bg-neutral-100 dark:bg-neutral-800'
            : 'bg-neutral-200 dark:bg-neutral-700'
        }`}
        onPress={() => dispatch(setSelectedPatternIndex(idx))}>
        <Text className={selectedPatternIndex === idx && 'bg-indigo-500'}>
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
      useNativeDriver
      useNativeDriverForBackdrop
      onModalHide={() => dispatch(togglePatternsModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isPatternsModalVisible}>
      <View className="flex-1 items-center justify-center">
        <View className="w-3/4 rounded-md">
          <Text className="m-3 text-center">{selectedPattern.name}</Text>
          <Divider colors={useHexColor('bg-neutral-50')} />
          <View className="h-80">
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
          <Divider color={useHexColor('bg-neutral-50')} />
          <View className="flex-row mx-5 my-3 justify-end">
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
              <Icon
                icon={faCheck}
                color={
                  completedPatterns[props.puzzle].includes(selectedPattern.id)
                    ? 'bg-green-500'
                    : 'bg-neutral-400'
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
