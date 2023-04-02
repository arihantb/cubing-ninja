import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {faCheck, faEdit, faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {PuzzlePlayer, Text} from '_components';
import {
  addToCompletedAlgorithms,
  removeFromCompletedAlgorithms,
  toggleAlgorithmsModalVisibility,
} from '../redux/algorithmsGridSlice';
import {
  setSelectedAlgorithmIndex,
  toggleAlgorithmsModalVisibilityFromModal,
} from '../redux/algorithmsModalSlice';
import {Icon} from '../../../components';

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
        className={`p-2 ${
          selectedAlgorithmIndex === idx ? 'bg-neutral-900' : 'bg-neutral-700'
        }`}
        onPress={() => dispatch(setSelectedAlgorithmIndex(idx))}>
        <Text
          className={`text-lg ${
            selectedAlgorithmIndex === idx && 'text-indigo-500'
          }`}>
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
      useNativeDriver
      useNativeDriverForBackdrop
      onModalHide={() => dispatch(toggleAlgorithmsModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isAlgorithmsModalVisible}>
      <View className="flex-1 items-center justify-center">
        <View className="w-3/4 rounded-md bg-neutral-50 dark:bg-neutral-800">
          <Text className="m-1 text-lg text-center">
            {selectedAlgorithm.name}
          </Text>
          <View className="h-60">
            <PuzzlePlayer
              puzzle={puzzle}
              alg={selectedAlgorithm.solutions[selectedAlgorithmIndex]}
              mask={props.mask}
            />
          </View>
          <ScrollView
            className={`${
              selectedAlgorithm.scrambles.length > 4 ? 'h-40' : 'h-auto'
            }`}
            showsVerticalScrollIndicator={false}>
            {_renderAlgorithms()}
          </ScrollView>
          <View className="flex-row justify-between m-3">
            <Icon icon={faSyncAlt} color="bg-indigo-500" />
            <Icon icon={faEdit} color="bg-indigo-500" />
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
              <Icon
                icon={faCheck}
                color={
                  completedAlgorithms[props.puzzle][props.category].includes(
                    selectedAlgorithm.id,
                  )
                    ? 'bg-green-500'
                    : 'bg-indigo-500'
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
