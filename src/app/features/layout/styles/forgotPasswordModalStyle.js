import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  modalView: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.black,
  },
  inputContainer: {
    borderBottomWidth: 2,
  },
  input: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 18,
    padding: 5,
  },
  buttons: {
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inputView: {
    marginTop: 20,
    width: 250,
  },
  doneButtonText: {
    fontSize: 18,
    color: colors.blue,
  },
  doneButtonTextDisabled: {
    fontSize: 18,
    color: colors.grey,
  },
  cancelButtonText: {
    fontSize: 18,
    color: colors.red,
  },
  leftIconStyle: {
    paddingLeft: 10,
  },
  errorMessage: {
    color: colors.red,
    marginBottom: 20,
    fontFamily: 'GoogleSans-Bold',
    fontSize: 14,
  },
});
