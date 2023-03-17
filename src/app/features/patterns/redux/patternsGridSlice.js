import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  patternsData: {
    twoByTwo: {patterns: [], sections: []},
    threeByThree: {patterns: [], sections: []},
    fourByFour: {patterns: [], sections: []},
  },
  completedPatterns: {
    twoByTwo: [],
    threeByThree: [],
    fourByFour: [],
  },
  isPatternsModalVisible: false,
  selectedPattern: {
    name: '',
    algorithms: [],
  },
};

export const patternsGridSlice = createSlice({
  name: 'patternsGrid',
  initialState,
  reducers: {
    addToCompletedPatterns: (state, action) => {
      state.completedPatterns[action.payload.puzzle].push(action.payload.index);
    },
    removeFromCompletedPatterns: (state, action) => {
      state.completedPatterns[action.payload.puzzle].splice(
        state.completedPatterns[action.payload.puzzle].indexOf(
          action.payload.index,
        ),
        1,
      );
    },
    setPatternsData: (state, action) => {
      state.patternsData = action.payload;
    },
    setCompletedPatterns: (state, action) => {
      state.completedPatterns = action.payload;
    },
    setSelectedPattern: (state, action) => {
      state.selectedPattern = action.payload;
    },
    togglePatternsModalVisibility: state => {
      state.isPatternsModalVisible = !state.isPatternsModalVisible;
    },
  },
});

export const {
  addToCompletedPatterns,
  removeFromCompletedPatterns,
  setPatternsData,
  setCompletedPatterns,
  setSelectedPattern,
  togglePatternsModalVisibility,
} = patternsGridSlice.actions;

export default patternsGridSlice.reducer;
