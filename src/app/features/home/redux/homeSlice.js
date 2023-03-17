import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  drawerItemIndex: 0,
  isDeleteHeaderIconVisible: false,
  isEditScrambleModalVisible: false,
  isManualMode: false,
  isSearchBarVisible: false,
  isSelectAlgorithmsVisible: false,
  isSelectPuzzleModalVisible: false,
  isSolvesScreenHeaderIconsVisible: false,
  isSortOptionsModalVisible: false,
  puzzle: 1,
  scrambleData: {
    scrambleText: '',
    scrambleImage: '',
    scrambleLoading: false,
  },
  sortOrder: 'Descending',
  timerScreenHeaderIconIndex: 0,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setDrawerItemIndex: (state, action) => {
      state.drawerItemIndex = action.payload;
    },
    toggleDeleteHeaderIconVisibility: state => {
      state.isDeleteHeaderIconVisible = !state.isDeleteHeaderIconVisible;
    },
    toggleEditScrambleModalVisibility: state => {
      state.isEditScrambleModalVisible = !state.isEditScrambleModalVisible;
    },
    toggleSearchBarVisibility: state => {
      state.isSearchBarVisible = !state.isSearchBarVisible;
    },
    toggleSelectAlgorithmsVisibility: state => {
      state.isSelectAlgorithmsVisible = !state.isSelectAlgorithmsVisible;
    },
    toggleSelectPuzzleModalVisibility: state => {
      state.isSelectPuzzleModalVisible = !state.isSelectPuzzleModalVisible;
    },
    toggleSolvesScreenHeaderIconsVisibility: state => {
      state.isSolvesScreenHeaderIconsVisible =
        !state.isSolvesScreenHeaderIconsVisible;
    },
    toggleSortOptionsModalVisibility: state => {
      state.isSortOptionsModalVisible = !state.isSortOptionsModalVisible;
    },
    setPuzzle: (state, action) => {
      state.puzzle = action.payload;
    },
    setScrambleData: (state, action) => {
      state.scrambleData = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setTimerScreenHeaderIconIndex: (state, action) => {
      state.timerScreenHeaderIconIndex = action.payload;
    },
  },
});

export const {
  setDrawerItemIndex,
  toggleDeleteHeaderIconVisibility,
  toggleEditScrambleModalVisibility,
  toggleSearchBarVisibility,
  toggleSelectAlgorithmsVisibility,
  toggleSelectPuzzleModalVisibility,
  toggleSolvesScreenHeaderIconsVisibility,
  toggleSortOptionsModalVisibility,
  setPuzzle,
  setScrambleData,
  setSortOrder,
  setTimerScreenHeaderIconIndex,
} = homeSlice.actions;

export default homeSlice.reducer;
