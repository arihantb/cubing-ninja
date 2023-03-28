import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  puzzle: 1,
  isSelectPuzzleModalVisible: false,
};

export const selectPuzzleModalSlice = createSlice({
  name: 'selectPuzzleModal',
  initialState,
  reducers: {
    setPuzzleFromModal: (state, action) => {
      state.puzzle = action.payload;
    },
    toggleSelectPuzzleModalVisibilityFromModal: state => {
      state.isSelectPuzzleModalVisible = !state.isSelectPuzzleModalVisible;
    },
  },
});

export const {setPuzzleFromModal, toggleSelectPuzzleModalVisibilityFromModal} =
  selectPuzzleModalSlice.actions;

export default selectPuzzleModalSlice.reducer;
