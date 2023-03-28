import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Pressable, Switch, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Text} from '_components';
import {strings} from '_data/strings';
import {
  toggleGeneralSettingsVisibility,
  toggleStatusBarVisibility,
} from '../redux/settingsSlice';
import FullScreenChz from 'react-native-fullscreen-chz';

const GeneralSettings = () => {
  const [visible, setVisible] = useState(true);
  const [swipeTabs, setSwipeTabs] = useState(true);
  const isStatusBarVisible = useSelector(
    state => state.settings.isStatusBarVisible,
  );

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onModalHide={() => dispatch(toggleGeneralSettingsVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      className="m-0"
      isVisible={visible}>
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
        <Header
          title={strings.generalSettingsTitle}
          backButtonAction={setVisible}
        />
        <View className="pl-14">
          <View className="flex-row">
            <Pressable
              className="flex-1 m-4"
              onPress={() => {
                // some action
              }}>
              <Text className="mb-1 text-lg">Allow swiping between tabs</Text>
              <Text>
                If this is disabled, you&apos;ll have to tap the tabs to switch
                between them
              </Text>
            </Pressable>
            <View className="mr-5 justify-center">
              <Switch
                val={swipeTabs}
                onValueChange={val => setSwipeTabs(val)}
              />
            </View>
          </View>
          <View className="flex-row">
            <View>
              <Text className="mb-1 text-lg">Fullscreen</Text>
              <Text>In fullscreen mode, hides the status bar</Text>
            </View>
            <Switch
              className="flex-1"
              isChecked={isStatusBarVisible}
              onToggle={() => {
                dispatch(toggleStatusBarVisibility());
                isStatusBarVisible
                  ? FullScreenChz.disable()
                  : FullScreenChz.enable();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(GeneralSettings);
