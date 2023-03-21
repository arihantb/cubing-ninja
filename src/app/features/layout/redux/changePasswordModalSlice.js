import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChangePasswordModalVisible: false,
  password: '',
  confirmPassword: '',
  errorMessage: {
    password: '',
    confirmPassword: '',
  },
  isInvalidPassword: false,
  isInvalidConfirmPassword: false,
  isChangingPassword: false,
};

export const changePasswordModalSlice = createSlice({
  name: 'changePasswordModal',
  initialState,
  reducers: {
    toggleChangingPasswordStatus: state => {
      state.isChangingPassword = !state.isChangingPassword;
    },
    setConfirmPasswordFromModal: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setPasswordFromModal: (state, action) => {
      state.password = action.payload;
    },
    setPasswordInputError: (state, action) => {
      state.errorMessage.password = action.payload;
    },
    setConfirmPasswordInputError: (state, action) => {
      state.errorMessage.confirmPassword = action.payload;
    },
    setInvalidPasswordStatus: (state, action) => {
      state.isInvalidPassword = action.payload;
    },
    setInvalidConfirmPasswordStatus: (state, action) => {
      state.isInvalidConfirmPassword = action.payload;
    },
    toggleChangePasswordModalVisibilityFromModal: state => {
      state.isChangePasswordModalVisible = !state.isChangePasswordModalVisible;
    },
  },
});

export const {
  toggleChangingPasswordStatus,
  setConfirmPasswordFromModal,
  setConfirmPasswordInputError,
  setInvalidConfirmPasswordStatus,
  setInvalidPasswordStatus,
  setPasswordFromModal,
  setPasswordInputError,
  toggleChangePasswordModalVisibilityFromModal,
} = changePasswordModalSlice.actions;

export default changePasswordModalSlice.reducer;
