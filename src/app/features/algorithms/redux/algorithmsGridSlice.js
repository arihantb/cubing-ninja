import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  algorithmsData: {
    twoByTwo: {
      cll: {algorithms: [], sections: [], mask: ''},
      eg1: {algorithms: [], sections: [], mask: ''},
      eg2: {algorithms: [], sections: [], mask: ''},
      oll: {algorithms: [], sections: [], mask: ''},
      pbl: {algorithms: [], sections: [], mask: ''},
    },
    threeByThree: {
      f2l: {algorithms: [], sections: [], mask: ''},
      oll: {algorithms: [], sections: [], mask: ''},
      pll: {algorithms: [], sections: [], mask: ''},
      olll: {algorithms: [], sections: [], mask: ''},
      antiPll: {algorithms: [], sections: [], mask: ''},
      cls: {algorithms: [], sections: [], mask: ''},
      cmll: {algorithms: [], sections: [], mask: ''},
      coll: {algorithms: [], sections: [], mask: ''},
      ell: {algorithms: [], sections: [], mask: ''},
      eo: {algorithms: [], sections: [], mask: ''},
      ollcp: {algorithms: [], sections: [], mask: ''},
      sbls: {algorithms: [], sections: [], mask: ''},
      sv: {algorithms: [], sections: [], mask: ''},
      vls: {algorithms: [], sections: [], mask: ''},
      wv: {algorithms: [], sections: [], mask: ''},
      zbll: {algorithms: [], sections: [], mask: ''},
    },
    fourByFour: {
      ollParity: {algorithms: [], sections: [], mask: ''},
      pllParity: {algorithms: [], sections: [], mask: ''},
    },
  },
  completedAlgorithms: {
    twoByTwo: {
      cll: [],
      eg1: [],
      eg2: [],
      oll: [],
      pbl: [],
    },
    threeByThree: {
      f2l: [],
      oll: [],
      pll: [],
      olll: [],
      antiPll: [],
      cls: [],
      cmll: [],
      coll: [],
      ell: [],
      eo: [],
      ollcp: [],
      sbls: [],
      sv: [],
      vls: [],
      wv: [],
      zbll: [],
    },
    fourByFour: {
      ollParity: [],
      pllParity: [],
    },
  },
  isAlgorithmsModalVisible: false,
  selectedAlgorithm: {
    name: '',
    mask: '',
    solutions: [],
  },
};

export const algorithmsGridSlice = createSlice({
  name: 'algorithmsGrid',
  initialState,
  reducers: {
    addToCompletedAlgorithms: (state, action) => {
      state.completedAlgorithms[action.payload.puzzle][
        action.payload.category
      ].push(action.payload.index);
    },
    removeFromCompletedAlgorithms: (state, action) => {
      state.completedAlgorithms[action.payload.puzzle][
        action.payload.category
      ].splice(
        state.completedAlgorithms[action.payload.puzzle][
          action.payload.category
        ].indexOf(action.payload.index),
        1,
      );
    },
    setAlgorithmsData: (state, action) => {
      state.algorithmsData = action.payload;
    },
    setCompletedAlgorithms: (state, action) => {
      state.completedAlgorithms = action.payload;
    },
    setSelectedAlgorithm: (state, action) => {
      state.selectedAlgorithm = action.payload;
    },
    toggleAlgorithmsModalVisibility: state => {
      state.isAlgorithmsModalVisible = !state.isAlgorithmsModalVisible;
    },
  },
});

export const {
  addToCompletedAlgorithms,
  removeFromCompletedAlgorithms,
  setAlgorithmsData,
  setDownloadedAlgorithms,
  setCompletedAlgorithms,
  setSelectedAlgorithm,
  toggleAlgorithmsModalVisibility,
} = algorithmsGridSlice.actions;

export default algorithmsGridSlice.reducer;
