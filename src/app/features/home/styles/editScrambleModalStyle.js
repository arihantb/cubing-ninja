import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  backspaceView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  clearButton: {
    marginRight: 10,
  },
  clearButtonTitle: {
    color: colors.red,
  },
  editScrambleLabel: {
    color: colors.black,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    maxHeight: 400,
    maxWidth: 250,
    padding: 10,
  },
  notationButton: {
    margin: 5,
  },
  notationView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
  },
  scrambleText: {
    color: colors.black,
    flex: 1,
    fontSize: 18,
    margin: 10,
  },
});
