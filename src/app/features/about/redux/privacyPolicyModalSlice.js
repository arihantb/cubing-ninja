import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isPrivacyPolicyModalVisible: false,
};

export const privacyPolicyModalSlice = createSlice({
  name: 'privacyPolicyModal',
  initialState,
  reducers: {
    togglePrivacyPolicyModalVisibilityFromModal: state => {
      state.isPrivacyPolicyModalVisible = !state.isPrivacyPolicyModalVisible;
    },
  },
});

export const {togglePrivacyPolicyModalVisibilityFromModal} =
  privacyPolicyModalSlice.actions;

export default privacyPolicyModalSlice.reducer;
