import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  modalView: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerView: {
    height: Dimensions.get('window').height / 2,
  },
  headerImageStyle: {
    opacity: 0.3,
  },
  headerBackground: {
    zIndex: -1,
    flex: 1,
  },
  drawerItemSelected: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: colors.blue,
  },
  drawerItemUnselected: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  drawerItemText: {
    marginLeft: 20,
    color: colors.white,
    fontSize: 20,
  },
  avatarBackground: {
    borderRadius: 100,
  },
  avatar: {
    width: 110,
    height: 110,
    margin: 50,
    alignSelf: 'center',
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
  row: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  password: {
    color: colors.blueLight,
    fontSize: 18,
  },
  deleteAccount: {
    color: colors.red,
    fontSize: 18,
  },
  username: {
    color: colors.blueLight,
    fontSize: 18,
  },
  email: {
    color: colors.blueLight,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
  },
  signOut: {
    color: colors.red,
    fontSize: 18,
  },
  rowEnd: {
    margin: 20,
    alignSelf: 'flex-end',
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
