import React, {memo, useRef, useEffect} from 'react';
import {Animated, View} from 'react-native';
import {LinearProgress} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {loadFromLocalStorage} from '_libs';
import Stopwatch from './Stopwatch';
import ScrambleImageModal from '../modals/ScrambleImageModal';
import {
  setLeftStats,
  setRightStats,
  setScrambleImageHeight,
  setScrambleTextHeight,
  toggleScrambleImageModalVisibility,
} from '../redux/timerScreenSlice';
import {heightAnimOut, heightAnimIn} from '../../../utils/animations';
import {getTimeInMilliseconds, getTimeInString} from '../utils/formatTime';
import {useHexColor} from '../../../hooks/useHexColor';
import {Loading} from '../../../components';

const TimerScreen = () => {
  const heightAnim = useRef(new Animated.Value(100)).current;

  const isScrambleImageModalVisible = useSelector(
    state => state.timerScreen.isScrambleImageModalVisible,
  );
  const isStopwatchOn = useSelector(state => state.stopwatch.isStopwatchOn);
  const solves = useSelector(state => state.solvesScreen.solves);
  const leftStats = useSelector(state => state.timerScreen.leftStats);
  const puzzle = useSelector(state => state.home.puzzle);
  const rightStats = useSelector(state => state.timerScreen.rightStats);
  const scrambleData = useSelector(state => state.home.scrambleData);
  const scrambleImageHeight = useSelector(
    state => state.timerScreen.scrambleImageHeight,
  );
  const scrambleTextHeight = useSelector(
    state => state.timerScreen.scrambleTextHeight,
  );
  const timerSettings = useSelector(state => state.timerSettings.timerSettings);

  const dispatch = useDispatch();

  const _getLeftStats = async () => {
    let deviation = 0;
    let average = 0;
    let best = Number.MAX_VALUE;
    let count = 0;
    let total = 0;
    let solvesLength = 0;

    const solves = await loadFromLocalStorage(`solves/${puzzle}`);

    if (
      solves === null ||
      solves.length === 0 ||
      solves.every(val => val.penalty === 'DNF')
    ) {
      return `Deviation: --\nAverage: --\nBest: --\nCount: ${
        solves === null ? 0 : solves.length
      }`;
    }

    solvesLength = solves.length;

    solves.forEach(val => {
      if (val.penalty !== 'DNF') {
        total += getTimeInMilliseconds(val.penalizedTime);

        if (best > getTimeInMilliseconds(val.penalizedTime)) {
          best = getTimeInMilliseconds(val.penalizedTime);
        }

        count++;
      }
    });

    solves.forEach(val => {
      if (val.penalty !== 'DNF') {
        deviation += (getTimeInMilliseconds(val.penalizedTime) - average) ** 2;
      }
    });

    deviation = getTimeInString(Math.sqrt(deviation / count));
    average = getTimeInString(total / count);
    best = getTimeInString(best);

    return `Deviation: ${deviation}\nAverage: ${average}\nBest: ${best}\nCount: ${solvesLength}`;
  };

  const _getRightStats = async () => {
    let ao5 = '--';
    let ao12 = '--';
    let ao50 = '--';
    let ao100 = '--';
    let total = 0;
    let best = Number.MAX_VALUE;
    let worst = Number.MIN_VALUE;
    let dnfCount = 0;

    const solves = await loadFromLocalStorage(`solves/${puzzle}`);

    if (solves === null || solves.length === 0) {
      return 'Ao5: --\nAo12: --\nAo50: --\nAo100: --';
    }

    solves.forEach((val, idx) => {
      if (val.penalty === 'DNF' && idx < 100) {
        dnfCount++;
      }

      if (dnfCount < 2) {
        total += getTimeInMilliseconds(val.penalizedTime);
        if (best > getTimeInMilliseconds(val.penalizedTime)) {
          best = getTimeInMilliseconds(val.penalizedTime);
        }
        if (worst < getTimeInMilliseconds(val.penalizedTime)) {
          worst = getTimeInMilliseconds(val.penalizedTime);
        }
        if (idx >= 4) {
          ao5 = getTimeInString((total - best - worst) / 3);
        }
        if (idx >= 11) {
          ao12 = getTimeInString((total - best - worst) / 10);
        }
        if (idx >= 49) {
          ao50 = getTimeInString((total - best - worst) / 48);
        }
        if (idx >= 99) {
          ao100 = getTimeInString((total - best - worst) / 98);
        }
      } else {
        if (idx >= 4) {
          ao5 = 'DNF';
        }
        if (idx >= 11) {
          ao12 = 'DNF';
        }
        if (idx >= 49) {
          ao50 = 'DNF';
        }
        if (idx >= 99) {
          ao100 = 'DNF';
        }
      }
    });

    return `Ao5: ${ao5}\nAo12: ${ao12}\nAo50: ${ao50}\nAo100: ${ao100}`;
  };

  const _updateStatus = () => {
    _getLeftStats().then(val => dispatch(setLeftStats(val)));
    _getRightStats().then(val => dispatch(setRightStats(val)));
  };

  useEffect(() => {
    _updateStatus();
  }, [solves]);

  useEffect(() => {
    isStopwatchOn ? heightAnimOut(heightAnim) : heightAnimIn(heightAnim);
  }, [isStopwatchOn]);

  const indigoHexColor = useHexColor('bg-indigo-500');

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      {isScrambleImageModalVisible && <ScrambleImageModal />}
      <Stopwatch />
      {timerSettings.shouldGenerateScrambles && (
        <Animated.View
          className="absolute flex-row top-0 p-4"
          style={[
            {
              transform: [
                {
                  translateY: heightAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-scrambleTextHeight - 55, 0],
                  }),
                },
              ],
            },
          ]}
          onLayout={event =>
            dispatch(setScrambleTextHeight(event.nativeEvent.layout.height))
          }>
          {scrambleData.scrambleLoading ? (
            <LinearProgress color={indigoHexColor} />
          ) : (
            <Text className="flex-1 text-center">
              {scrambleData.scrambleText}
            </Text>
          )}
        </Animated.View>
      )}
      <Animated.View
        className="absolute flex-row bottom-0 p-4"
        style={[
          {
            transform: [
              {
                translateY: heightAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [scrambleImageHeight + 55, 0],
                }),
              },
            ],
          },
        ]}
        onLayout={event => {
          dispatch(setScrambleImageHeight(event.nativeEvent.layout.height));
        }}>
        <Text className="flex-1">{leftStats}</Text>
        {scrambleData.scrambleImage !== '' &&
          timerSettings.shouldGenerateScrambles &&
          (scrambleData.scrambleLoading ? (
            <Loading color="bg-indigo-500" size="large" />
          ) : (
            <SvgXml
              xml={scrambleData.scrambleImage}
              height="100%"
              width="40%"
              onPress={() => dispatch(toggleScrambleImageModalVisibility())}
            />
          ))}
        <Text className="flex-1 text-right">{rightStats}</Text>
      </Animated.View>
    </View>
  );
};

export default memo(TimerScreen);
