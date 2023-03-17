import PropTypes from 'prop-types';
import React, {memo, useEffect, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  faStopwatch,
  faListAlt,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '_features/theme';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';
import TimerScreen from './components/TimerScreen';
import SolvesScreen from './components/SolvesScreen';
import StatsScreen from './components/StatsScreen';
import {
  setTimerScreenHeaderIconIndex,
  toggleSearchBarVisibility,
} from '../home/redux/homeSlice';
import styles from './styles/timerStyle';
import {heightAnimIn, heightAnimOut} from '../../utils/animations';

const Tab = createMaterialTopTabNavigator();

const Timer = () => {
  const heightAnim = useRef(new Animated.Value(100)).current;

  const isSearchBarVisible = useSelector(
    state => state.home.isSearchBarVisible,
  );
  const isStopwatchOn = useSelector(state => state.stopwatch.isStopwatchOn);

  const dispatch = useDispatch();

  useEffect(() => {
    isStopwatchOn ? heightAnimOut(heightAnim) : heightAnimIn(heightAnim);
  }, [isStopwatchOn]);

  const timerTab = props => (
    <Animated.View
      style={[
        styles.timerTabAnimatedView,
        {
          transform: [
            {
              translateY: heightAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [55, 0],
              }),
            },
          ],
        },
      ]}>
      <View style={styles.timerTabIconsView}>
        <Pressable
          style={[
            {
              borderColor:
                props.state.index === 0 ? colors.blue : colors.primary,
            },
            styles.timerIconView,
          ]}
          onPress={() => {
            if (isSearchBarVisible) {
              dispatch(toggleSearchBarVisibility());
            }

            dispatch(setTimerScreenHeaderIconIndex(0));
            props.navigation.navigate('timerScreen');
          }}>
          <FontAwesomeIcon
            icon={faStopwatch}
            color={props.state.index === 0 ? colors.blue : colors.white}
            size={20}
          />
        </Pressable>
        <Pressable
          style={[
            {
              borderColor:
                props.state.index === 1 ? colors.blue : colors.primary,
            },
            styles.solvesIconView,
          ]}
          onPress={() => {
            dispatch(setTimerScreenHeaderIconIndex(1));
            props.navigation.navigate('solvesScreen');
          }}>
          <FontAwesomeIcon
            icon={faListAlt}
            color={props.state.index === 1 ? colors.blue : colors.white}
            size={20}
          />
        </Pressable>
        <Pressable
          style={[
            {
              borderColor:
                props.state.index === 2 ? colors.blue : colors.primary,
            },
            styles.statsIconView,
          ]}
          onPress={() => {
            if (isSearchBarVisible) {
              dispatch(toggleSearchBarVisibility());
            }

            dispatch(setTimerScreenHeaderIconIndex(2));
            props.navigation.navigate('statsScreen');
          }}>
          <FontAwesomeIcon
            icon={faChartLine}
            color={props.state.index === 2 ? colors.blue : colors.white}
            size={20}
          />
        </Pressable>
      </View>
    </Animated.View>
  );

  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="timerScreen"
        tabBar={props => timerTab(props)}
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
        }}
        tabBarPosition="bottom">
        <Tab.Screen name="timerScreen" component={TimerScreen} />
        <Tab.Screen name="solvesScreen" component={SolvesScreen} />
        <Tab.Screen name="statsScreen" component={StatsScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

Timer.propTypes = {
  state: PropTypes.object,
  navigation: PropTypes.object,
};

export default memo(Timer);
