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
    toggleAlgorithmsSettingsVisibility: state => {
      state.isAlgorithmsSettingsVisible = !state.isAlgorithmsSettingsVisible;
    },
    toggleGeneralSettingsVisibility: state => {
      state.isGeneralSettingsVisible = !state.isGeneralSettingsVisible;
    },
    toggleLanguageModalVisibility: state => {
      state.isLanguageModalVisible = !state.isLanguageModalVisible;
    },
    toggleTimerSettingsUpdated: state => {
      state.isTimerSettingsUpdated = !state.isTimerSettingsUpdated;
    },
    toggleTimerSettingsVisibility: state => {
      state.isTimerSettingsVisible = !state.isTimerSettingsVisible;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {
  toggleAlgorithmsSettingsVisibility,
  toggleGeneralSettingsVisibility,
  toggleLanguageModalVisibility,
  toggleTimerSettingsUpdated,
  toggleTimerSettingsVisibility,
  setLanguage,
} = settingsSlice.actions;

export default settingsSlice.reducer;
