import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isPrivacyPolicyModalVisible: false,
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    togglePrivacyPolicyModalVisibility: state => {
      state.isPrivacyPolicyModalVisible = !state.isPrivacyPolicyModalVisible;
    },
  },
});

export const {togglePrivacyPolicyModalVisibility} = aboutSlice.actions;

export default aboutSlice.reducer;
