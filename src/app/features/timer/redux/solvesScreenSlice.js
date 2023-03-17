import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  areSolvesSorted: true,
  isInSolvesSelectionMode: false,
  isSolvesModalVisible: false,
  isSortOptionModalVisible: false,
  searchText: '',
  selectedSolves: [],
  shouldDeleteSolves: false,
  shouldUpdateSolves: false,
  solveData: {
    id: '',
    date: '',
    time: '',
    scrambleText: '',
    scrambleImage: '',
    penalty: '',
    penalizedTime: '',
    comments: '',
  },
  solves: [],
  searchSolves: [],
  solvesSortOption: {
    sortBy: 'Date',
    sortOrder: 'Ascending',
  },
};

const sortSolves = state => {
  if (state.solvesSortOption.sortBy === 'Solve Time') {
    state.solvesSortOption.sortOrder === 'Ascending'
      ? state.solves.sort((a, b) => a.time - b.time)
      : state.solves.sort((a, b) => b.time - a.time);
  } else if (state.solvesSortOption.sortBy === 'Date') {
    state.solvesSortOption.sortOrder === 'Ascending'
      ? state.solves.sort((a, b) => new Date(a.date) - new Date(b.date))
      : state.solves.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

export const solvesScreenSlice = createSlice({
  name: 'solvesScreen',
  initialState,
  reducers: {
    toggleSolvesSortedStatus: state => {
      state.areSolvesSorted = !state.areSolvesSorted;
    },
    toggleSolvesSelectionMode: state => {
      state.isInSolvesSelectionMode = !state.isInSolvesSelectionMode;
    },
    toggleSolvesModalVisibility: state => {
      state.isSolvesModalVisible = !state.isSolvesModalVisible;
    },
    toggleSortOptionModalVisibility: state => {
      state.isSortOptionModalVisible = !state.isSortOptionModalVisible;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedSolves: (state, action) => {
      state.selectedSolves = action.payload;
    },
    updateSelectedSolves: (state, action) => {
      state.selectedSolves.indexOf(action.payload) === -1
        ? state.selectedSolves.push(action.payload)
        : state.selectedSolves.splice(
            state.selectedSolves.indexOf(action.payload),
            1,
          );
    },
    toggleDeleteSolvesStatus: state => {
      state.shouldDeleteSolves = !state.shouldDeleteSolves;
    },
    toggleUpdateSolvesStatus: state => {
      state.shouldUpdateSolves = !state.shouldUpdateSolves;
    },
    setSearchSolves: (state, action) => {
      state.searchSolves = action.payload;
    },
    setSolveData: (state, action) => {
      state.solveData = action.payload;
    },
    setSolves: (state, action) => {
      state.solves = action.payload;
      sortSolves(state);
    },
    addToSolves: (state, action) => {
      state.solves.sort((a, b) => a.date - b.date);
      state.solves.push(action.payload);
      sortSolves(state);
    },
    removeLatestSolve: state => {
      state.solves.sort((a, b) => a.date - b.date);
      state.solves = state.solves.slice(0, -1);
      sortSolves(state);
    },
    updateSolve: (state, action) => {
      state.solves.forEach((solve, idx) => {
        if (solve.id === action.payload.id) {
          state.solves[idx].penalty = action.payload.penalty;
          state.solves[idx].penalizedTime = action.payload.penalizedTime;
          state.solves[idx].comments = action.payload.comments;
        }
      });
    },
    deleteSelectedSolves: state => {
      state.selectedSolves.forEach(id =>
        state.solves.forEach(
          (val, idx) => val.id === id && state.solves.splice(idx, 1),
        ),
      );
    },
    setSolvesSortOption: (state, action) => {
      state.solvesSortOption = action.payload;
      sortSolves(state);
    },
  },
});

export const {
  toggleSolvesSortedStatus,
  toggleSolvesSelectionMode,
  toggleSolvesModalVisibility,
  toggleSortOptionModalVisibility,
  setSearchText,
  setSearchSolves,
  setSelectedSolves,
  updateSelectedSolves,
  toggleDeleteSolvesStatus,
  toggleUpdateSolvesStatus,
  setSolveData,
  setSolves,
  addToSolves,
  removeLatestSolve,
  updateSolve,
  deleteSelectedSolves,
  setSolvesSortOption,
} = solvesScreenSlice.actions;

export default solvesScreenSlice.reducer;
