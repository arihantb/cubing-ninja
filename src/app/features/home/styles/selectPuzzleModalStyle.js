import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

const size =
  Dimensions.get('window').width > Dimensions.get('window').height
    ? Dimensions.get('window').height / 15
    : Dimensions.get('window').width / 15;

export default StyleSheet.create({
  grid: {
    flexGrow: 0,
    width: 250,
  },
  image: {
    height: size,
    margin: 20,
    marginBottom: 5,
    marginTop: 15,
    width: size,
  },
  itemContainer: {
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: colors.secondaryDark,
    borderRadius: 10,
    padding: 10,
  },
  puzzleLabel: {
    marginBottom: 10,
    textAlign: 'center',
  },
  puzzleLabelBottom: {
    marginBottom: size,
    textAlign: 'center',
  },
  puzzleView: {
    borderRadius: 10,
  },
  selectPuzzleLabel: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});
