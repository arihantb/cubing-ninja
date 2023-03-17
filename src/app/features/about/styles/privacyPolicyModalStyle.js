import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  blueView: {
    backgroundColor: colors.blueLight,
    padding: 5,
  },
  blueViewText: {
    color: colors.black,
    fontSize: 14,
  },
  bottomCard: {
    marginBottom: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  card: {
    margin: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginVertical: 5,
  },
  mainView: {
    backgroundColor: colors.secondary,
    flex: 1,
    flexDirection: 'column',
  },
  modal: {
    margin: 0,
  },
  orangeView: {
    backgroundColor: colors.orange,
    padding: 5,
  },
  orangeViewText: {
    color: colors.black,
    fontSize: 14,
  },
  redView: {
    backgroundColor: colors.red,
    padding: 5,
  },
  redViewText: {
    color: colors.black,
    fontSize: 14,
  },
});
