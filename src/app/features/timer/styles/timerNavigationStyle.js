import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
  },
  tabBarIndicator: {
    top: 0,
  },
  tabBarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
