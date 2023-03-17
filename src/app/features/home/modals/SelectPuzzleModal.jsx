import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Image, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {setPuzzle, toggleSelectPuzzleModalVisibility} from '../redux/homeSlice';
import {toggleSelectPuzzleModalVisibilityFromModal} from '../redux/selectPuzzleModalSlice';
import styles from '../styles/selectPuzzleModalStyle';

const data = [
  {
    puzzle: 0,
    name: strings.twoByTwo,
    image: require('_assets/images/2x2.png'),
  },
  {
    puzzle: 1,
    name: strings.threeByThree,
    image: require('_assets/images/3x3.png'),
  },
  {
    puzzle: 2,
    name: strings.fourByFour,
    image: require('_assets/images/4x4.png'),
  },
  {
    puzzle: 3,
    name: strings.fiveByFive,
    image: require('_assets/images/5x5.png'),
  },
  {
    puzzle: 4,
    name: strings.sixBySix,
    image: require('_assets/images/6x6.png'),
  },
  {
    puzzle: 5,
    name: strings.sevenBySeven,
    image: require('_assets/images/7x7.png'),
  },
  {
    puzzle: 6,
    name: strings.skewb,
    image: require('_assets/images/skewb.png'),
  },
  {
    puzzle: 7,
    name: strings.megaminx,
    image: require('_assets/images/megaminx.png'),
  },
  {
    puzzle: 8,
    name: strings.pyraminx,
    image: require('_assets/images/pyraminx.png'),
  },
  {
    puzzle: 9,
    name: strings.square1,
    image: require('_assets/images/square-1.png'),
  },
  {
    puzzle: 10,
    name: strings.clock,
    image: require('_assets/images/clock.png'),
  },
];

const SelectPuzzleModal = () => {
  const isSelectPuzzleModalVisible = useSelector(
    state => state.selectPuzzleModal.isSelectPuzzleModalVisible,
  );
  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  const _renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        dispatch(setPuzzle(item.puzzle));
        dispatch(toggleSelectPuzzleModalVisibilityFromModal());
      }}>
      <View
        style={[
          {
            backgroundColor:
              puzzle === item.puzzle ? colors.secondary : colors.secondaryDark,
          },
          styles.puzzleView,
        ]}>
        <Image style={styles.image} source={item.image} />
        <Text
          style={[
            {color: puzzle === item.puzzle ? colors.greyLight : colors.grey},
            styles.puzzleLabel,
          ]}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(toggleSelectPuzzleModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(toggleSelectPuzzleModalVisibilityFromModal())
      }
      useNativeDriver={true}
      animationInTiming={100}
      animationOutTiming={100}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleSelectPuzzleModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={isSelectPuzzleModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.selectPuzzleLabel}>{strings.selectPuzzle}</Text>
          <FlatGrid
            itemDimension={70}
            centerContent={true}
            style={styles.grid}
            itemContainerStyle={styles.itemContainer}
            data={data}
            renderItem={_renderItem}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(SelectPuzzleModal);
