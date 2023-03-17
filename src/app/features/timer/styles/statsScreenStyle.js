import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
});
