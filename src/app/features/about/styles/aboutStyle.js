import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.secondary,
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 55,
  },
  copyDeviceInfo: {
    flexDirection: 'column',
    margin: 15,
  },
  copyDeviceInfoTitle: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  copyDeviceInfoSubtitle: {
    color: colors.white,
    fontSize: 14,
  },
  privacyPolicy: {
    margin: 15,
  },
  privacyPolicyTitle: {
    color: colors.white,
    fontSize: 18,
  },
  versionCheck: {
    margin: 15,
  },
  versionCheckTitle: {
    color: colors.white,
    fontSize: 18,
  },
});
