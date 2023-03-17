import {StyleSheet} from 'react-native';

import {colors} from '_features/theme';

export default StyleSheet.create({
  centerIcon: {
    padding: 17,
  },
  headerIconsAnimatedView: {
    backgroundColor: colors.primary,
    height: 55,
  },
  headerLeftIcons: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
  },
  headerRightIcons: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerTitle: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: colors.blue,
  },
  puzzleText: {
    fontSize: 25,
    paddingRight: 5,
  },
  puzzleView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchBarHeaderIcons: {
    flexDirection: 'row',
  },
  searchInput: {
    color: colors.white,
    fontFamily: 'GoogleSans-Bold',
    fontSize: 18,
    paddingBottom: 0,
  },
  searchText: {
    flex: 1,
    fontSize: 20,
  },
  searchTextView: {
    flexDirection: 'row',
    marginBottom: -10,
    marginLeft: 50,
    marginRight: 10,
  },
  solvesScreenHeaderIcons: {
    flexDirection: 'row',
  },
  timerScreenHeaderIcons: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 25,
  },
});
