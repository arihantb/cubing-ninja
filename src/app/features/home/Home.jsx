import PropTypes from 'prop-types';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import base64 from 'react-native-base64';
import {
  Animated,
  NativeModules,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import {Icon} from '../../components';
import {Input} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  faArrowLeft,
  faBars,
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
import {
  heightAnimIn,
  heightAnimOut,
  rotateAnimIn,
  rotateAnimOut,
} from '../../utils/animations';
import {styled, useColorScheme} from 'nativewind';
import colors from '../../../../tailwind.config';
import {useHexColor} from '../../hooks/useHexColor';

const Drawer = createDrawerNavigator();

const StyledStatusBar = styled(StatusBar, {
  props: {
    backgroundColor: true,
  },
});

const Home = () => {
  const {colorScheme} = useColorScheme();

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
  const isStatusBarVisible = useSelector(
    state => state.settings.isStatusBarVisible,
  );

  const setScrambleTextCallback = useCallback(
    async scrambleText => {
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
    },
    [dispatch, puzzle],
  );

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
      <View key={0} className="flex-row p-4 gap-6">
        <Pressable
          onPress={() => {
            dispatch(toggleEditScrambleModalVisibility());
            dispatch(toggleEditScrambleModalVisibilityFromModal());
          }}>
          <Icon
            icon={faEdit}
            color="bg-neutral-900 dark:bg-neutral-50"
            size={20}
          />
        </Pressable>
        <Pressable onPress={_fetchScramble}>
          <Icon
            icon={faSyncAlt}
            color="bg-neutral-900 dark:bg-neutral-50"
            size={20}
          />
        </Pressable>
      </View>
    ),
    <>
      {isSortOptionsModalVisible && <SortOptionsModal />}
      {!isSearchBarVisible && !isDeleteHeaderIconVisible && (
        <View className="p-4 gap-6 flex-row">
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
              ]}>
              <Icon
                icon={faSortAmountDown}
                color="bg-neutral-900 dark:bg-neutral-50"
                size={20}
              />
            </Animated.View>
          </Pressable>
          <Pressable onPress={() => dispatch(toggleSearchBarVisibility())}>
            <Icon
              icon={faSearch}
              color="bg-neutral-900 dark:bg-neutral-50"
              size={20}
            />
          </Pressable>
        </View>
      )}
      {isDeleteHeaderIconVisible && (
        <View className="p-4">
          <Pressable
            onPress={() => {
              dispatch(deleteSelectedSolves());
              dispatch(toggleDeleteHeaderIconVisibility());
              dispatch(toggleSolvesSelectionMode());
            }}>
            <Icon
              icon={faTrash}
              color="bg-neutral-900 dark:bg-neutral-50"
              size={20}
            />
          </Pressable>
        </View>
      )}
    </>,
  ];

  const _headerIcons = [
    _timerScreenHeaderIcons[timerScreenHeaderIconIndex],
    <View key={0} className="p-4">
      <Pressable onPress={() => dispatch(toggleSelectAlgorithmsVisibility())}>
        <Icon
          icon={faShapes}
          color="bg-neutral-900 dark:bg-neutral-50"
          size={20}
        />
      </Pressable>
    </View>,
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
      }}>
      <Text className="text-2xl text-indigo-500">
        {constants.puzzles[puzzle]}
      </Text>
    </Pressable>
  );

  const _searchBarTitle = () => (
    <View className="flex-row ml-10 justify-center">
      {isDeleteHeaderIconVisible ? (
        <Text className="text-xl text-white">{searchText}</Text>
      ) : (
        <Input
          inputStyle="pb-0 text-lg text-white [font-family:GoogleSans-Bold]"
          onChangeText={val => dispatch(setSearchText(val))}
          inputContainerStyle="border-b-2 border-indigo-500"
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
    <Text key={'appThemeScreenHeaderTitle'} className="text-2xl">
      Theme
    </Text>,
    <Text key={'settingsScreenHeaderTitle'} className="text-2xl">
      Settings
    </Text>,
    <Text key={'donateScreenHeaderTitle'} className="text-2xl">
      Donate
    </Text>,
    <Text key={'aboutScreenHeaderTitle'} className="text-2xl">
      About
    </Text>,
  ];

  const _header = props => (
    <Animated.View
      className="bg-neutral-100 dark:bg-neutral-800 shadow-lg shadow-neutral-900 dark:shadow-none"
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
      ]}>
      <View className="p-4 items-center justify-center">
        {_headerTitles[drawerItemIndex]}
      </View>
      <View className="absolute left-0 top-0 bottom-0 items-center justify-center">
        {isDeleteHeaderIconVisible ? (
          <Pressable
            onPress={() => {
              dispatch(setSearchText(''));
              dispatch(setSelectedSolves([]));
              dispatch(toggleDeleteHeaderIconVisibility());
            }}>
            <View className="p-4">
              <Icon
                icon={faArrowLeft}
                color="bg-neutral-900 dark:bg-neutral-50"
                size={20}
              />
            </View>
          </Pressable>
        ) : isSearchBarVisible ? (
          <Pressable
            onPress={() => {
              dispatch(setSearchText(''));
              dispatch(toggleSearchBarVisibility());
            }}>
            <View className="p-4">
              <Icon
                icon={faArrowLeft}
                color="bg-neutral-900 dark:bg-neutral-50"
                size={20}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={props.navigation.openDrawer}>
            <View className="p-4">
              <Icon
                icon={faBars}
                color="bg-neutral-900 dark:bg-neutral-50"
                size={20}
              />
            </View>
          </Pressable>
        )}
      </View>
      <View className="absolute right-0 top-0 bottom-0 items-center justify-center">
        {_headerIcons[drawerItemIndex]}
      </View>
    </Animated.View>
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
  }, [solvesSortOption]);

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
      <View className="flex-1">
        {isSelectPuzzleModalVisible && <SelectPuzzleModal />}
        {isEditScrambleModalVisible && <EditScrambleModal />}
        <StatusBar
          hidden={true}
          backgroundColor={useHexColor('bg-neutral-50 dark:bg-neutral-800')}
        />
        <NavigationContainer onReady={() => SplashScreen.hide()}>
          <Drawer.Navigator
            initialRouteName="timer"
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
      </View>
    </SafeAreaProvider>
  );
};

Home.propTypes = {
  navigation: PropTypes.any,
};

export default memo(Home);
