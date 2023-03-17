import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAlgorithmsModalVisible: false,
  selectedAlgorithmIndex: 0,
};

export const algorithmsModalSlice = createSlice({
  name: 'algorithmsModal',
  initialState,
  reducers: {
    setSelectedAlgorithmIndex: (state, action) => {
      state.selectedAlgorithmIndex = action.payload;
    },
    toggleAlgorithmsModalVisibilityFromModal: state => {
      state.isAlgorithmsModalVisible = !state.isAlgorithmsModalVisible;
    },
  },
});

export const {
  setSelectedAlgorithmIndex,
  toggleAlgorithmsModalVisibilityFromModal,
} = algorithmsModalSlice.actions;

export default algorithmsModalSlice.reducer;
