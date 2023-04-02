import React, {memo, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated';
import {LinearProgress} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {loadFromLocalStorage} from '_libs';
import Stopwatch from './Stopwatch';
import ScrambleImageModal from '../modals/ScrambleImageModal';
import {
  setStats,
  setScrambleImageHeight,
  setScrambleTextHeight,
  toggleScrambleImageModalVisibility,
} from '../redux/timerScreenSlice';
import {getTimeInMilliseconds, getTimeInString} from '../utils/formatTime';
import {useHexColor} from '_hooks';
import {Loading} from '../../../components';
import {AnimatePresence, View as MotiView} from 'moti';

const TimerScreen = () => {
  const isScrambleImageModalVisible = useSelector(
    state => state.timerScreen.isScrambleImageModalVisible,
  );
  const isStopwatchOn = useSelector(state => state.stopwatch.isStopwatchOn);
  const solves = useSelector(state => state.solvesScreen.solves);
  const puzzle = useSelector(state => state.home.puzzle);
  const stats = useSelector(state => state.timerScreen.stats);
  const scrambleData = useSelector(state => state.home.scrambleData);
  const timerSettings = useSelector(state => state.timerSettings.timerSettings);

  const dispatch = useDispatch();

  const _getStats = async () => {
    let ao5 = '--';
    let ao12 = '--';
    let ao50 = '--';
    let ao100 = '--';
    let total = 0;
    let best = Number.MAX_VALUE;
    let worst = Number.MIN_VALUE;
    let dnfCount = 0;

    const solves = await loadFromLocalStorage(`solves/${puzzle}`);

    solves?.forEach((val, idx) => {
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

    return {ao5, ao12, ao50, ao100};
  };

  const _updateStatus = () => {
    _getStats().then(val => dispatch(setStats(val)));
  };

  useEffect(() => {
    _updateStatus();
  }, [solves]);

  const indigoHexColor = useHexColor('bg-indigo-500');

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      {isScrambleImageModalVisible && <ScrambleImageModal />}
      <Stopwatch />
      <AnimatePresence>
        {timerSettings.shouldGenerateScrambles && !isStopwatchOn && (
          <MotiView
            from={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            layout={Layout}
            transition={{type: 'timing'}}
            className="absolute flex-row top-0 p-4"
            onLayout={event =>
              dispatch(setScrambleTextHeight(event.nativeEvent.layout.height))
            }>
            {scrambleData.scrambleLoading ? (
              <LinearProgress color={indigoHexColor} />
            ) : (
              <Text className="flex-1 text-lg text-center">
                {scrambleData.scrambleText}
              </Text>
            )}
          </MotiView>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isStopwatchOn && (
          <MotiView
            from={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            layout={Layout}
            transition={{type: 'timing'}}
            className="absolute flex-row bottom-0 p-4 gap-4"
            onLayout={event => {
              dispatch(setScrambleImageHeight(event.nativeEvent.layout.height));
            }}>
            {scrambleData.scrambleImage !== '' &&
              timerSettings.shouldGenerateScrambles &&
              (scrambleData.scrambleLoading ? (
                <Loading color="bg-indigo-500" size="large" />
              ) : (
                <View className="flex-1 p-2 rounded-md bg-neutral-800">
                  <SvgXml
                    xml={scrambleData.scrambleImage}
                    height="100%"
                    width="100%"
                    onPress={() =>
                      dispatch(toggleScrambleImageModalVisibility())
                    }
                  />
                </View>
              ))}
            <View className="flex-1 rounded-md bg-neutral-800">
              <View className="flex-row p-2">
                <View className="flex-1">
                  <Text className="flex-1 text-center">AO5</Text>
                  <Text className="flex-1 text-3xl text-center text-indigo-500">
                    {stats.ao5}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="flex-1 text-center">AO12</Text>
                  <Text className="flex-1 text-3xl text-center text-indigo-500">
                    {stats.ao12}
                  </Text>
                </View>
              </View>
              <View className="flex-row p-2">
                <View className="flex-1">
                  <Text className="flex-1 text-center">AO50</Text>
                  <Text className="flex-1 text-3xl text-center text-indigo-500">
                    {stats.ao50}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="flex-1 text-center">AO100</Text>
                  <Text className="flex-1 text-3xl text-center text-indigo-500">
                    {stats.ao100}
                  </Text>
                </View>
              </View>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

export default memo(TimerScreen);
