import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
  },
  paddingLeft: {
    paddingLeft: 55,
  },
  row: {
    flexDirection: 'row',
  },
  swipeTabs: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  swipeTabsTitle: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  swipeTabsSubtitle: {
    color: colors.white,
    fontSize: 14,
  },
  swipeTabsSwitch: {
    marginRight: 20,
    justifyContent: 'center',
  },
});
