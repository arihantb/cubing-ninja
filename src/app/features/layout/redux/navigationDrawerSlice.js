import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isEditProfileVisible: false,
  isSignInSignUpVisible: false,
  username: '',
  profile: '',
};

export const navigationDrawerSlice = createSlice({
  name: 'navigationDrawer',
  initialState,
  reducers: {
    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    toggleEditProfileVisibility: state => {
      state.isEditProfileVisible = !state.isEditProfileVisible;
    },
    toggleSignInSignUpVisibility: state => {
      state.isSignInSignUpVisible = !state.isSignInSignUpVisible;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const {
  setLoggedInStatus,
  toggleEditProfileVisibility,
  toggleSignInSignUpVisibility,
  setUsername,
  setProfile,
} = navigationDrawerSlice.actions;

export default navigationDrawerSlice.reducer;
