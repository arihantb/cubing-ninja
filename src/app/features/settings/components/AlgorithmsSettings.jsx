import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import React, {memo, useCallback, useState} from 'react';
import {Image, Pressable, SectionList, View} from 'react-native';
import {Switch} from 'react-native-elements';
import {Header, Text} from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import AlertTypeModal from '../modals/AlertTypeModal';
import InspectionDurationModal from '../modals/InspectionDurationModal';
import styles from '../styles/generalSettingsStyle';
import { sound, soundVibrate, vibrate } from '../../../assets/images';

const AlgorithmsSettings = props => {
  const [visible, setVisible] = useState(true);
  const [inspection, setInspection] = useState(false);
  const [hideLearnedAlgorithms, setHideLearnedAlgorithms] = useState(false);
  const [inspectionDuration, setInspectionDuration] = useState(15);
  const [alertTimeLeft, setAlertTimeLeft] = useState(false);
  const [alertType, setAlertType] = useState('Both');
  const [manualMode, setManualMode] = useState(false);
  const [holdToStart, setHoldToStart] = useState(true);
  const [backCancelsSolve, setBackCancelsSolve] = useState(true);
  const [generateScrambles, setGenerateScrambles] = useState(true);
  const [bestTimeAlert, setBestTimeAlert] = useState(true);
  const [bestAverageAlert, setBestAverageAlert] = useState(true);
  const [worstTimeAlert, setWorstTimeAlert] = useState(false);
  const [showAlertTypeModal, setShowAlertTypeModal] = useState(false);
  const [showInspectionDurationModal, setShowInspectionDurationModal] =
    useState(false);

  const alertTypeModalCallback = useCallback(
    visible => setShowAlertTypeModal(visible),
    [],
  );

  const alertTypeCallback = useCallback(mode => setAlertType(mode), []);

  const inspectionDurationModalCallback = useCallback(
    visible => setShowInspectionDurationModal(visible),
    [],
  );

  const inspectionDurationCallback = useCallback(
    duration => setInspectionDuration(duration),
    [],
  );

  const data = [
    {
      title: 'Hide Learned Algorithms',
      subtitle: 'Enabling this will hide the marked algorithms',
      right: (
        <Switch val={inspection} onValueChange={val => setInspection(val)} />
      ),
    },
    {
      title: '',
      subtitle: 'Default inspection duration: 15 seconds',
      right: (
        <Pressable onPress={() => setShowInspectionDurationModal(true)}>
          <Text style={{fontSize: 18}}>{inspectionDuration}s</Text>
        </Pressable>
      ),
    },
    {
      title: 'Alert Time Left',
      subtitle:
        'Timer will alert you once 8 and 12 seconds of inspection time have',
      right: (
        <Switch
          val={alertTimeLeft}
          onValueChange={val => setAlertTimeLeft(val)}
        />
      ),
    },
    {
      title: 'Alert Type',
      subtitle: 'Choose how the timer will alert you',
      right: (
        <Pressable onPress={() => setShowAlertTypeModal(true)}>
          <Image
            source={{
              uri:
                alertType === 'Both'
                  ? soundVibrate
                  : alertType === 'Sound'
                  ? sound
                  : vibrate,
            }}
            style={{width: 30, height: 30}}
          />
        </Pressable>
      ),
    },
    {
      title: 'Manual Mode',
      subtitle: 'Changes the mode from timer to manual time entry mode',
      right: (
        <Switch val={manualMode} onValueChange={val => setManualMode(val)} />
      ),
    },
    {
      title: 'Hold to Start',
      subtitle: 'Hold the timer for 0.5 seconds to start',
      right: (
        <Switch val={holdToStart} onValueChange={val => setHoldToStart(val)} />
      ),
    },
    {
      title: 'Back Cancels Solve',
      subtitle: 'Pressing the back button during a solve will cancel it',
      right: (
        <Switch
          val={backCancelsSolve}
          onValueChange={val => setBackCancelsSolve(val)}
        />
      ),
    },
    {
      title: 'Generate Scrambles',
      subtitle: 'Generate scramble sequences for puzzles',
      right: (
        <Switch
          val={generateScrambles}
          onValueChange={val => setGenerateScrambles(val)}
        />
      ),
    },
    {
      title: 'Best Time Alert',
      subtitle: 'Alert when you get a personal best',
      right: (
        <Switch
          val={bestTimeAlert}
          onValueChange={val => setBestTimeAlert(val)}
        />
      ),
    },
    {
      title: 'Best Average Alert',
      subtitle: 'Alert when you get a new best average',
      right: (
        <Switch
          val={bestAverageAlert}
          onValueChange={val => setBestAverageAlert(val)}
        />
      ),
    },
    {
      title: 'Worst Time Alert',
      subtitle: 'Alert when you get a personal worst',
      right: (
        <Switch
          val={worstTimeAlert}
          onValueChange={val => setWorstTimeAlert(val)}
        />
      ),
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={styles.swipeTabs}>
        <Text style={styles.swipeTabsTitle}>{item.title}</Text>
        <Text style={styles.swipeTabsSubtitle}>{item.subtitle}</Text>
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
      title: 'General',
      data: data.slice(0, 4),
    },
    {
      title: '3D Model',
      data: data.slice(4, 8),
    },
    {
      title: 'Color Scheme',
      data: data.slice(8, 11),
    },
  ];

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onModalHide={() => props.visibility(false)}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      style={{margin: 0}}
      isVisible={visible}>
      {showAlertTypeModal ? (
        <AlertTypeModal
          visibility={alertTypeModalCallback}
          mode={alertType}
          alertType={alertTypeCallback}
        />
      ) : null}
      {showInspectionDurationModal ? (
        <InspectionDurationModal
          visibility={inspectionDurationModalCallback}
          duration={inspectionDuration}
          inspectionDuration={inspectionDurationCallback}
        />
      ) : null}
      <View style={styles.mainView}>
        <Header
          title={strings.algorithmsSettingsTitle}
          setVisible={setVisible}
        />
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
        />
      </View>
    </Modal>
  );
};

AlgorithmsSettings.propTypes = {
  props: PropTypes.object,
  visibility: PropTypes.func.isRequired,
};

export default memo(AlgorithmsSettings);
