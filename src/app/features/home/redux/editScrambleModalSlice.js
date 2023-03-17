import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isEditScrambleModalVisible: false,
  scrambleText: [],
};

export const editScrambleModalSlice = createSlice({
  name: 'editScrambleModal',
  initialState,
  reducers: {
    addToScrambleText: (state, action) => {
      if (state.scrambleText.length !== 0) {
        if (
          !state.scrambleText[state.scrambleText.length - 1].includes(
            action.payload.notation,
          )
        ) {
          state.scrambleText.push(
            action.payload.notation + action.payload.suffix,
          );
        } else {
          state.scrambleText[state.scrambleText.length - 1] =
            action.payload.notation + action.payload.suffix;
        }
      } else {
        state.scrambleText.push(
          action.payload.notation + action.payload.suffix,
        );
      }
    },
    clearScrambleText: state => {
      state.scrambleText = [];
    },
    removeFromScrambleText: state => {
      state.scrambleText = state.scrambleText.slice(0, -1);
    },
    toggleEditScrambleModalVisibilityFromModal: state => {
      state.isEditScrambleModalVisible = !state.isEditScrambleModalVisible;
    },
  },
});

export const {
  addToScrambleText,
  clearScrambleText,
  removeFromScrambleText,
  toggleEditScrambleModalVisibilityFromModal,
} = editScrambleModalSlice.actions;

export default editScrambleModalSlice.reducer;
