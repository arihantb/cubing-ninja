import React, {memo, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Text} from '_components';
import {toggleScrambleImageModalVisibility} from '../redux/timerScreenSlice';

const ScrambleImageModal = () => {
  const [visible, setVisible] = useState(true);

  const scrambleData = useSelector(state => state.home.scrambleData);

  const dispatch = useDispatch();

  return (
    <Modal
      onClose={() => setVisible(false)}
      onHide={() => dispatch(toggleScrambleImageModalVisibility())}
      title="Scramble"
      isVisible={visible}>
      <View className="flex-1 pt-10 pb-10 items-center justify-between">
        <Text className="text-xl text-center">{scrambleData.scrambleText}</Text>
        <SvgXml xml={scrambleData.scrambleImage} height="100%" width="100%" />
      </View>
    </Modal>
  );
};

export default memo(ScrambleImageModal);
