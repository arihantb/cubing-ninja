import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  inspectionPenalty: '',
  inspectionTime: 15,
  isInspectionTimerOn: false,
  isPressTimerOn: false,
  isStopwatchOn: false,
  latestSolve: {
    id: '',
    date: '',
    time: '',
    scrambleText: '',
    scrambleImage: '',
    penalty: '',
    penalizedTime: '',
    comments: '',
  },
  pressTime: 0,
  shouldRefreshScramble: false,
  shouldResetTimer: false,
  time: 0,
};

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    setInspectionPenalty: (state, action) => {
      state.inspectionPenalty = action.payload;
    },
    setInspectionTime: (state, action) => {
      state.inspectionTime = action.payload;
    },
    updateInspectionTime: (state, action) => {
      state.inspectionTime -= action.payload;
    },
    toggleInspectionTimerOnStatus: state => {
      state.isInspectionTimerOn = !state.isInspectionTimerOn;
    },
    togglePressTimerOnStatus: state => {
      state.isPressTimerOn = !state.isPressTimerOn;
    },
    toggleTimerOnStatus: state => {
      state.isStopwatchOn = !state.isStopwatchOn;
    },
    setLatestSolve: (state, action) => {
      state.latestSolve = action.payload;
    },
    setPressTime: (state, action) => {
      state.pressTime = action.payload;
    },
    toggleRefreshScrambleStatus: state => {
      state.shouldRefreshScramble = !state.shouldRefreshScramble;
    },
    toggleResetTimerStatus: state => {
      state.shouldResetTimer = !state.shouldResetTimer;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const {
  setInspectionPenalty,
  setInspectionTime,
  updateInspectionTime,
  toggleInspectionTimerOnStatus,
  togglePressTimerOnStatus,
  toggleTimerOnStatus,
  setLatestSolve,
  setPressTime,
  toggleRefreshScrambleStatus,
  toggleResetTimerStatus,
  setTime,
} = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
