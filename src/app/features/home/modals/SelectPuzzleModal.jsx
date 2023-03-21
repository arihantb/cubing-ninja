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
import {
  clock,
  fiveByFive,
  fourByFour,
  megaminx,
  pyraminx,
  sevenBySeven,
  sixBySix,
  skewb,
  square1,
  threeByThree,
  twoByTwo,
} from '../../../assets/images';

const data = [
  {
    puzzle: 0,
    name: strings.twoByTwo,
    image: twoByTwo,
  },
  {
    puzzle: 1,
    name: strings.threeByThree,
    image: threeByThree,
  },
  {
    puzzle: 2,
    name: strings.fourByFour,
    image: fourByFour,
  },
  {
    puzzle: 3,
    name: strings.fiveByFive,
    image: fiveByFive,
  },
  {
    puzzle: 4,
    name: strings.sixBySix,
    image: sixBySix,
  },
  {
    puzzle: 5,
    name: strings.sevenBySeven,
    image: sevenBySeven,
  },
  {
    puzzle: 6,
    name: strings.skewb,
    image: skewb,
  },
  {
    puzzle: 7,
    name: strings.megaminx,
    image: megaminx,
  },
  {
    puzzle: 8,
    name: strings.pyraminx,
    image: pyraminx,
  },
  {
    puzzle: 9,
    name: strings.square1,
    image: square1,
  },
  {
    puzzle: 10,
    name: strings.clock,
    image: clock,
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
        <Image style={styles.image} source={{uri: item.image}} />
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
