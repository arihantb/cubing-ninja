import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  timerView: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrambleView: {
    top: 0,
    height: 200,
    position: 'absolute',
    padding: 20,
    width: '100%',
  },
  scrambleText: {
    fontSize: 18,
    textAlign: 'center',
  },
  timerOptions: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 55,
    backgroundColor: colors.secondary,
  },
  leftStats: {
    fontSize: 15,
    flex: 1,
  },
  rightStats: {
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
});
