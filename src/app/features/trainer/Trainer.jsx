import React, {memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {ImageMessage} from '_components';
import {strings} from '_data/strings';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';

const Trainer = () => {
  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
        <ImageMessage message={strings.comingSoon} key={3} />
      </View>
    </SafeAreaProvider>
  );
};

export default memo(Trainer);
