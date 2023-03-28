import React, {memo, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Pressable, View} from 'react-native';
import {faStickyNote} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Icon, ImageMessage, Text} from '_components';
import {strings} from '_data/strings';
import {loadFromLocalStorage, saveToLocalStorage} from '_libs';
import SolvesModal from '../modals/SolvesModal';
import {toggleDeleteHeaderIconVisibility} from '_features/home/redux/homeSlice';
import {
  updateSelectedSolves,
  setSolveData,
  setSolves,
  setSearchSolves,
  toggleSolvesModalVisibility,
  toggleSolvesSelectionMode,
  toggleSolvesSortedStatus,
} from '../redux/solvesScreenSlice';

const SolvesScreen = () => {
  const areSolvesSorted = useSelector(
    state => state.solvesScreen.areSolvesSorted,
  );
  const isDeleteHeaderIconVisible = useSelector(
    state => state.home.isDeleteHeaderIconVisible,
  );
  const isInSolvesSelectionMode = useSelector(
    state => state.solvesScreen.isInSolvesSelectionMode,
  );
  const isSolvesModalVisible = useSelector(
    state => state.solvesScreen.isSolvesModalVisible,
  );
  const puzzle = useSelector(state => state.home.puzzle);
  const searchText = useSelector(state => state.solvesScreen.searchText);
  const searchSolves = useSelector(state => state.solvesScreen.searchSolves);
  const selectedSolves = useSelector(
    state => state.solvesScreen.selectedSolves,
  );
  const solves = useSelector(state => state.solvesScreen.solves);

  const dispatch = useDispatch();

  const _loadSolves = async () => {
    const solvesFromStorage = await loadFromLocalStorage(`solves/${puzzle}`);
    if (solvesFromStorage !== null) {
      dispatch(setSolves(solvesFromStorage));
      return solvesFromStorage;
    }
    dispatch(setSolves([]));
    return [];
  };

  const _deleteSolve = id => {
    const solvesCopy = [...solves];
    solves.forEach((val, idx) => val.id === id && solvesCopy.splice(idx, 1));
    dispatch(setSolves(solvesCopy));
  };

  useEffect(() => {
    const solvesCopy = [...solves];

    solves.forEach(val => {
      if (
        val.comments === '' ||
        !val.comments.toLowerCase().includes(searchText.toLowerCase())
      ) {
        solvesCopy.splice(solvesCopy.indexOf(val), 1);
      }
    });

    dispatch(setSearchSolves(solvesCopy));
  }, [searchText]);

  if (!areSolvesSorted) {
    dispatch(toggleSolvesSortedStatus());
  }

  useEffect(() => {
    if (solves.length !== 0 && searchText === '') {
      saveToLocalStorage(`solves/${puzzle}`, solves);
    }
  }, [searchText, solves]);

  useEffect(() => {
    if (
      (isDeleteHeaderIconVisible &&
        isInSolvesSelectionMode &&
        selectedSolves.length === 0) ||
      (!isDeleteHeaderIconVisible && selectedSolves.length > 0)
    ) {
      dispatch(toggleDeleteHeaderIconVisibility());
      dispatch(toggleSolvesSelectionMode());
    }
  }, [selectedSolves]);

  useEffect(() => {
    _loadSolves();
  }, [puzzle]);

  const _renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          if (!isInSolvesSelectionMode) {
            dispatch(
              setSolveData({
                id: item.id,
                time: item.time,
                date: item.date,
                scrambleText: item.scrambleText,
                scrambleImage: item.scrambleImage,
                penalty: item.penalty,
                comments: item.comments,
                penalizedTime: item.penalizedTime,
              }),
            );
            dispatch(toggleSolvesModalVisibility());
          } else {
            dispatch(updateSelectedSolves(item.id));
          }
        }}
        delayLongPress={300}
        onLongPress={() => dispatch(updateSelectedSolves(item.id))}>
        <Card
          title={item.penalty === 'DNF' ? 'DNF' : item.penalizedTime}
          titleStyle="text-sm"
          cardStyle={`items-center w-20 ${
            selectedSolves.indexOf(item.id) === -1
              ? 'bg-neutral-300 dark:bg-neutral-800'
              : 'bg-neutral-400 dark:bg-neutral-700'
          }`}
        />
        <Text className="absolute left-1 top-1">
          {new Date(item.date).getDate() +
            '/' +
            (new Date(item.date).getMonth() + 1)}
        </Text>
        {item.penalty === '+2' && (
          <Text className="absolute right-1 top-1">+2</Text>
        )}
        {item.comments !== '' && (
          <Icon
            icon={faStickyNote}
            color="bg-neutral-50"
            size={10}
            className="absolute left-1 bottom-1"
          />
        )}
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      {isSolvesModalVisible && <SolvesModal deleteSolve={_deleteSolve} />}
      {solves.length === 0 ? (
        searchText !== '' ? (
          <ImageMessage message={'No Results!'} />
        ) : (
          <ImageMessage message={strings.noSolves} />
        )
      ) : (
        <FlatGrid
          data={searchText === '' ? solves : searchSolves}
          extraData={[isInSolvesSelectionMode, selectedSolves]}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          itemContainerStyle={{alignItems: 'center'}}
          itemDimension={100}
          removeClippedSubviews
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default memo(SolvesScreen);
