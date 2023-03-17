import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: Dimensions.get('window').width / 3 - 15,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 16,
  },
  commentsIcon: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  date: {
    position: 'absolute',
    top: 5,
    left: 5,
    fontSize: 10,
    color: colors.grey,
  },
  itemContainer: {
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  plus2: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 14,
    color: colors.red,
  },
});
