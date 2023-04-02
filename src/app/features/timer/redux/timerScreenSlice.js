import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isCommentsModalVisible: false,
  isScrambleImageModalVisible: false,
  stats: '',
  scrambleImageHeight: 0,
  scrambleTextHeight: 0,
};

export const timerScreenSlice = createSlice({
  name: 'timerScreen',
  initialState,
  reducers: {
    toggleCommentsModalVisibility: state => {
      state.isCommentsModalVisible = !state.isCommentsModalVisible;
    },
    toggleScrambleImageModalVisibility: state => {
      state.isScrambleImageModalVisible = !state.isScrambleImageModalVisible;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setScrambleImageHeight: (state, action) => {
      state.scrambleImageHeight = action.payload;
    },
    setScrambleTextHeight: (state, action) => {
      state.scrambleTextHeight = action.payload;
    },
  },
});

export const {
  toggleCommentsModalVisibility,
  toggleScrambleImageModalVisibility,
  setStats,
  setScrambleImageHeight,
  setScrambleTextHeight,
} = timerScreenSlice.actions;

export default timerScreenSlice.reducer;
