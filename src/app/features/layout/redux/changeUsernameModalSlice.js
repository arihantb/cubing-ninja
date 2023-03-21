import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChangeUsernameModalVisible: false,
  username: '',
  errorMessage: '',
  isInvalidUsername: false,
  isChangingUsername: false,
};

export const changeUsernameModalSlice = createSlice({
  name: 'changeUsernameModal',
  initialState,
  reducers: {
    setUsernameFromModal: (state, action) => {
      state.username = action.payload;
    },
    setInvalidUsernameStatus: (state, action) => {
      state.isInvalidUsername = action.payload;
    },
    setUsernameInputError: (state, action) => {
      state.errorMessage = action.payload;
    },
    toggleChangingUsernameStatus: state => {
      state.isChangingUsername = !state.isChangingUsername;
    },
    toggleChangeUsernameModalVisibilityFromModal: state => {
      state.isChangeUsernameModalVisible = !state.isChangeUsernameModalVisible;
    },
  },
});

export const {
  toggleChangingUsernameStatus,
  setInvalidUsernameStatus,
  setUsernameInputError,
  setUsernameFromModal,
  toggleChangeUsernameModalVisibilityFromModal,
} = changeUsernameModalSlice.actions;

export default changeUsernameModalSlice.reducer;
