import React, {memo, useEffect} from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ImageMessage} from '_components';
import {strings} from '_data/strings';
import {getTimeInMilliseconds, getTimeInString} from '../utils/formatTime';
import {
  setAllSolves,
  setAo12Solves,
  setBestSolves,
  setPenaltySolves,
  toggleUpdateStatsStatus,
} from '../redux/statsScreenSlice';

const StatsScreen = () => {
  const allSolves = useSelector(state => state.statsScreen.allSolves);
  const ao12Solves = useSelector(state => state.statsScreen.ao12Solves);
  const bestSolves = useSelector(state => state.statsScreen.bestSolves);
  const puzzle = useSelector(state => state.home.puzzle);
  const penaltySolves = useSelector(state => state.statsScreen.penaltySolves);
  const shouldUpdateStats = useSelector(
    state => state.statsScreen.shouldUpdateStats,
  );
  const solves = useSelector(state => state.solvesScreen.solves);

  const dispatch = useDispatch();

  const _updateStats = () => {
    if (solves === null || solves.length === 0) {
      dispatch(setAllSolves([]));
      dispatch(setBestSolves([]));
      dispatch(setAo12Solves([]));
      dispatch(setPenaltySolves([]));
      return;
    }

    [...solves].sort(
      (first, next) => new Date(first.date) - new Date(next.date),
    );

    const auxSolves = [];
    const auxBest = [];
    const auxAo12 = [];
    const auxPenalty = [];
    let timeFirst = 0;
    let j = 0;
    let dnfCount = 0;
    let lastBest = getTimeInMilliseconds(solves[0].penalizedTime);

    solves.forEach((val, idx) => {
      if (val.time !== '--') {
        const time = getTimeInMilliseconds(val.penalizedTime);
        auxSolves.push(time);

        if (val.penalty !== 'DNF') {
          if (val.penalty === '+2') {
            auxPenalty.push(time);
          } else {
            auxPenalty.push(null);
          }

          if (idx >= 12 + j) {
            let total = 0;
            let best = Number.MAX_VALUE;
            let worst = Number.MIN_VALUE;

            for (let k = j; k < idx + j && k !== solves.length; k++) {
              const timeTemp = getTimeInMilliseconds(solves[k].penalizedTime);
              total += timeTemp;
              best = timeTemp < best ? timeTemp : best;
              worst = timeTemp > worst ? timeTemp : worst;
            }

            if (dnfCount < 2) {
              worst === 'DNF'
                ? auxAo12.push((total - best - timeFirst) / 10)
                : auxAo12.push((total - best - worst - timeFirst) / 10);
            } else {
              auxAo12.push(null);
            }

            timeFirst = parseFloat(
              getTimeInMilliseconds(solves[j].penalizedTime),
            );

            j++;
          } else {
            auxAo12.push(null);
          }
        } else if (idx <= 12 + j && val.penalty === 'DNF') {
          dnfCount++;
        }
      }
    });

    solves.forEach((val, idx) => {
      if (val.time !== '--') {
        const time = getTimeInMilliseconds(val.penalizedTime);

        if (time < lastBest) {
          auxBest.push(time);
          lastBest = time;
        } else {
          auxBest.push(idx === 0 ? lastBest : null);
        }
      }
    });

    dispatch(setAllSolves(auxSolves));
    dispatch(setBestSolves(auxBest));
    dispatch(setAo12Solves(auxAo12));
    dispatch(setPenaltySolves(auxPenalty));
  };

  if (shouldUpdateStats) {
    _updateStats();
    dispatch(toggleUpdateStatsStatus());
  }

  useEffect(() => {
    _updateStats();
  }, [puzzle]);

  const solvesData = [];
  const bestSolvesData = [];
  const ao12SolvesData = [];
  const penaltySolvesData = [];
  const legend = [];

  if (allSolves.length !== 0) {
    allSolves.forEach((val, idx) => solvesData.push({x: idx + 1, y: val}));

    legend.push({
      name: 'All',
      symbol: {fill: '#FFFFFF'},
      labels: {fill: '#FFFFFF', fontSize: 12},
    });
  }

  if (bestSolves.length !== 0) {
    bestSolves.forEach((val, idx) => {
      if (val !== null) {
        bestSolvesData.push({x: idx + 1, y: val});
      }
    });

    legend.push({
      name: 'Best',
      symbol: {fill: '#FFFF00'},
      labels: {fill: '#FFFFFF', fontSize: 12},
    });
  }

  if (ao12Solves.length !== 0) {
    ao12Solves.forEach((val, idx) => {
      if (val !== null) {
        ao12SolvesData.push({x: idx, y: val});
      }
    });

    if (ao12SolvesData.length !== 0) {
      legend.push({
        name: 'Ao12',
        symbol: {fill: '#00FF00'},
        labels: {fill: '#FFFFFF', fontSize: 12},
      });
    }
  }

  if (penaltySolves.length !== 0) {
    penaltySolves.forEach((val, idx) => {
      if (val !== null) {
        penaltySolvesData.push({x: idx + 1, y: val});
      }
    });

    if (penaltySolvesData.length !== 0) {
      legend.push({
        name: 'Penalty (+2)',
        symbol: {fill: '#FF0000'},
        labels: {fill: '#FFFFFF', fontSize: 12},
      });
    }
  }

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      <View
        className="flex-1"
        style={[{paddingLeft: solvesData.length === 0 && 0}]}>
        {solvesData.length === 0 ? (
          <ImageMessage message={strings.noSolves} />
        ) : (
          <VictoryChart
            domain={{
              x: [0, solvesData.length + 1],
              y: [Math.min(...allSolves) - 2000, Math.max(...allSolves) + 2000],
            }}>
            <VictoryAxis
              dependentAxis
              tickFormat={(tick, _, ticks) =>
                ticks.every(val => val < 60000)
                  ? getTimeInString(tick)
                  : getTimeInString(tick).split('.')[0]
              }
              style={{
                axis: {
                  stroke: '#FFFFFF',
                  strokeWidth: 1,
                },
                tickLabels: {
                  fontSize: 12,
                  fill: '#FFFFFF',
                  padding: 15,
                },
                grid: {
                  stroke: '#FFFFFF',
                  strokeDasharray: 2,
                },
              }}
            />
            <VictoryAxis
              dependentAxis={false}
              style={{
                axis: {
                  stroke: '#FFFFFF',
                  strokeWidth: 1,
                },
                tickLabels: {
                  fontSize: 12,
                  fill: '#FFFFFF',
                  padding: 15,
                },
                grid: {
                  stroke: 'none',
                },
              }}
            />
            {solvesData.length === 1 ? (
              <VictoryScatter
                data={solvesData}
                size={4}
                style={{
                  data: {
                    fill: '#FFFFFF',
                  },
                }}
              />
            ) : (
              <VictoryLine
                data={solvesData}
                style={{
                  data: {
                    stroke: '#FFFFFF',
                    strokeWidth: 2,
                  },
                }}
              />
            )}
            <VictoryGroup data={bestSolvesData}>
              <VictoryLine
                style={{
                  data: {
                    stroke: '#FFFF00',
                    strokeWidth: 2,
                    strokeDasharray: 2,
                  },
                }}
              />
              <VictoryScatter
                size={4}
                style={{
                  data: {
                    fill: '#FFFF00',
                  },
                }}
              />
            </VictoryGroup>
            {ao12SolvesData.length === 1 ? (
              <VictoryScatter
                size={4}
                data={ao12SolvesData}
                style={{
                  data: {
                    fill: '#00FF00',
                  },
                }}
              />
            ) : (
              <VictoryLine
                data={ao12SolvesData}
                style={{
                  data: {
                    stroke: '#00FF00',
                    strokeWidth: 2,
                  },
                }}
              />
            )}
            <VictoryScatter
              data={penaltySolvesData}
              size={4}
              style={{
                data: {
                  fill: '#FF0000',
                },
              }}
            />
          </VictoryChart>
        )}
        {solvesData.length !== 0 && (
          <VictoryLegend
            orientation="horizontal"
            x={20}
            gutter={20}
            data={legend}
          />
        )}
      </View>
    </View>
  );
};

export default memo(StatsScreen);
