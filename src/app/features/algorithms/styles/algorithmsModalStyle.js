import {StyleSheet} from 'react-native';
import {colors} from '_features/theme';

export default StyleSheet.create({
  algorithmNameText: {
    color: colors.black,
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  algorithmView: {
    padding: 10,
  },
  algorithmText: {
    color: 'gray',
    fontSize: 18,
  },
  backdrop: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  bottomIconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  mainContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    width: '70%',
  },
  puzzlePlayerView: {
    height: 300,
  },
});
