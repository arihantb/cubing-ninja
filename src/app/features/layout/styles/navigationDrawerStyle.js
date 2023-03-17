import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  drawerView: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  drawerHeaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: Dimensions.get('window').height / 5,
  },
  drawerHeaderImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  drawerHeaderImageStyle: {
    opacity: 0.3,
  },
  drawerItemSelected: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: colors.blue,
  },
  drawerItemUnselected: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
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
    marginLeft: 20,
  },
  profileName: {
    marginLeft: 20,
    color: colors.white,
    fontSize: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
