import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  downloadInfoText: {
    color: colors.white,
    fontSize: 18,
  },
  downloadInfoView: {
    margin: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  downloadView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 5,
    width: 100,
    height: 100,
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemText: {
    margin: 5,
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  itemView: {
    borderRadius: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    backgroundColor: colors.primary,
    color: 'white',
    padding: 10,
  },
});
