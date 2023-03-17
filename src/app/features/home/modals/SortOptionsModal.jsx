import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {Divider} from 'react-native-elements';
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {setSolvesSortOption} from '../../timer/redux/solvesScreenSlice';
import {toggleSortOptionsModalVisibility} from '../redux/homeSlice';
import {toggleSortOptionsModalVisibilityFromModal} from '../redux/sortOptionsModalSlice';
import styles from '../styles/sortOptionsModalStyle';

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
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleSortOptionsModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isSortOptionsModalVisible}
      style={styles.modal}>
      <View style={styles.mainContainer}>
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
            style={[
              {
                backgroundColor:
                  solvesSortOption.sortBy === 'Date'
                    ? colors.blue
                    : colors.white,
                color:
                  solvesSortOption.sortBy === 'Date'
                    ? colors.white
                    : colors.black,
              },
              styles.sortOptionText,
            ]}>
            {strings.date}
          </Text>
        </Pressable>
        {solvesSortOption.sortBy !== 'Date' &&
          solvesSortOption.sortBy !== 'Solve Time' && (
            <Divider color={colors.lightgrey} width={1} />
          )}
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
            style={[
              {
                backgroundColor:
                  solvesSortOption.sortBy === 'Solve Time'
                    ? colors.blue
                    : colors.white,
                color:
                  solvesSortOption.sortBy === 'Solve Time'
                    ? colors.white
                    : colors.black,
              },
              styles.sortOptionText,
            ]}>
            {strings.solveTime}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default memo(SortOptionsModal);
