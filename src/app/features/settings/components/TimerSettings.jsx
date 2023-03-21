import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {Image, Pressable, SectionList, ToastAndroid, View} from 'react-native';
import {Switch} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Header, Text} from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {setSolves as setSolvesFromSolvesScreen} from '../../timer/redux/solvesScreenSlice';
import AlertTypeModal from '../modals/AlertTypeModal';
import InspectionDurationModal from '../modals/InspectionDurationModal';
import {
  setAlertOnBestAverageStatus,
  setAlertOnBestTimeStatus,
  setAlertOnInspectionTimeLeftStatus,
  setAlertOnWorstTimeStatus,
  setAlertTypeModalOffset,
  setBackCancelSolveStatus,
  setGenerateScramblesStatus,
  setHoldToStartStatus,
  setInspectionEnabledStatus,
  setManualModeStatus,
  toggleAlertTypeModalVisibility,
  toggleInspectionDurationModalVisibility,
  toggleTimerSettingsVisibility,
} from '../redux/settingsSlice';
import styles from '../styles/timerSettingsStyle';
import {sound, soundVibrate, vibrate} from '../../../assets/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDownload, faUpload} from '@fortawesome/free-solid-svg-icons';
import {getSolves, setSolves} from '../../../utils';

const TimerSettings = () => {
  const timerSettings = useSelector(state => state.timerSettings.timerSettings);
  const puzzle = useSelector(state => state.home.puzzle);
  const isLoggedIn = useSelector(state => state.navigationDrawer.isLoggedIn);

  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();

  const data = [
    {
      title: 'Upload Solves',
      subtitle: 'Upload the solves to the database',
      right: (
        <Pressable
          onPress={() => {
            getSolves().then(solves =>
              database()
                .ref(`users/${auth().currentUser.uid}`)
                .set({solves: solves})
                .then(() =>
                  ToastAndroid.show(
                    'Solves uploaded successfully',
                    ToastAndroid.LONG,
                  ),
                ),
            );
          }}>
          <FontAwesomeIcon icon={faUpload} size={20} color={colors.white} />
        </Pressable>
      ),
      disabled: false,
    },
    {
      title: 'Download Solves',
      subtitle: 'Download the solves from the database',
      right: (
        <Pressable
          onPress={() => {
            database()
              .ref(`users/${auth().currentUser.uid}`)
              .once('value')
              .then(snapshot => {
                setSolves(snapshot.val().solves);
                dispatch(
                  setSolvesFromSolvesScreen(snapshot.val().solves[puzzle]),
                );
                ToastAndroid.show(
                  'Solves downloaded successfully',
                  ToastAndroid.LONG,
                );
              });
          }}>
          <FontAwesomeIcon icon={faDownload} size={20} color={colors.white} />
        </Pressable>
      ),
      disabled: false,
    },
    {
      title: 'Inspection',
      subtitle:
        'Enabling this allows you to inspect the puzzle before starting the solve',
      right: (
        <Switch
          val={timerSettings.isInspectionEnabled}
          onValueChange={val => dispatch(setInspectionEnabledStatus(val))}
        />
      ),
      disabled: false,
    },
    {
      title: 'Inspection Duration (seconds)',
      subtitle: 'Default inspection duration: 15 seconds',
      right: (
        <Pressable
          onPress={() =>
            timerSettings.isInspectionEnabled &&
            dispatch(toggleInspectionDurationModalVisibility())
          }>
          <Text
            style={[
              timerSettings.isInspectionEnabled
                ? {color: colors.white}
                : {color: colors.grey},
              {fontSize: 18},
            ]}>
            {timerSettings.inspectionDuration}s
          </Text>
        </Pressable>
      ),
      disabled: !timerSettings.isInspectionEnabled,
    },
    {
      title: 'Alert Time Left',
      subtitle:
        'Timer will alert you once 8 and 12 seconds of inspection time have',
      right: (
        <Switch
          val={timerSettings.alertOnInspectionTimeLeft}
          onValueChange={val =>
            dispatch(setAlertOnInspectionTimeLeftStatus(val))
          }
        />
      ),
      disabled: false,
    },
    {
      title: 'Alert Type',
      subtitle: 'Choose how the timer will alert you',
      right: (
        <Pressable
          onPress={() =>
            timerSettings.alertOnInspectionTimeLeft &&
            dispatch(toggleAlertTypeModalVisibility())
          }>
          <Image
            source={{
              uri:
                timerSettings.alertType === 'Both'
                  ? soundVibrate
                  : timerSettings.alertType === 'Sound'
                  ? sound
                  : vibrate,
            }}
            style={{
              tintColor: timerSettings.alertOnInspectionTimeLeft
                ? colors.white
                : colors.grey,
              width: 30,
              height: 30,
            }}
          />
        </Pressable>
      ),
      disabled: !timerSettings.alertOnInspectionTimeLeft,
    },
    {
      title: 'Manual Mode',
      subtitle: 'Changes the mode from timer to manual time entry mode',
      right: (
        <Switch
          val={timerSettings.isManualMode}
          onValueChange={val => dispatch(setManualModeStatus(val))}
        />
      ),
      disabled: false,
    },
    {
      title: 'Hold to Start',
      subtitle: 'Hold the timer for 0.5 seconds to start',
      right: (
        <Switch
          val={timerSettings.shouldHoldToStart}
          disabled={!timerSettings.isManualMode}
          onValueChange={val => dispatch(setHoldToStartStatus(val))}
        />
      ),
      disabled: !timerSettings.isManualMode,
    },
    {
      title: 'Back Cancels Solve',
      subtitle: 'Pressing the back button during a solve will cancel it',
      right: (
        <Switch
          val={timerSettings.shouldBackCancelSolve}
          disabled={!timerSettings.isManualMode}
          onValueChange={val => dispatch(setBackCancelSolveStatus(val))}
        />
      ),
      disabled: !timerSettings.isManualMode,
    },
    {
      title: 'Generate Scrambles',
      subtitle: 'Generate scramble sequences for puzzles',
      right: (
        <Switch
          val={timerSettings.shouldGenerateScrambles}
          onValueChange={val => dispatch(setGenerateScramblesStatus(val))}
        />
      ),
      disabled: false,
    },
    {
      title: 'Best Time Alert',
      subtitle: 'Alert when you get a personal best',
      right: (
        <Switch
          val={timerSettings.shouldAlertOnBestTime}
          onValueChange={val => dispatch(setAlertOnBestTimeStatus(val))}
        />
      ),
      disabled: false,
    },
    {
      title: 'Best Average Alert',
      subtitle: 'Alert when you get a new best average',
      right: (
        <Switch
          val={timerSettings.shouldAlertOnBestAverage}
          onValueChange={val => dispatch(setAlertOnBestAverageStatus(val))}
        />
      ),
      disabled: false,
    },
    {
      title: 'Worst Time Alert',
      subtitle: 'Alert when you get a personal worst',
      right: (
        <Switch
          val={timerSettings.shouldAlertOnWorstTime}
          onValueChange={val => dispatch(setAlertOnWorstTimeStatus(val))}
        />
      ),
      disabled: false,
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={styles.swipeTabs}>
        <Text
          style={[
            item.disabled ? {color: colors.grey} : {color: colors.white},
            styles.swipeTabsTitle,
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            item.disabled ? {color: colors.grey} : {color: colors.white},
            styles.swipeTabsSubtitle,
          ]}>
          {item.subtitle}
        </Text>
      </View>
      <View style={styles.swipeTabsSwitch}>{item.right}</View>
    </View>
  );

  const renderSectionHeader = ({section}) => (
    <Text
      style={{
        flex: 1,
        fontSize: 16,
        backgroundColor: colors.primary,
        color: 'white',
        padding: 10,
      }}>
      {section.title}
    </Text>
  );

  const sections = [
    {
      title: 'Solves',
      data: isLoggedIn
        ? data.slice(0, 2)
        : [
            {
              title: 'Login to View',
              subtitle: 'Login to sync solves to database',
            },
          ],
    },
    {
      title: 'Inspection',
      data: data.slice(2, 4),
    },
    {
      title: 'Timer',
      data: data.slice(4, 8),
    },
    {
      title: 'Alerts',
      data: data.slice(8, 11),
    },
  ];

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onModalHide={() => dispatch(toggleTimerSettingsVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      style={{margin: 0}}
      isVisible={visible}>
      {timerSettings.isAlertTypeModalVisible && <AlertTypeModal />}
      {timerSettings.isInspectionDurationModalVisible && (
        <InspectionDurationModal />
      )}
      <View style={styles.mainView}>
        <Header title={strings.timerSettingsTitle} hideModal={setVisible} />
        <SectionList
          itemDimension={100}
          itemContainerStyle={{alignItems: 'center'}}
          stickySectionHeadersEnabled={true}
          initialNumToRender={20}
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          removeClippedSubviews={true}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          showsVerticalScrollIndicator={false}
          onScroll={event =>
            dispatch(setAlertTypeModalOffset(event.nativeEvent.contentOffset.y))
          }
        />
      </View>
    </Modal>
  );
};

export default memo(TimerSettings);
