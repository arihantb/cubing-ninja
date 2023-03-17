import PropTypes from 'prop-types';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import base64 from 'react-native-base64';
import {
  Animated,
  NativeModules,
  Pressable,
  View,
  StatusBar,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Input} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  faArrowLeft,
  faBars,
  faCaretDown,
  faEdit,
  faSearch,
  faShapes,
  faSortAmountDown,
  faSyncAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from '_components';
import {Timer} from '_features/timer';
import {Trainer} from '_features/trainer';
import {Algorithms} from '_features/algorithms';
import {Patterns} from '_features/patterns';
import {Theme} from '_features/theme';
import {Settings} from '_features/settings';
import {Donate} from '_features/donate';
import {About} from '_features/about';
import {NavigationDrawer} from '_features/layout';
import {constants} from '_data/constants';
import {colors} from '_features/theme';
import {loadSettings} from '_libs';
import SelectPuzzleModal from './modals/SelectPuzzleModal';
import EditScrambleModal from './modals/EditScrambleModal';
import SortOptionsModal from './modals/SortOptionsModal';
import {setTimerSettings} from '../settings/redux/timerSettingsSlice';
import {
  setScrambleData,
  toggleDeleteHeaderIconVisibility,
  toggleEditScrambleModalVisibility,
  toggleSearchBarVisibility,
  toggleSelectAlgorithmsVisibility,
  toggleSelectPuzzleModalVisibility,
  toggleSortOptionsModalVisibility,
} from './redux/homeSlice';
import {toggleSelectPuzzleModalVisibilityFromModal} from './redux/selectPuzzleModalSlice';
import {toggleEditScrambleModalVisibilityFromModal} from './redux/editScrambleModalSlice';
import {toggleSortOptionsModalVisibilityFromModal} from './redux/sortOptionsModalSlice';
import {
  deleteSelectedSolves,
  setSearchText,
  setSelectedSolves,
  toggleSolvesSelectionMode,
} from '../timer/redux/solvesScreenSlice';
import styles from './styles/homeStyle';
import {
  heightAnimIn,
  heightAnimOut,
  rotateAnimIn,
  rotateAnimOut,
} from '../../utils/animations';

const Drawer = createDrawerNavigator();

