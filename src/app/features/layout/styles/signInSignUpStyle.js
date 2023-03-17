import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  modalView: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  mainView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: 50,
    width: 100,
    height: 100,
  },
  inputContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  input: {
    marginLeft: 10,
    color: colors.white,
  },
  button: {
    margin: 10,
    borderRadius: 5,
    height: 50,
  },
  bottomView: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomText: {
    color: colors.white,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  signUpButton: {
    margin: 10,
    borderRadius: 5,
    height: 50,
  },
});
