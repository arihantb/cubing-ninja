import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {strings} from '_data/strings';
import {setSolvesSortOption} from '../../timer/redux/solvesScreenSlice';
import {toggleSortOptionsModalVisibility} from '../redux/homeSlice';
import {toggleSortOptionsModalVisibilityFromModal} from '../redux/sortOptionsModalSlice';

const SortOptionsModal = () => {
  const isSortOptionsModalVisible = useSelector(
    state => state.sortOptionsModal.isSortOptionsModalVisible,
  );
  const solvesSortOption = useSelector(
    state => state.solvesScreen.solvesSortOption,
  );

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleSortOptionsModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleSortOptionsModalVisibilityFromModal())
      }
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={100}
      animationOutTiming={100}
      onModalHide={() => dispatch(toggleSortOptionsModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isSortOptionsModalVisible}
      className="m-0">
      <View className="absolute top-12 right-12">
        <Pressable
          onPress={() => {
            dispatch(
              setSolvesSortOption({
                sortBy: 'Date',
                sortOrder:
                  solvesSortOption.sortBy === 'Date'
                    ? solvesSortOption.sortOrder === 'Ascending'
                      ? 'Descending'
                      : 'Ascending'
                    : solvesSortOption.sortOrder,
              }),
            );
            dispatch(toggleSortOptionsModalVisibilityFromModal());
          }}>
          <Text
            className={`p-2 text-lg text-center ${
              solvesSortOption.sortBy === 'Date'
                ? 'text-neutral-50'
                : 'text-neutral-900'
            }
            
              ${
                solvesSortOption.sortBy === 'Date'
                  ? 'bg-indigo-500'
                  : 'bg-neutral-50'
              }`}>
            {strings.date}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(
              setSolvesSortOption({
                sortBy: 'Solve Time',
                sortOrder:
                  solvesSortOption.sortBy === 'Solve Time'
                    ? solvesSortOption.sortOrder === 'Ascending'
                      ? 'Descending'
                      : 'Ascending'
                    : solvesSortOption.sortOrder,
              }),
            );
            dispatch(toggleSortOptionsModalVisibilityFromModal());
          }}>
          <Text
            className={`p-2 text-lg text-center ${
              solvesSortOption.sortBy === 'Solve Time'
                ? 'text-neutral-50'
                : 'text-neutral-900'
            }
            
              ${
                solvesSortOption.sortBy === 'Solve Time'
                  ? 'bg-indigo-500'
                  : 'bg-neutral-50'
              }`}>
            {strings.solveTime}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default memo(SortOptionsModal);
