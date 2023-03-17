import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSortOptionsModalVisible: false,
};

export const sortOptionsModalSlice = createSlice({
  name: 'sortOptionsModal',
  initialState,
  reducers: {
    toggleSortOptionsModalVisibilityFromModal: state => {
      state.isSortOptionsModalVisible = !state.isSortOptionsModalVisible;
    },
  },
});

export const {toggleSortOptionsModalVisibilityFromModal} =
  sortOptionsModalSlice.actions;

export default sortOptionsModalSlice.reducer;
