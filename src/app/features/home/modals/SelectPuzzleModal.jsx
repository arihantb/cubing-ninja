import React, {memo} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Image, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Text} from '_components';
import {strings} from '_data/strings';
import {setPuzzle, toggleSelectPuzzleModalVisibility} from '../redux/homeSlice';
import {
  setPuzzleFromModal,
  toggleSelectPuzzleModalVisibilityFromModal,
} from '../redux/selectPuzzleModalSlice';
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
import {styled} from 'nativewind';

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
  const puzzle = useSelector(state => state.selectPuzzleModal.puzzle);

  const dispatch = useDispatch();

  const _renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        dispatch(setPuzzleFromModal(item.puzzle));
        dispatch(toggleSelectPuzzleModalVisibilityFromModal());
      }}>
      <View
        className={`p-3 rounded-md items-center ${
          puzzle === item.puzzle ? 'bg-neutral-900' : 'bg-neutral-700'
        }`}>
        <Image className="h-10 w-10" source={{uri: item.image}} />
        <Text
          className={`mt-2 text-lg ${
            puzzle === item.puzzle && 'text-indigo-500'
          }`}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  const StyledFlatGrid = styled(FlatGrid, {
    props: {
      contentContainerStyle: true,
    },
  });

  return (
    <Modal
      onClose={() => dispatch(toggleSelectPuzzleModalVisibilityFromModal())}
      onHide={() => {
        dispatch(setPuzzle(puzzle));
        dispatch(toggleSelectPuzzleModalVisibility());
      }}
      title={strings.selectPuzzle}
      isVisible={isSelectPuzzleModalVisible}>
      <StyledFlatGrid
        contentContainerStyle="flex-1 justify-center"
        centerContent
        data={data}
        renderItem={_renderItem}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </Modal>
  );
};

export default memo(SelectPuzzleModal);
