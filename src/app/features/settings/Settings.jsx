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
import styles from './styles/settingsStyle';
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
      <View style={styles.mainView}>
        <Pressable
          style={styles.copyDeviceInfo}
          onPress={() => dispatch(toggleGeneralSettingsVisibility())}>
          <Text style={styles.copyDeviceInfoTitle}>General</Text>
        </Pressable>
        <Pressable
          style={styles.copyDeviceInfo}
          onPress={() => dispatch(toggleTimerSettingsVisibility())}>
          <Text style={styles.copyDeviceInfoTitle}>Timer</Text>
        </Pressable>
        <Pressable
          style={styles.copyDeviceInfo}
          onPress={() => dispatch(toggleAlgorithmsSettingsVisibility())}>
          <Text style={styles.copyDeviceInfoTitle}>Algorithm</Text>
        </Pressable>
        <Pressable
          style={{
            margin: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => dispatch(toggleLanguageModalVisibility())}>
          <Text style={styles.copyDeviceInfoTitle}>Language</Text>
          <View
            style={{
              marginRight: 20,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Flag code={language} size={32} type="flat" />
          </View>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

export default memo(SettingsNavigation);
