import React, {memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ImageMessage} from '_components';
import {strings} from '_data/strings';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';

const Trainer = () => {
  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      <ImageMessage message={strings.comingSoon} key={3} />
    </SafeAreaProvider>
  );
};

export default memo(Trainer);
