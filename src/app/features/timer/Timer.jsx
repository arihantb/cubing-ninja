import PropTypes from 'prop-types';
import React, {memo, useEffect, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  faStopwatch,
  faListAlt,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';
import TimerScreen from './components/TimerScreen';
import SolvesScreen from './components/SolvesScreen';
import StatsScreen from './components/StatsScreen';
import {
  setTimerScreenHeaderIconIndex,
  toggleSearchBarVisibility,
} from '../home/redux/homeSlice';
import {heightAnimIn, heightAnimOut} from '../../utils/animations';
import {Icon} from '../../components';

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
      className="bg-neutral-50 dark:bg-neutral-800"
      style={[
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
      <View className="flex-row">
        <Pressable
          className={`flex-1 p-4 items-center justify-center border-t-2 ${
            props.state.index === 0 ? 'border-indigo-500' : 'border-transparent'
          }`}
          onPress={() => {
            if (isSearchBarVisible) {
              dispatch(toggleSearchBarVisibility());
            }

            dispatch(setTimerScreenHeaderIconIndex(0));
            props.navigation.navigate('timerScreen');
          }}>
          <Icon
            icon={faStopwatch}
            color={
              props.state.index === 0
                ? 'bg-indigo-500'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
        </Pressable>
        <Pressable
          className={`flex-1 p-4 items-center justify-center border-t-2 ${
            props.state.index === 1 ? 'border-indigo-500' : 'border-transparent'
          }`}
          onPress={() => {
            dispatch(setTimerScreenHeaderIconIndex(1));
            props.navigation.navigate('solvesScreen');
          }}>
          <Icon
            icon={faListAlt}
            color={
              props.state.index === 1
                ? 'bg-indigo-500'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
            size={20}
          />
        </Pressable>
        <Pressable
          className={`flex-1 p-4 items-center justify-center border-t-2 ${
            props.state.index === 2 ? 'border-indigo-500' : 'border-transparent'
          }`}
          onPress={() => {
            if (isSearchBarVisible) {
              dispatch(toggleSearchBarVisibility());
            }

            dispatch(setTimerScreenHeaderIconIndex(2));
            props.navigation.navigate('statsScreen');
          }}>
          <Icon
            icon={faChartLine}
            color={
              props.state.index === 2
                ? 'bg-indigo-500'
                : 'bg-neutral-900 dark:bg-neutral-50'
            }
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
