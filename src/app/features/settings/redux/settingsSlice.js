import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAlgorithmsSettingsVisible: false,
  isGeneralSettingsVisible: false,
  isLanguageModalVisible: false,
  isTimerSettingsUpdated: false,
  isTimerSettingsVisible: false,
  language: 'US',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleAlgorithmsSettingsVisible: state => {
      state.isAlgorithmsSettingsVisible = !state.isAlgorithmsSettingsVisible;
    },
    toggleGeneralSettingsVisible: state => {
      state.isGeneralSettingsVisible = !state.isGeneralSettingsVisible;
    },
    toggleLanguageModalVisible: state => {
      state.isLanguageModalVisible = !state.isLanguageModalVisible;
    },
    toggleTimerSettingsUpdated: state => {
      state.isTimerSettingsUpdated = !state.isTimerSettingsUpdated;
    },
    toggleTimerSettingsVisible: state => {
      state.isTimerSettingsVisible = !state.isTimerSettingsVisible;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {
  toggleAlgorithmsSettingsVisible,
  toggleGeneralSettingsVisible,
  toggleLanguageModalVisible,
  toggleTimerSettingsUpdated,
  toggleTimerSettingsVisible,
  setLanguage,
} = settingsSlice.actions;

export default settingsSlice.reducer;
