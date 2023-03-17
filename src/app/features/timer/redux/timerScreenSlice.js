import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isCommentsModalVisible: false,
  isScrambleImageModalVisible: false,
  leftStats: '',
  rightStats: '',
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
    setLeftStats: (state, action) => {
      state.leftStats = action.payload;
    },
    setRightStats: (state, action) => {
      state.rightStats = action.payload;
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
  setLeftStats,
  setRightStats,
  setScrambleImageHeight,
  setScrambleTextHeight,
} = timerScreenSlice.actions;

export default timerScreenSlice.reducer;
