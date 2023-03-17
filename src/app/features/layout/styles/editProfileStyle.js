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
    backgroundColor: colors.white,
  },
  avatar: {
    backgroundColor: 'red',
    width: 100,
    top: -100,
    alignSelf: 'center',
  },
  avatarPencil: {
    top: 70,
    backgroundColor: colors.blue,
  },
  editingView: {
    flex: 1,
    marginTop: 50,
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
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});
