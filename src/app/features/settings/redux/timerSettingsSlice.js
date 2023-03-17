import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timerSettings: {
    alertOnInspectionTimeLeft: false,
    alertType: 'Both',
    alertTypeModalOffset: 0,
    inspectionDuration: 15,
    isAlertTypeModalVisible: false,
    isInspectionDurationModalVisible: false,
    isInspectionEnabled: false,
    isManualMode: false,
    shouldAlertOnBestAverage: false,
    shouldAlertOnBestTime: false,
    shouldAlertOnWorstTime: false,
    shouldBackCancelSolve: true,
    shouldGenerateScrambles: true,
    shouldHoldToStart: true,
  },
};

export const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    setTimerSettings: (state, action) => {
      state.timerSettings = action.payload;
    },
  },
});

export const {setTimerSettings} = timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
