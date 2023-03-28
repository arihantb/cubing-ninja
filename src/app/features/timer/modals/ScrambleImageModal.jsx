import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {toggleScrambleImageModalVisibility} from '../redux/timerScreenSlice';

const ScrambleImageModal = () => {
  const [visible, setVisible] = useState(true);

  const scrambleData = useSelector(state => state.home.scrambleData);

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={1}
      useNativeDriver
      useNativeDriverForBackdrop
      onModalHide={() => dispatch(toggleScrambleImageModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={visible}>
      <SvgXml
        xml={scrambleData.scrambleImage}
        height="100%"
        width="100%"
        onPress={() => {
          setVisible(false);
        }}
      />
    </Modal>
  );
};

export default memo(ScrambleImageModal);
