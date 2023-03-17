import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isPatternsModalVisible: false,
  selectedPatternIndex: 0,
};

export const patternsModalSlice = createSlice({
  name: 'patternsModal',
  initialState,
  reducers: {
    togglePatternsModalVisibilityFromModal: state => {
      state.isPatternsModalVisible = !state.isPatternsModalVisible;
    },
    setSelectedPatternIndex: (state, action) => {
      state.selectedPatternIndex = action.payload;
    },
  },
});

export const {togglePatternsModalVisibilityFromModal, setSelectedPatternIndex} =
  patternsModalSlice.actions;

export default patternsModalSlice.reducer;
