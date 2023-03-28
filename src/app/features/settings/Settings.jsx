import Flag from 'react-native-flags';
import React, {memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';
import {Text} from '_components';
import LanguageModal from './modals/LanguageModal';
import AlgorithmsSettings from './components/AlgorithmsSettings';
import GeneralSettings from './components/GeneralSettings';
import TimerSettings from './components/TimerSettings';
import {
  toggleAlgorithmsSettingsVisibility,
  toggleGeneralSettingsVisibility,
  toggleLanguageModalVisibility,
  toggleTimerSettingsVisibility,
} from './redux/settingsSlice';

const SettingsNavigation = () => {
  const isAlgorithmsSettingsVisible = useSelector(
    state => state.settings.isAlgorithmsSettingsVisible,
  );
  const isGeneralSettingsVisible = useSelector(
    state => state.settings.isGeneralSettingsVisible,
  );
  const isLanguageModalVisible = useSelector(
    state => state.settings.isLanguageModalVisible,
  );
  const isTimerSettingsVisible = useSelector(
    state => state.settings.isTimerSettingsVisible,
  );
  const language = useSelector(state => state.settings.language);

  const dispatch = useDispatch();

  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      {isLanguageModalVisible && <LanguageModal />}
      {isGeneralSettingsVisible && <GeneralSettings />}
      {isTimerSettingsVisible && <TimerSettings />}
      {isAlgorithmsSettingsVisible && <AlgorithmsSettings />}
      <View className="flex-1 p-8 bg-neutral-50 dark:bg-neutral-900">
        <Pressable
          className="m-4"
          onPress={() => dispatch(toggleGeneralSettingsVisibility())}>
          <Text>General</Text>
        </Pressable>
        <Pressable
          className="m-4"
          onPress={() => dispatch(toggleTimerSettingsVisibility())}>
          <Text>Timer</Text>
        </Pressable>
        <Pressable
          className="m-4"
          onPress={() => dispatch(toggleAlgorithmsSettingsVisibility())}>
          <Text>Algorithm</Text>
        </Pressable>
        <Pressable
          className="m-4 flex-row items-center justify-center"
          onPress={() => dispatch(toggleLanguageModalVisibility())}>
          <Text>Language</Text>
          <View className="mr-5 items-end justify-center">
            <Flag code={language} size={32} type="flat" />
          </View>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

export default memo(SettingsNavigation);
