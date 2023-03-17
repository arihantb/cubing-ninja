import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  downloadInfoText: {
    color: colors.white,
    fontSize: 18,
  },
  downloadInfoView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 20,
  },
  downloadView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 100,
    margin: 5,
    width: 100,
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemText: {
    color: colors.white,
    fontSize: 16,
    margin: 5,
    textAlign: 'center',
  },
  itemView: {
    borderRadius: 10,
  },
  mainContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  sectionTitle: {
    backgroundColor: colors.primary,
    color: 'white',
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
});