const Home = () => {
  const heightAnim = useRef(new Animated.Value(100)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const drawerItemIndex = useSelector(state => state.home.drawerItemIndex);
  const isDeleteHeaderIconVisible = useSelector(
    state => state.home.isDeleteHeaderIconVisible,
  );
  const isEditScrambleModalVisible = useSelector(
    state => state.home.isEditScrambleModalVisible,
  );
  const isSearchBarVisible = useSelector(
    state => state.home.isSearchBarVisible,
  );
  const isSelectPuzzleModalVisible = useSelector(
    state => state.home.isSelectPuzzleModalVisible,
  );
  const isSortOptionsModalVisible = useSelector(
    state => state.home.isSortOptionsModalVisible,
  );
  const isStopwatchOn = useSelector(state => state.stopwatch.isStopwatchOn);
  const puzzle = useSelector(state => state.home.puzzle);
  const scrambleData = useSelector(state => state.home.scrambleData);
  const searchText = useSelector(state => state.home.searchText);
  const solvesSortOption = useSelector(
    state => state.solvesScreen.solvesSortOption,
  );
  const timerScreenHeaderIconIndex = useSelector(
    state => state.home.timerScreenHeaderIconIndex,
  );
  const timerSettings = useSelector(state => state.timerSettings.timerSettings);

  const setScrambleTextCallback = useCallback(async scrambleText => {
    try {
      if (scrambleText.length !== 0) {
        const scrambleImage =
          await NativeModules.ScrambleModule.getScrambleImage(
            constants.puzzles[puzzle],
            scrambleText,
          );
        dispatch(
          setScrambleData({
            scrambleText: scrambleText,
            scrambleImage: base64.decode(scrambleImage),
            scrambleLoading: false,
          }),
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const dispatch = useDispatch();

  const _fetchScramble = async () => {
    dispatch(
      setScrambleData({
        scrambleLoading: true,
      }),
    );
    try {
      const scramble = JSON.parse(
        await NativeModules.ScrambleModule.getScramble(
          constants.puzzles[puzzle],
        ),
      );
      dispatch(
        setScrambleData({
          scrambleText: base64.decode(scramble.scrambleText),
          scrambleImage: base64.decode(scramble.scrambleImage),
          scrambleLoading: false,
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const _timerScreenHeaderIcons = [
    timerSettings.shouldGenerateScrambles && !scrambleData.scrambleLoading && (
      <View key={0} style={styles.timerScreenHeaderIcons}>
        <Pressable
          onPress={() => {
            dispatch(toggleEditScrambleModalVisibility());
            dispatch(toggleEditScrambleModalVisibilityFromModal());
          }}>
          <View style={styles.centerIcon}>
            <FontAwesomeIcon icon={faEdit} color={colors.white} size={20} />
          </View>
        </Pressable>
        <Pressable onPress={_fetchScramble}>
          <View style={styles.centerIcon}>
            <FontAwesomeIcon icon={faSyncAlt} color={colors.white} size={20} />
          </View>
        </Pressable>
      </View>
    ),
    <View key={1} style={styles.solvesScreenHeaderIcons}>
      {isSortOptionsModalVisible && <SortOptionsModal />}
      {!isSearchBarVisible && !isDeleteHeaderIconVisible && (
        <View style={styles.searchBarHeaderIcons}>
          <Pressable
            onPress={() => {
              dispatch(toggleSortOptionsModalVisibility());
              dispatch(toggleSortOptionsModalVisibilityFromModal());
            }}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      rotateZ: rotationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                },
                styles.centerIcon,
              ]}>
              <FontAwesomeIcon
                icon={faSortAmountDown}
                color={colors.white}
                size={20}
              />
            </Animated.View>
          </Pressable>
          <Pressable onPress={() => dispatch(toggleSearchBarVisibility())}>
            <View style={styles.centerIcon}>
              <FontAwesomeIcon icon={faSearch} color={colors.white} size={20} />
            </View>
          </Pressable>
        </View>
      )}
      {isDeleteHeaderIconVisible && (
        <Pressable
          onPress={() => {
            dispatch(deleteSelectedSolves());
            dispatch(toggleDeleteHeaderIconVisibility());
            dispatch(toggleSolvesSelectionMode());
          }}>
          <View style={styles.centerIcon}>
            <FontAwesomeIcon icon={faTrash} color={colors.white} size={20} />
          </View>
        </Pressable>
      )}
    </View>,
  ];

  const _headerIcons = [
    _timerScreenHeaderIcons[timerScreenHeaderIconIndex],
    <Pressable
      key={1}
      onPress={() => dispatch(toggleSelectAlgorithmsVisibility())}>
      <View style={styles.centerIcon}>
        <FontAwesomeIcon icon={faShapes} color={colors.white} size={20} />
      </View>
    </Pressable>,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  const _puzzleTitle = () => (
    <Pressable
      key={'trainerScreenHeaderTitle'}
      onPress={() => {
        dispatch(toggleSelectPuzzleModalVisibility());
        dispatch(toggleSelectPuzzleModalVisibilityFromModal());
      }}
      style={styles.puzzleView}>
      <Text style={styles.puzzleText}>{constants.puzzles[puzzle]}</Text>
      <FontAwesomeIcon icon={faCaretDown} color={colors.white} />
    </Pressable>
  );

  const _searchBarTitle = () => (
    <View
      style={[
        {
          marginLeft: isDeleteHeaderIconVisible && 60,
          marginBottom: isDeleteHeaderIconVisible && 5,
          marginRight: isDeleteHeaderIconVisible && 50,
        },
        styles.searchTextView,
      ]}>
      {isDeleteHeaderIconVisible ? (
        <Text style={styles.searchText}>{searchText}</Text>
      ) : (
        <Input
          inputStyle={styles.searchInput}
          onChangeText={val => dispatch(setSearchText(val))}
          inputContainerStyle={styles.inputContainer}
          placeholder="Search for notes"
        />
      )}
    </View>
  );

  const _headerTitles = [
    isSearchBarVisible ? _searchBarTitle() : _puzzleTitle(),
    _puzzleTitle(),
    _puzzleTitle(),
    _puzzleTitle(),
    <Text key={'appThemeScreenHeaderTitle'} style={styles.titleText}>
      Home Theme
    </Text>,
    <Text key={'settingsScreenHeaderTitle'} style={styles.titleText}>
      Settings
    </Text>,
    <Text key={'donateScreenHeaderTitle'} style={styles.titleText}>
      Donate
    </Text>,
    <Text key={'aboutScreenHeaderTitle'} style={styles.titleText}>
      About
    </Text>,
  ];

  const _header = props => (
    <View style={{backgroundColor: colors.secondary}}>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: heightAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [-55, 0],
                }),
              },
            ],
          },
          styles.headerIconsAnimatedView,
        ]}>
        <View style={styles.headerTitle}>{_headerTitles[drawerItemIndex]}</View>
        <View style={styles.headerLeftIcons}>
          {isDeleteHeaderIconVisible ? (
            <Pressable
              onPress={() => {
                dispatch(setSearchText(''));
                dispatch(setSelectedSolves([]));
                dispatch(toggleDeleteHeaderIconVisibility());
              }}>
              <View style={styles.centerIcon}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  color={colors.white}
                  size={20}
                />
              </View>
            </Pressable>
          ) : isSearchBarVisible ? (
            <View
              onStartShouldSetResponder={() => {
                dispatch(setSearchText(''));
                dispatch(toggleSearchBarVisibility());
              }}>
              <View style={styles.centerIcon}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  color={colors.white}
                  size={20}
                />
              </View>
            </View>
          ) : (
            <Pressable onPress={props.navigation.openDrawer}>
              <View style={styles.centerIcon}>
                <FontAwesomeIcon icon={faBars} color={colors.white} size={20} />
              </View>
            </Pressable>
          )}
        </View>
        <View style={styles.headerRightIcons}>
          {_headerIcons[drawerItemIndex]}
        </View>
      </Animated.View>
    </View>
  );

  const _drawerScreens = [
    {name: 'timer', component: Timer},
    {name: 'trainer', component: Trainer},
    {name: 'algorithms', component: Algorithms},
    {name: 'patterns', component: Patterns},
    {name: 'theme', component: Theme},
    {name: 'settings', component: Settings},
    {name: 'donate', component: Donate},
    {name: 'about', component: About},
  ];

  const _navigationDrawer = props => <NavigationDrawer props={props} />;

  useEffect(() => {
    isStopwatchOn ? heightAnimOut(heightAnim) : heightAnimIn(heightAnim);
  }, [isStopwatchOn]);

  useEffect(() => {
    solvesSortOption.sortOrder === 'Ascending'
      ? rotateAnimIn(rotationAnim)
      : rotateAnimOut(rotationAnim);
  }, [solvesSortOption, rotationAnim]);

  useEffect(() => {
    loadSettings({timerSettings: timerSettings}).then(settings => {
      dispatch(setTimerSettings(settings.timerSettings));
    });
  }, []);

  useEffect(() => {
    _fetchScramble();
  }, [puzzle]);

  return (
    <SafeAreaProvider>
      {isSelectPuzzleModalVisible && <SelectPuzzleModal />}
      {isEditScrambleModalVisible && (
        <EditScrambleModal setScrambleText={setScrambleTextCallback} />
      )}
      <StatusBar hidden={false} backgroundColor={colors.primary} />
      <NavigationContainer onReady={() => SplashScreen.hide()}>
        <Drawer.Navigator
          initialRouteName="Timer"
          drawerContent={props => _navigationDrawer(props)}
          screenOptions={{
            swipeEnabled: false,
            header: props => _header(props),
          }}>
          {_drawerScreens.map((screen, idx) => (
            <Drawer.Screen
              key={idx}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

Home.propTypes = {
  navigation: PropTypes.any,
};

export default memo(Home);
