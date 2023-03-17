import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.primary,
  },
  tabBarIndicator: {
    top: 0,
  },
  tabBarLabelBlue: {
    color: colors.blue,
    fontSize: 18,
  },
  tabBarLabelWhite: {
    color: colors.white,
    fontSize: 18,
  },
});
