import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSelectPuzzleModalVisible: false,
};

export const selectPuzzleModalSlice = createSlice({
  name: 'selectPuzzleModal',
  initialState,
  reducers: {
    toggleSelectPuzzleModalVisibilityFromModal: state => {
      state.isSelectPuzzleModalVisible = !state.isSelectPuzzleModalVisible;
    },
  },
});

export const {toggleSelectPuzzleModalVisibilityFromModal} =
  selectPuzzleModalSlice.actions;

export default selectPuzzleModalSlice.reducer;
