import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isConfirmDeleteAccountModalVisible: false,
  isDeletingAccount: false,
};

export const confirmDeleteAccountModalSlice = createSlice({
  name: 'confirmDeleteAccountModal',
  initialState,
  reducers: {
    setDeletingAccountStatus: (state, action) => {
      state.isDeletingAccount = action.payload;
    },
    toggleConfirmDeleteAccountModalVisibilityFromModal: state => {
      state.isConfirmDeleteAccountModalVisible =
        !state.isConfirmDeleteAccountModalVisible;
    },
  },
});

export const {
  setDeletingAccountStatus,
  toggleConfirmDeleteAccountModalVisibilityFromModal,
} = confirmDeleteAccountModalSlice.actions;

export default confirmDeleteAccountModalSlice.reducer;
