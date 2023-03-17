import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Switch} from 'react-native-elements';
import {Pressable, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Header, Text} from '_components';
import {strings} from '_data/strings';
import {toggleGeneralSettingsVisibility} from '../redux/settingsSlice';
import styles from '../styles/generalSettingsStyle';

const GeneralSettings = () => {
  const [visible, setVisible] = useState(true);
  const [swipeTabs, setSwipeTabs] = useState(true);

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onModalHide={() => dispatch(toggleGeneralSettingsVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      style={{margin: 0}}
      isVisible={visible}>
      <View style={styles.mainView}>
        <Header title={strings.generalSettingsTitle} setVisible={setVisible} />
        <View style={styles.paddingLeft}>
          <View style={styles.row}>
            <Pressable
              style={styles.swipeTabs}
              onPress={() => {
                // some action
              }}>
              <Text style={styles.swipeTabsTitle}>
                Allow swiping between tabs
              </Text>
              <Text style={styles.swipeTabsSubtitle}>
                If this is disabled, you&apos;ll have to tap the tabs to switch
                between them
              </Text>
            </Pressable>
            <View style={styles.swipeTabsSwitch}>
              <Switch
                val={swipeTabs}
                onValueChange={val => setSwipeTabs(val)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(GeneralSettings);
