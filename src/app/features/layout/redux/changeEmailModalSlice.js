import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChangeEmailModalVisible: false,
  email: '',
  errorMessage: '',
  isInvalidEmail: false,
  isChangingEmail: false,
};

export const changeEmailModalSlice = createSlice({
  name: 'changeEmailModal',
  initialState,
  reducers: {
    setEmailFromModal: (state, action) => {
      state.email = action.payload;
    },
    setInvalidEmailStatus: (state, action) => {
      state.isInvalidEmail = action.payload;
    },
    setEmailInputError: (state, action) => {
      state.errorMessage = action.payload;
    },
    toggleChangingEmailStatus: state => {
      state.isChangingEmail = !state.isChangingEmail;
    },
    toggleChangeEmailModalVisibilityFromModal: state => {
      state.isChangeEmailModalVisible = !state.isChangeEmailModalVisible;
    },
  },
});

export const {
  toggleChangingEmailStatus,
  setInvalidEmailStatus,
  setEmailInputError,
  setEmailFromModal,
  toggleChangeEmailModalVisibilityFromModal,
} = changeEmailModalSlice.actions;

export default changeEmailModalSlice.reducer;
