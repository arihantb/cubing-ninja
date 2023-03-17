import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isEditCommentsVisible: false,
  isScrambleImageVisible: false,
};

export const solvesModalSlice = createSlice({
  name: 'solvesModal',
  initialState,
  reducers: {
    toggleEditCommentsVisibility: state => {
      state.isEditCommentsVisible = !state.isEditCommentsVisible;
    },
    toggleScrambleImageVisibility: state => {
      state.isScrambleImageVisible = !state.isScrambleImageVisible;
    },
  },
});

export const {toggleEditCommentsVisibility, toggleScrambleImageVisibility} =
  solvesModalSlice.actions;

export default solvesModalSlice.reducer;
