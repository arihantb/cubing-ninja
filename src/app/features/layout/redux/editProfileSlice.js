import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  profile: '',
  isEditProfileVisible: false,
  isChangeEmailModalVisible: false,
  isChangePasswordModalVisible: false,
  isChangeUsernameModalVisible: false,
  isConfirmDeleteAccountModalVisible: false,
};

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setUsernameFromModal: (state, action) => {
      state.username = action.payload;
    },
    setEmailFromModal: (state, action) => {
      state.email = action.payload;
    },
    setProfileFromModal: (state, action) => {
      state.profile = action.payload;
    },
    toggleEditProfileVisibilityFromModal: state => {
      state.isEditProfileVisible = !state.isEditProfileVisible;
    },
    toggleChangeEmailModalVisibility: state => {
      state.isChangeEmailModalVisible = !state.isChangeEmailModalVisible;
    },
    toggleChangePasswordModalVisibility: state => {
      state.isChangePasswordModalVisible = !state.isChangePasswordModalVisible;
    },
    toggleChangeUsernameModalVisibility: state => {
      state.isChangeUsernameModalVisible = !state.isChangeUsernameModalVisible;
    },
    toggleConfirmDeleteAccountModalVisibility: state => {
      state.isConfirmDeleteAccountModalVisible =
        !state.isConfirmDeleteAccountModalVisible;
    },
  },
});

export const {
  setUsernameFromModal,
  setEmailFromModal,
  setProfileFromModal,
  toggleEditProfileVisibilityFromModal,
  toggleChangeEmailModalVisibility,
  toggleChangePasswordModalVisibility,
  toggleChangeUsernameModalVisibility,
  toggleConfirmDeleteAccountModalVisibility,
} = editProfileSlice.actions;

export default editProfileSlice.reducer;
