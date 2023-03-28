import React, {memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {ImageMessage} from '_components';
import PatternsGrid from './components/PatternsGrid';
import {strings} from '_data/strings';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';

const _twoByTwo = {
  puzzle: 'twoByTwo',
  downloadInfo: strings.twoByTwoPatterns,
};

const _threeByThree = {
  puzzle: 'threeByThree',
  downloadInfo: strings.threeByThreePatterns,
};

const _fourByFour = {
  puzzle: 'fourByFour',
  downloadInfo: strings.fourByFourPatterns,
};

const PatternsNavigation = () => {
  const puzzle = useSelector(state => state.home.puzzle);

  useDoubleBackTapToExit();

  const patterns = [
    <PatternsGrid
      key={0}
      puzzle={_twoByTwo.puzzle}
      downloadInfo={_twoByTwo.downloadInfo}
    />,
    <PatternsGrid
      key={1}
      puzzle={_threeByThree.puzzle}
      downloadInfo={_threeByThree.downloadInfo}
    />,
    <PatternsGrid
      key={2}
      puzzle={_fourByFour.puzzle}
      downloadInfo={_fourByFour.downloadInfo}
    />,
    <ImageMessage message={strings.comingSoon} key={3} />,
    <ImageMessage message={strings.comingSoon} key={4} />,
    <ImageMessage message={strings.comingSoon} key={5} />,
    <ImageMessage message={strings.comingSoon} key={6} />,
    <ImageMessage message={strings.comingSoon} key={7} />,
    <ImageMessage message={strings.comingSoon} key={8} />,
    <ImageMessage message={strings.comingSoon} key={9} />,
    <ImageMessage message={strings.comingSoon} key={10} />,
  ];

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
        {patterns[puzzle]}
      </View>
    </SafeAreaProvider>
  );
};

export default memo(PatternsNavigation);
