import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 55,
  },
  swipeTabs: {
    flex: 8,
    flexDirection: 'column',
    margin: 15,
  },
  swipeTabsTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  swipeTabsSubtitle: {
    fontSize: 14,
  },
  swipeTabsSwitch: {
    flex: 2,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
