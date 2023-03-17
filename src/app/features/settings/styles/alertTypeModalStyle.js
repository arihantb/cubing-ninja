import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

const size =
  Dimensions.get('window').width > Dimensions.get('window').height
    ? Dimensions.get('window').height / 15
    : Dimensions.get('window').width / 15;

export default StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    right: 30,
  },
  selectPuzzleLabel: {
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    margin: 20,
    marginTop: 15,
    marginBottom: 5,
    width: size,
    height: size,
  },
  puzzleLabel: {
    marginBottom: 10,
    textAlign: 'center',
  },
  puzzleLabelBottom: {
    textAlign: 'center',
    marginBottom: size,
  },
});
