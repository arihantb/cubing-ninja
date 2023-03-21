import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isForgotPasswordModalVisible: false,
  email: '',
  errorMessage: '',
  isInvalidEmail: false,
  isSendingMail: false,
};

export const forgotPasswordModalSlice = createSlice({
  name: 'forgotPasswordModal',
  initialState,
  reducers: {
    toggleSendingMailStatus: state => {
      state.isSendingMail = !state.isSendingMail;
    },
    setEmailFromForgotPasswordModal: (state, action) => {
      state.email = action.payload;
    },
    setEmailInputError: (state, action) => {
      state.errorMessage = action.payload;
    },
    setInvalidEmailStatus: (state, action) => {
      state.isInvalidEmail = action.payload;
    },
    toggleForgotPasswordModalVisibilityFromModal: state => {
      state.isForgotPasswordModalVisible = !state.isForgotPasswordModalVisible;
    },
  },
});

export const {
  toggleSendingMailStatus,
  setEmail,
  setEmailFromForgotPasswordModal,
  setEmailInputError,
  setInvalidEmailStatus,
  toggleForgotPasswordModalVisibilityFromModal,
} = forgotPasswordModalSlice.actions;

export default forgotPasswordModalSlice.reducer;
