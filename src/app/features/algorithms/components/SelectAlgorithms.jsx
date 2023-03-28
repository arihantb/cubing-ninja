import React, {memo, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';

import {toggleSelectAlgorithmsVisibility} from '_reducers/containers/AppSlice';
import Header from '_components/Header';
import AlgorithmsNavigation from '_containers/algorithms/AlgorithmsNavigation';
import {Strings} from '_data/Strings';

const SelectAlgorithms = () => {
  const puzzle = useSelector(state => state.homeReducer.puzzle);

  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onModalHide={() => dispatch(toggleSelectAlgorithmsVisibility())}
      hasBackdrop={false}
      style={{margin: 0}}
      isVisible={visible}>
      {/* <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.secondary,
        }}>
        <Header
          title={Strings.selectAlgorithms}
          setVisible={setVisible}
          right={
            <FontAwesomeIcon icon={faCheck} color={colors.white} size={20} />
          }
        />
        <AlgorithmsNavigation puzzle={puzzle} />
      </View> */}
    </Modal>
  );
};

export default memo(SelectAlgorithms);
