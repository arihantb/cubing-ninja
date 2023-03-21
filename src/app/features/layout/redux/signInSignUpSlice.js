import {createSlice} from '@reduxjs/toolkit';
import {strings} from '_data/strings';

const initialState = {
  confirmPassword: '',
  errorMessage: {
    confirmPassword: false,
    email: false,
    username: false,
    password: false,
  },
  isConfirmPasswordShown: false,
  isForgotPasswordModalVisible: false,
  isChangeDataModalVisible: false,
  isConfirmPasswordInputVisible: false,
  isUsernameInputVisible: false,
  isInvalidConfirmPassword: false,
  isInvalidEmail: false,
  isInvalidPassword: false,
  isInvalidUsername: false,
  isLoggingIn: false,
  isPasswordShown: false,
  isSignInSignUpVisible: false,
  mode: 'Sign In',
  email: '',
  password: '',
  username: '',
};

export const signInSignUpSlice = createSlice({
  name: 'signInSignUp',
  initialState,
  reducers: {
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setConfirmPasswordInputError: (state, action) => {
      state.errorMessage.confirmPassword = action.payload;
    },
    setConfirmPasswordInputVisibility: (state, action) => {
      state.isConfirmPasswordInputVisible = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmailInputError: (state, action) => {
      state.errorMessage.email = action.payload;
    },
    setUsernameInputVisibility: (state, action) => {
      state.isUsernameInputVisible = action.payload;
    },
    setInvalidConfirmPasswordStatus: (state, action) => {
      state.isInvalidConfirmPassword = action.payload;
    },
    setInvalidEmailStatus: (state, action) => {
      state.isInvalidEmail = action.payload;
    },
    setInvalidPasswordStatus: (state, action) => {
      state.isInvalidPassword = action.payload;
    },
    setInvalidUsernameStatus: (state, action) => {
      state.isInvalidUsername = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordInputError: (state, action) => {
      state.errorMessage.password = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUsernameInputError: (state, action) => {
      state.errorMessage.username = action.payload;
    },
    toggleShowPasswordStatus: state => {
      state.isPasswordShown = !state.isPasswordShown;
    },
    toggleShowConfirmPasswordStatus: state => {
      state.isConfirmPasswordShown = !state.isConfirmPasswordShown;
    },
    toggleLoggingInStatus: state => {
      state.isLoggingIn = !state.isLoggingIn;
    },
    toggleMode: state => {
      state.mode =
        state.mode === strings.signIn ? strings.signUp : strings.signIn;
    },
    toggleChangeDataModalVisibility: state => {
      state.isChangeDataModalVisible = !state.isChangeDataModalVisible;
    },
    toggleSignInSignUpVisibilityFromModal: state => {
      state.isSignInSignUpVisible = !state.isSignInSignUpVisible;
    },
    toggleForgotPasswordModalVisibility: state => {
      state.isForgotPasswordModalVisible = !state.isForgotPasswordModalVisible;
    },
  },
});

export const {
  setConfirmPassword,
  setConfirmPasswordInputError,
  setConfirmPasswordInputVisibility,
  setEmail,
  setEmailInputError,
  setUsernameInputVisibility,
  setInvalidConfirmPasswordStatus,
  setInvalidEmailStatus,
  setInvalidPasswordStatus,
  setInvalidUsernameStatus,
  setPassword,
  setPasswordInputError,
  setUsername,
  setUsernameInputError,
  toggleShowPasswordStatus,
  toggleShowConfirmPasswordStatus,
  toggleLoggingInStatus,
  toggleChangeDataModalVisibility,
  toggleMode,
  toggleSignInSignUpVisibilityFromModal,
  toggleForgotPasswordModalVisibility,
} = signInSignUpSlice.actions;

export default signInSignUpSlice.reducer;
