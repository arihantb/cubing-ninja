import {StyleSheet} from 'react-native';

import colors from '../dark/colors';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 55,
    backgroundColor: colors.secondary,
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
