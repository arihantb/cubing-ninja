import Flag from 'react-native-flags';
import Modal from 'react-native-modal';
import React, {memo, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Pressable, Text} from '_components';
import {strings} from '_data/strings';
import {colors} from '_features/theme';
import {
  setLanguage,
  toggleLanguageModalVisibility,
} from '../redux/settingsSlice';
import styles from '../styles/alertTypeModalStyle';

const LanguageModal = () => {
  const [visible, setVisible] = useState(true);

  const language = useSelector(
    state => state.settingsNavigationReducer.language,
  );

  const dispatch = useDispatch();

  const data = [
    {
      language: 'English',
      code: 'US',
    },
    {
      language: 'English',
      code: 'GB',
    },
    {
      language: 'Español',
      code: 'ES',
    },
    {
      language: 'Pусский',
      code: 'RU',
    },
  ];

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        dispatch(setLanguage(item.code));
        setVisible(false);
      }}>
      <View
        style={{
          backgroundColor:
            language === item.code ? colors.secondary : colors.lightgrey,
          padding: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Flag code={item.code} size={32} type="flat" />
        <Text
          style={[
            {color: language === item.code ? colors.white : colors.black},
            styles.puzzleLabel,
          ]}>
          {item.language}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onModalHide={() => dispatch(toggleLanguageModalVisibility())}
      backdropTransitionOutTiming={0}
      isVisible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.selectPuzzleLabel}>{strings.selectLanguage}</Text>
          <FlatGrid
            itemDimension={70}
            centerContent={true}
            style={{
              width: 250,
              flexGrow: 0,
            }}
            itemContainerStyle={{alignItems: 'center'}}
            data={data}
            renderItem={renderItem}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(LanguageModal);
