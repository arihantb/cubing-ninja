import PropTypes from 'prop-types';
import React, {memo, useState} from 'react';
import moment from 'moment';
import {Dimensions, Pressable, ScrollView, Share, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  faBan,
  faCalendar,
  faCommentAlt,
  faFlag,
  faShareAlt,
  faStickyNote,
  faTrash,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Input, Modal, Text} from '_components';
import {toggleEditCommentsVisibility} from '../redux/solvesModalSlice';
import {
  toggleUpdateSolvesStatus,
  toggleSolvesModalVisibility,
  updateSolve,
} from '../redux/solvesScreenSlice';
import {toggleUpdateStatsStatus} from '../redux/statsScreenSlice';
import {getTimeInMilliseconds, getTimeInString} from '../utils/formatTime';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {strings} from '_data/strings';
import {styled} from 'nativewind';
import {PressableIcon} from '../../../components';
import {AnimatePresence, View as MotiView} from 'moti';
import {
  Layout,
  SlideInLeft,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView, {
  props: {contentContainerStyle: true},
});

const SolvesModal = props => {
  const isEditCommentsVisible = useSelector(
    state => state.solvesModal.isEditCommentsVisible,
  );
  const solveData = useSelector(state => state.solvesScreen.solveData);

  const [visible, setVisible] = useState(true);
  const [penalizedTime, setPenalizedTime] = useState(solveData.penalizedTime);
  const [penalty, setPenalty] = useState(solveData.penalty);
  const [comments, setComments] = useState(solveData.comments);

  const dispatch = useDispatch();

  const getDate = () => {
    const date = moment(new Date(solveData.date)).format('DD MMM YYYY');
    const time = moment(new Date(solveData.date)).format('HH:mm');
    return date + '\n' + time;
  };

  const _getMessage = () => {
    const date = getDate().replace('\n', ' ');
    return `Time: ${solveData.time}\n\nPenalty: ${
      solveData.penalty === '' ? 'N/A' : solveData.penalty
    }\n\nSolved on: ${date}\n\nScramble: ${solveData.scrambleText}
    ${solveData.comments !== '' ? `\n\nNotes:\n${solveData.comments}` : ''}`;
  };

  const _share = async () => {
    try {
      await Share.share({message: _getMessage()});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      onClose={() => {
        if (isEditCommentsVisible) {
          dispatch(toggleEditCommentsVisibility());
        }

        setVisible(false);
      }}
      onHide={() => {
        dispatch(
          updateSolve({
            id: solveData.id,
            penalizedTime: penalizedTime,
            penalty: penalty,
            comments: comments,
          }),
        );
        dispatch(toggleSolvesModalVisibility());
      }}
      title="Solve Details"
      isVisible={visible}>
      <StyledKeyboardAwareScrollView
        contentContainerStyle="flex-grow"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row my-3 justify-between">
          <View className="flex-row gap-3 items-center">
            <Text className="text-3xl text-indigo-500">
              {penalty === 'DNF' ? 'DNF' : penalizedTime}
            </Text>
            {penalty !== 'DNF' && (
              <Text className="text-red-500 text-lg">{penalty}</Text>
            )}
          </View>
          <View className="flex-row gap-3 items-center">
            <Icon icon={faCalendar} color="bg-neutral-500" />
            <Text>{getDate()}</Text>
          </View>
        </View>
        {solveData.scrambleText !== '' && (
          <View className="my-3 p-2 rounded-md items-center bg-neutral-700 max-h-[100]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-lg text-justify">
                {solveData.scrambleText}
              </Text>
            </ScrollView>
          </View>
        )}
        {solveData.scrambleImage !== '' && (
          <View className="my-3 h-60 items-center">
            <SvgXml xml={solveData.scrambleImage} height="100%" width="75%" />
          </View>
        )}
        <AnimatePresence>
          {(isEditCommentsVisible || comments !== '') && (
            <View className="my-3 min-h-[150] max-h-[150]">
              <View className="flex-row justify-between">
                <MotiView
                  from={{translateX: -Dimensions.get('window').width}}
                  animate={{translateX: 0}}
                  exit={{translateX: Dimensions.get('window').width}}
                  layout={Layout}
                  transition={{type: 'timing'}}
                  className="flex-row gap-3">
                  <Icon icon={faStickyNote} color="bg-neutral-500" />
                  <Text className="text-neutral-500">Comments:</Text>
                </MotiView>
                <AnimatePresence>
                  {isEditCommentsVisible && comments !== '' && (
                    <MotiView
                      from={{translateX: Dimensions.get('window').width}}
                      animate={{translateX: 0}}
                      exit={{translateX: Dimensions.get('window').width}}
                      layout={Layout}
                      transition={{type: 'timing'}}>
                      <Pressable onPress={() => setComments('')}>
                        <Text className="text-red-500">{strings.clear}</Text>
                      </Pressable>
                    </MotiView>
                  )}
                </AnimatePresence>
              </View>
              {isEditCommentsVisible && (
                <MotiView
                  from={{translateX: -Dimensions.get('window').width}}
                  animate={{translateX: 0}}
                  exit={{translateX: Dimensions.get('window').width}}
                  layout={Layout}
                  transition={{type: 'timing'}}
                  className="my-2">
                  <Input
                    className="p-3 text-base"
                    inputType="text"
                    multiline={true}
                    defaultValue={comments}
                    placeholder="Comments"
                    onChangeText={text => setComments(text.trim())}
                  />
                </MotiView>
              )}
              {!isEditCommentsVisible && comments !== '' && (
                <MotiView
                  from={{translateX: -Dimensions.get('window').width}}
                  animate={{translateX: 0}}
                  exit={{translateX: Dimensions.get('window').width}}
                  layout={Layout}
                  transition={{type: 'timing'}}
                  className="my-2 p-3 rounded-md bg-neutral-700">
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text>{comments}</Text>
                  </ScrollView>
                </MotiView>
              )}
            </View>
          )}
        </AnimatePresence>
        <View className="flex-1 flex-row my-3 items-end justify-between">
          <View className="flex-row gap-3">
            <View>
              <PressableIcon
                containerStyle="p-2"
                icon={faShareAlt}
                color="bg-neutral-500"
                size={20}
                onPress={_share}
              />
            </View>
            <View>
              <PressableIcon
                containerStyle="p-2"
                icon={faTrash}
                color="bg-neutral-500"
                size={20}
                onPress={() => {
                  props.deleteSolve(solveData.id);
                  setVisible(false);
                }}
              />
            </View>
          </View>
          <View className="flex-row gap-3">
            <View>
              <PressableIcon
                containerStyle="p-2"
                icon={faCommentAlt}
                color={
                  !isEditCommentsVisible ? 'bg-neutral-500' : 'bg-indigo-500'
                }
                size={20}
                onPress={() => dispatch(toggleEditCommentsVisibility())}
              />
            </View>
            {penalty !== '' && (
              <View>
                <PressableIcon
                  containerStyle="p-2"
                  icon={faUndo}
                  color="bg-neutral-500"
                  size={20}
                  onPress={() => {
                    if (penalty === '+2') {
                      setPenalizedTime(
                        getTimeInString(
                          getTimeInMilliseconds(solveData.penalizedTime) - 2000,
                        ),
                      );
                    }

                    setPenalty('');
                  }}
                />
              </View>
            )}
            {penalty === '' && (
              <View>
                <PressableIcon
                  containerStyle="p-2"
                  icon={faBan}
                  color="bg-neutral-500"
                  size={20}
                  onPress={() => {
                    setPenalty('DNF');
                  }}
                />
              </View>
            )}
            {penalty === '' && (
              <View>
                <PressableIcon
                  containerStyle="p-2"
                  icon={faFlag}
                  color="bg-neutral-500"
                  size={20}
                  onPress={() => {
                    setPenalizedTime(
                      getTimeInString(
                        getTimeInMilliseconds(solveData.time) + 2000,
                      ),
                    );
                    setPenalty('+2');
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </StyledKeyboardAwareScrollView>
    </Modal>
  );
};

SolvesModal.propTypes = {
  deleteSolve: PropTypes.func.isRequired,
};

export default memo(SolvesModal);
