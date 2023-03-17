import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  plus2: {
    color: colors.red,
    fontSize: 60,
  },
  timerOuterView: {
    flex: 1,
    marginBottom: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerInnerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  timerDigit: {
    fontFamily: 'GoogleSans-Bold',
    textAlign: 'center',
  },
});
