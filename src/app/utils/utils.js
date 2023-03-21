const {constants} = require('../data/constants');
const {loadFromLocalStorage, saveToLocalStorage} = require('../libs');

export const getSolves = async () => {
  const solves = {};

  for (let puzzle in [...constants.puzzles.keys()]) {
    solves[puzzle] = await loadFromLocalStorage(`solves/${puzzle}`);
  }

  return solves;
};

export const setSolves = solves => {
  for (let puzzle in [...solves.keys()]) {
    saveToLocalStorage(`solves/${puzzle}`, solves[puzzle]);
  }
};
