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
  info: {
    marginVertical: 30,
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
  },
  buttons: {
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  doneButtonText: {
    fontSize: 18,
    color: colors.blue,
  },
  cancelButtonText: {
    fontSize: 18,
    color: colors.red,
  },
});
