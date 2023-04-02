import React, {memo, useEffect} from 'react';
import moment from 'moment';
import uuid from 'react-native-uuid';
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {constants} from '_data/constants';
import {saveToLocalStorage} from '_libs';
import {addToSolves} from '../redux/solvesScreenSlice';
import {
  setInspectionPenalty,
  setInspectionTime,
  updateInspectionTime,
  setLatestSolve,
  setPressTime,
  setTime,
  toggleInspectionTimerOnStatus,
  togglePressTimerOnStatus,
  toggleRefreshScrambleStatus,
  toggleResetTimerStatus,
  toggleTimerOnStatus,
} from '../redux/stopwatchSlice';
import {
  getDigit,
  getTimeInMilliseconds,
  getTimeInString,
} from '../utils/formatTime';
import {useHexColor} from '_hooks';
import {View as MotiView} from 'moti';
import {useDerivedValue} from 'react-native-reanimated';

const Stopwatch = () => {
  const inspectionPenalty = useSelector(
    state => state.stopwatch.inspectionPenalty,
  );
  const inspectionTime = useSelector(state => state.stopwatch.inspectionTime);
  const timerSettings = useSelector(state => state.timerSettings.timerSettings);
  const isInspectionTimerOn = useSelector(
    state => state.stopwatch.isInspectionTimerOn,
  );
  const isPressTimerOn = useSelector(state => state.stopwatch.isPressTimerOn);
  const isStopwatchOn = useSelector(state => state.stopwatch.isStopwatchOn);
  const latestSolve = useSelector(state => state.stopwatch.latestSolve);
  const pressTime = useSelector(state => state.stopwatch.pressTime);
  const puzzle = useSelector(state => state.home.puzzle);
  const scrambleData = useSelector(state => state.home.scrambleData);
  const shouldResetTimer = useSelector(
    state => state.stopwatch.shouldResetTimer,
  );
  const solves = useSelector(state => state.solvesScreen.solves);
  const time = useSelector(state => state.stopwatch.time);

  const dispatch = useDispatch();

  const duration = moment.duration(time);
  const greenColor = useHexColor('bg-green-500');
  const redColor = useHexColor('bg-red-500');
  const neutralColor = useHexColor('bg-neutral-50');

  const _getTime = () => {
    let timeInString =
      (getDigit(duration.seconds(), 1) > 0
        ? getDigit(duration.seconds(), 1).toString()
        : '') +
      getDigit(duration.seconds(), 0).toString() +
      constants.dot +
      getDigit(duration.milliseconds(), 2).toString() +
      getDigit(duration.milliseconds(), 1).toString() +
      getDigit(duration.milliseconds(), 0).toString();

    if (duration.minutes()) {
      timeInString +=
        (getDigit(duration.minutes(), 1) > 0
          ? getDigit(duration.minutes(), 1).toString()
          : '') +
        getDigit(duration.minutes(), 0).toString() +
        constants.colon;
    }

    return timeInString;
  };

  const _storeSolve = async () => {
    const latestSolve_ = {
      id: uuid.v4(),
      date: new Date().toString(),
      time: inspectionPenalty === 'DNF' ? '--' : _getTime(),
      scrambleText: scrambleData.scrambleText,
      scrambleImage: scrambleData.scrambleImage,
      penalty: inspectionPenalty,
      penalizedTime:
        inspectionPenalty === '+2'
          ? getTimeInString(getTimeInMilliseconds(_getTime()) + 2000)
          : inspectionPenalty === 'DNF'
          ? getTimeInString(Number.MAX_VALUE)
          : _getTime(),
      comments: '',
    };
    dispatch(setLatestSolve(latestSolve_));
    dispatch(addToSolves(latestSolve_));
  };

  const _pressableComponentWhenTimerOn = children => (
    <Pressable
      className="flex-1 flex-row"
      onPress={() => {
        dispatch(toggleTimerOnStatus());
        _storeSolve();
        dispatch(toggleRefreshScrambleStatus());
      }}>
      {children}
    </Pressable>
  );

  const _pressableComponentWhenInspectionTimerOn = children => (
    <Pressable
      className="flex-1 flex-row"
      onPressIn={() => {
        if (!isPressTimerOn) {
          dispatch(togglePressTimerOnStatus());
        }
      }}
      onPressOut={() => {
        if (isPressTimerOn) {
          dispatch(togglePressTimerOnStatus());
        }

        if (pressTime > 500) {
          dispatch(toggleTimerOnStatus());
          dispatch(toggleInspectionTimerOnStatus());
          dispatch(setInspectionTime(timerSettings.inspectionDuration));
        } else {
          dispatch(setPressTime(0));
        }
      }}>
      {children}
    </Pressable>
  );

  const _pressableComponentWhenTimerOffAndInspectionEnabled = children => (
    <Pressable
      className="flex-1 flex-row"
      onPress={() => {
        dispatch(setInspectionPenalty(''));
        dispatch(toggleInspectionTimerOnStatus());
      }}>
      {children}
    </Pressable>
  );

  const _pressableComponentWhenTimerOffAndInspectionNotEnabled = children => (
    <Pressable
      className="flex-1 flex-row"
      onPressIn={() => {
        if (!isPressTimerOn) {
          dispatch(togglePressTimerOnStatus());
        }
      }}
      onPressOut={() => {
        if (isPressTimerOn) {
          dispatch(togglePressTimerOnStatus());
        }

        if (pressTime > 500) {
          dispatch(toggleTimerOnStatus());
          dispatch(setInspectionPenalty(''));
        } else {
          dispatch(setPressTime(0));
        }
      }}>
      {children}
    </Pressable>
  );

  const _pressableComponent = children => {
    if (isStopwatchOn) {
      return _pressableComponentWhenTimerOn(children);
    } else if (isInspectionTimerOn) {
      return _pressableComponentWhenInspectionTimerOn(children);
    }

    return timerSettings.isInspectionEnabled
      ? _pressableComponentWhenTimerOffAndInspectionEnabled(children)
      : _pressableComponentWhenTimerOffAndInspectionNotEnabled(children);
  };

  const scale = useDerivedValue(() => (isStopwatchOn ? 1.5 : 1));

  const _formatTimer = (children, key) => (
    <View key={key} className="flex-row items-center justify-center">
      <Text
        className="text-7xl text-center"
        style={[
          {
            width: (key !== 2 && key !== 5 && 38) || 'auto',
            color:
              pressTime > 0 && !isStopwatchOn
                ? pressTime > 500
                  ? greenColor
                  : redColor
                : neutralColor,
          },
        ]}>
        {children}
      </Text>
    </View>
  );

  const _renderTimer = () => {
    if (inspectionPenalty === 'DNF') {
      return (
        <View className="flex-row items-center justify-center">
          <Text
            className="text-7xl"
            style={[
              {
                color:
                  pressTime > 0 && !isStopwatchOn
                    ? pressTime > 500
                      ? greenColor
                      : redColor
                    : neutralColor,
              },
            ]}>
            DNF
          </Text>
        </View>
      );
    }

    const timeInString = [
      getDigit(duration.seconds(), 1) > 0 &&
        _formatTimer(getDigit(duration.seconds(), 1), 3),
      _formatTimer(getDigit(duration.seconds(), 0), 4),
      _formatTimer(constants.dot, 5),
      _formatTimer(getDigit(duration.milliseconds(), 2), 6),
      _formatTimer(getDigit(duration.milliseconds(), 1), 7),
      _formatTimer(getDigit(duration.milliseconds(), 0), 8),
    ];

    if (duration.minutes()) {
      timeInString.unshift(
        ...[
          getDigit(duration.minutes(), 1) > 0 &&
            _formatTimer(getDigit(duration.minutes(), 1), 0),
          _formatTimer(getDigit(duration.minutes(), 0), 1),
          _formatTimer(constants.colon, 2),
        ],
      );
    }

    return (
      <View className="flex-1 flex-row items-center justify-center">
        {timeInString}
      </View>
    );
  };

  const _renderInspectionTimer = () => (
    <View className="flex-1 flex-row items-center justify-center">
      <Text
        className="text-7xl"
        style={[
          {
            color:
              pressTime > 0
                ? pressTime > 500
                  ? greenColor
                  : redColor
                : neutralColor,
          },
        ]}>
        {inspectionPenalty === '' ? inspectionTime : inspectionPenalty}
      </Text>
    </View>
  );

  useEffect(() => {
    let interval;

    if (isPressTimerOn) {
      const startTime = Date.now();
      dispatch(setPressTime(0));

      interval = setInterval(() => {
        dispatch(setPressTime(Date.now() - startTime));
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPressTimerOn, dispatch]);

  useEffect(() => {
    let interval;

    if (isStopwatchOn) {
      const startTime = Date.now();
      dispatch(setTime(0));

      interval = setInterval(() => {
        dispatch(setTime(Date.now() - startTime));
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isStopwatchOn, dispatch]);

  useEffect(() => {
    let interval;

    if (isInspectionTimerOn) {
      interval = setInterval(() => {
        dispatch(updateInspectionTime(1));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isInspectionTimerOn, dispatch]);

  useEffect(() => {
    if (solves.length !== 0) {
      saveToLocalStorage(`solves/${puzzle}`, solves);
    }
  }, [latestSolve]);

  if (shouldResetTimer) {
    dispatch(setTime(0));
    dispatch(toggleResetTimerStatus());
  }

  if (inspectionTime === 0 && inspectionPenalty === '') {
    dispatch(setInspectionPenalty('+2'));
  } else if (inspectionTime === -2 && inspectionPenalty === '+2') {
    dispatch(setInspectionPenalty('DNF'));
  }

  if (isInspectionTimerOn && inspectionPenalty === 'DNF') {
    dispatch(toggleInspectionTimerOnStatus());
    dispatch(setInspectionTime(timerSettings.inspectionDuration));
    dispatch(toggleRefreshScrambleStatus());
  }

  return (
    <MotiView
      className="flex-1 bg-neutral-50 dark:bg-neutral-900 items-center justify-center"
      animate={useDerivedValue(() => ({scale: scale.value}))}
      transition={{type: 'timing', duration: 200}}>
      {_pressableComponent(
        timerSettings.isInspectionEnabled &&
          isInspectionTimerOn &&
          !isStopwatchOn
          ? _renderInspectionTimer()
          : _renderTimer(),
      )}
    </MotiView>
  );
};

export default memo(Stopwatch);
