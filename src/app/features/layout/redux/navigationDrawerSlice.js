import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  firstName: '',
  headerImage: 'https://via.placeholder.com/300.png',
  isEditProfileVisible: false,
  isSignInSignUpVisible: false,
  lastName: '',
  password: '',
  profilePicture: 'https://via.placeholder.com/300.png',
};

export const navigationDrawerSlice = createSlice({
  name: 'navigationDrawer',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setHeaderImage: (state, action) => {
      state.headerImage = action.payload;
    },
    toggleEditProfileVisibility: state => {
      state.isEditProfileVisible = !state.isEditProfileVisible;
    },
    toggleSignInSignUpVisibility: state => {
      state.isSignInSignUpVisible = !state.isSignInSignUpVisible;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const {
  setEmail,
  setFirstName,
  setHeaderImage,
  toggleEditProfileVisibility,
  toggleSignInSignUpVisibility,
  setLastName,
  setPassword,
  setProfilePicture,
} = navigationDrawerSlice.actions;

export default navigationDrawerSlice.reducer;
