import React, {memo, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Text} from '_components';
import {constants} from '_data/constants';
import {strings} from '_data/strings';
import {toggleEditScrambleModalVisibility} from '../redux/homeSlice';
import {
  addToScrambleText,
  clearScrambleText,
  removeFromScrambleText,
  toggleEditScrambleModalVisibilityFromModal,
} from '../redux/editScrambleModalSlice';
import {ScrollView} from 'react-native-gesture-handler';

const EditScrambleModal = props => {
  const [innerComponents, setInnerComponents] = useState([]);
  const isEditScrambleModalVisible = useSelector(
    state => state.editScrambleModal.isEditScrambleModalVisible,
  );
  const scrambleText = useSelector(
    state => state.editScrambleModal.scrambleText,
  );

  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  const outerComponents = [];
  const notations = constants.notations[constants.puzzles[puzzle]];
  const suffixes = constants.suffixes;

  const _innerComponentButton = (notation, suffix) => (
    <Pressable
      key={suffix}
      className="h-10 w-10 m-3 rounded-md items-center justify-center bg-blue-600"
      onPress={() => dispatch(addToScrambleText({notation, suffix}))}>
      <Text>{notation + suffix}</Text>
    </Pressable>
  );

  const _outerComponentButton = notation => (
    <Pressable
      key={notation}
      className="h-10 w-10 m-3 rounded-md items-center justify-center bg-blue-600"
      onPress={() => {
        const innerComponentsTemp = [];

        for (let j = 0; j < suffixes.length; j += 6) {
          innerComponentsTemp.push(
            <View key={suffixes[j]} className="flex-row">
              {suffixes.map(
                (suffix, idx) =>
                  idx >= j &&
                  idx < j + 6 &&
                  _innerComponentButton(notation, suffix),
              )}
            </View>,
          );
        }

        setInnerComponents(innerComponentsTemp);
      }}>
      <Text className="text-lg">{notation}</Text>
    </Pressable>
  );

  for (let i = 0; i < notations.length; i += 6) {
    outerComponents.push(
      <View key={notations[i]} className="flex-row">
        {notations.map(
          (notation, idx) =>
            idx >= i && idx < i + 6 && _outerComponentButton(notation),
        )}
      </View>,
    );
  }

  return (
    <Modal
      onClose={() => dispatch(toggleEditScrambleModalVisibilityFromModal())}
      onHide={() => {
        dispatch(toggleEditScrambleModalVisibility());

        if (scrambleText !== null && scrambleText.length > 0) {
          props.setScrambleText(scrambleText.join(' '));
        }
      }}
      title={strings.customScramble}
      isVisible={isEditScrambleModalVisible}>
      <ScrollView className="max-h-40" showsVerticalScrollIndicator={false}>
        <View className="m-2 p-2 flex-row items-center justify-between">
          <Text className="text-xl">{scrambleText.join(' ')}</Text>
        </View>
      </ScrollView>
      <View className="max-h-40 items-center justify-center">
        {innerComponents}
      </View>
      <ScrollView className="max-h-80" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center">{outerComponents}</View>
      </ScrollView>
      <View className="m-3 flex-row justify-between">
        <Pressable
          disabled={scrambleText.length === 0}
          onPress={() => {
            dispatch(clearScrambleText());
          }}>
          <Text
            className={`text-lg ${
              scrambleText.length === 0 ? 'text-gray-500' : 'text-red-500'
            }`}>
            {strings.clearAll}
          </Text>
        </Pressable>
        <Pressable
          disabled={scrambleText.length === 0}
          onPress={() => dispatch(removeFromScrambleText(scrambleText))}>
          <Text
            className={`text-lg ${
              scrambleText.length === 0 ? 'text-gray-500' : 'text-indigo-500'
            }`}>
            {strings.clear}
          </Text>
        </Pressable>
        <Pressable
          disabled={scrambleText.length === 0}
          onPress={() => {
            dispatch(toggleEditScrambleModalVisibilityFromModal());
          }}>
          <Text
            className={`text-lg ${
              scrambleText.length === 0 ? 'text-gray-500' : 'text-indigo-500'
            }`}>
            {strings.done}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default memo(EditScrambleModal);
