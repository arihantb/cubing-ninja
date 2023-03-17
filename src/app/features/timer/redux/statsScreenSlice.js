import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allSolves: [],
  ao12Solves: [],
  bestSolves: [],
  penaltySolves: [],
  shouldUpdateStats: false,
};

export const statsScreenSlice = createSlice({
  name: 'statsScreen',
  initialState,
  reducers: {
    setAllSolves: (state, action) => {
      state.allSolves = action.payload;
    },
    setAo12Solves: (state, action) => {
      state.ao12Solves = action.payload;
    },
    setBestSolves: (state, action) => {
      state.bestSolves = action.payload;
    },
    setPenaltySolves: (state, action) => {
      state.penaltySolves = action.payload;
    },
    toggleUpdateStatsStatus: state => {
      state.shouldUpdateStats = !state.shouldUpdateStats;
    },
  },
});

export const {
  setAllSolves,
  setAo12Solves,
  setBestSolves,
  setPenaltySolves,
  toggleUpdateStatsStatus,
} = statsScreenSlice.actions;

export default statsScreenSlice.reducer;
