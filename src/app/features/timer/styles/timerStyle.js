import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  solvesIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
  },
  statsIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
  },
  timerTabAnimatedView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: colors.secondary,
  },
  timerTabIconsView: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  timerIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
  },
});
