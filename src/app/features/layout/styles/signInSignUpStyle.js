import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  bottomText: {
    color: colors.white,
    fontSize: 16,
  },
  bottomView: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    height: 50,
  },
  buttonDisabled: {
    backgroundColor: colors.blueLight,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    height: 50,
  },
  buttonText: {
    fontSize: 18,
  },
  errorMessage: {
    color: colors.red,
    marginBottom: 20,
    fontFamily: 'GoogleSans-Bold',
    fontSize: 14,
  },
  flex: {
    flex: 1,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    margin: 10,
    marginTop: -10,
  },
  forgotPasswordText: {
    fontSize: 16,
  },
  input: {
    color: colors.white,
    fontFamily: 'GoogleSans-Bold',
    textDecorationLine: 'none',
  },
  inputContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  leftIconStyle: {
    paddingLeft: 15,
  },
  rightIconStyle: {
    paddingRight: 15,
  },
  logo: {
    borderRadius: 10,
    margin: 50,
    width: 100,
    height: 100,
  },
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  modalView: {
    margin: 0,
  },
  row: {
    flexDirection: 'row',
  },
  signUpButton: {
    margin: 10,
    borderRadius: 5,
    height: 50,
  },
  signInSignUpToggle: {
    marginLeft: 5,
    color: colors.blueLight,
    fontSize: 16,
  },
  noInternet: {
    backgroundColor: colors.red,
    padding: 10,
    alignItems: 'center',
  },
  noInternetText: {
    fontSize: 18,
  },
});
