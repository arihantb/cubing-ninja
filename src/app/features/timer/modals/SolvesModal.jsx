import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import React, {memo, useRef, useState} from 'react';
import moment from 'moment';
import {Animated, Pressable, ScrollView, Share, View} from 'react-native';
import {Divider, Input} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SvgXml} from 'react-native-svg';
import {
  faBan,
  faCalendar,
  faCheck,
  faChevronDown,
  faCommentAlt,
  faFlag,
  faShareAlt,
  faStickyNote,
  faTimes,
  faTrash,
  faUndo,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {
  toggleEditCommentsVisibility,
  toggleScrambleImageVisibility,
} from '../redux/solvesModalSlice';
import {
  toggleUpdateSolvesStatus,
  toggleSolvesModalVisibility,
  updateSolve,
} from '../redux/solvesScreenSlice';
import {toggleUpdateStatsStatus} from '../redux/statsScreenSlice';
import {getTimeInMilliseconds, getTimeInString} from '../utils/formatTime';

const SolvesModal = props => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  const isEditCommentsVisible = useSelector(
    state => state.solvesModal.isEditCommentsVisible,
  );
  const isScrambleImageVisible = useSelector(
    state => state.solvesModal.isScrambleImageVisible,
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

  const heightAnimIn = () => {
    dispatch(toggleScrambleImageVisibility());
    Animated.timing(heightAnim, {
      toValue: 170,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightAnimOut = () => {
    dispatch(toggleScrambleImageVisibility());
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const _getMessage = () => {
    const date = getDate().replace('\n', ' ');
    return `Time: ${solveData.time}\n\nSolved on: ${date}\n\nScramble: ${
      solveData.scrambleText
    }
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
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      useNativeDriver
      useNativeDriverForBackdrop
      onModalHide={() => {
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
      backdropTransitionOutTiming={0}
      isVisible={visible}>
      <View className="flex-1 items-center justify-center">
        <View className="w-4/5 rounded-md bg-neutral-50 dark:bg-neutral-800">
          <View className="m-3 flex-row items-center justify-center">
            <View className="flex-row items-center">
              <Text className="text-3xl">
                {penalty === 'DNF' ? 'DNF' : penalizedTime}
              </Text>
              {penalty !== 'DNF' && (
                <Text className="ml-2 text-red-500 text-lg">{penalty}</Text>
              )}
            </View>
            <View className="flex-row items-center">
              <FontAwesomeIcon icon={faCalendar} color={'#A8A8A8'} />
              <Text className="ml-3">{getDate()}</Text>
            </View>
          </View>
          <Divider color={'#D2D2D2'} width={1} />
          {isEditCommentsVisible ? (
            <View className="mx-3 flex-row items-center">
              <Input
                inputStyle={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 18,
                  paddingBottom: 0,
                }}
                defaultValue={comments}
                multiline
                containerStyle={{
                  flex: 1,
                  marginLeft: -10,
                  marginRight: 10,
                  marginBottom: -10,
                  maxHeight: 200,
                }}
                rightIcon={() =>
                  comments !== '' && (
                    <Pressable onPress={() => setComments('')}>
                      <View style={{padding: 5}}>
                        <FontAwesomeIcon icon={faTimes} color={'#A8A8A8'} />
                      </View>
                    </Pressable>
                  )
                }
                rightIconContainerStyle={{marginBottom: -12}}
                placeholder="Notes"
                onChangeText={val => setComments(val.trim())}
              />
              <Pressable
                onPress={() => dispatch(toggleEditCommentsVisibility())}>
                <View className="p-3">
                  <FontAwesomeIcon icon={faCheck} color={'#00FF00'} />
                </View>
              </Pressable>
            </View>
          ) : (
            comments !== '' && (
              <View className="ml-4 flex-row items-center">
                <FontAwesomeIcon icon={faStickyNote} color={'#A8A8A8'} />
                <ScrollView
                  className="max-h-[150]"
                  showsVerticalScrollIndicator={false}>
                  <Text className="m-4 ml-3">{comments}</Text>
                </ScrollView>
              </View>
            )
          )}
          {isEditCommentsVisible && <Divider color={'#D2D2D2'} width={1} />}
          {solveData.scrambleText !== '' && (
            <Pressable
              className="ml-4 flex-row items-center"
              onPress={() =>
                isScrambleImageVisible ? heightAnimOut() : heightAnimIn()
              }>
              <FontAwesomeIcon icon={faVectorSquare} color={'#A8A8A8'} />
              <Text className="flex-1 mx-3">{solveData.scrambleText}</Text>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotateZ: heightAnim.interpolate({
                        inputRange: [0, 170],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color={'#000000'}
                  size={12}
                />
              </Animated.View>
            </Pressable>
          )}
          {solveData.scrambleImage !== '' && (
            <Animated.View
              className={`overflow-hidden items-center justify-center [height:${heightAnim}]`}>
              <SvgXml
                xml={solveData.scrambleImage}
                height={150}
                width={'100%'}
                className="mb-5"
              />
            </Animated.View>
          )}
          {solveData.scrambleText !== '' && (
            <Divider color={'#D2D2D2'} width={1} />
          )}
          <View className="flex-row justify-between">
            <View className="flex-row">
              <Pressable onPress={() => _share()}>
                <FontAwesomeIcon
                  icon={faShareAlt}
                  color={'#A8A8A8'}
                  className="ml-4 my-4"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  props.deleteSolve(solveData.id);
                  setVisible(false);
                }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  color={'#A8A8A8'}
                  className="ml-4 my-4"
                />
              </Pressable>
            </View>
            <View className="flex-row">
              <Pressable
                onPress={() => dispatch(toggleEditCommentsVisibility())}>
                <FontAwesomeIcon
                  icon={faCommentAlt}
                  color={!isEditCommentsVisible ? '#A8A8A8' : colors.blue}
                  className="mr-4 my-4"
                />
              </Pressable>
              {penalty !== '' && (
                <Pressable
                  onPress={() => {
                    if (penalty === '+2') {
                      setPenalizedTime(
                        getTimeInString(
                          getTimeInMilliseconds(solveData.penalizedTime) - 2000,
                        ),
                      );
                    }

                    setPenalty('');
                  }}>
                  <FontAwesomeIcon
                    icon={faUndo}
                    color={'#A8A8A8'}
                    className="mr-4 my-4"
                  />
                </Pressable>
              )}
              {penalty === '' && (
                <Pressable
                  onPress={() => {
                    setPenalty('DNF');
                  }}>
                  <FontAwesomeIcon
                    icon={faBan}
                    color={'#A8A8A8'}
                    className="mr-4 my-4"
                  />
                </Pressable>
              )}
              {penalty === '' && (
                <Pressable
                  onPress={() => {
                    setPenalizedTime(
                      getTimeInString(
                        getTimeInMilliseconds(solveData.time) + 2000,
                      ),
                    );
                    setPenalty('+2');
                  }}>
                  <FontAwesomeIcon
                    icon={faFlag}
                    color={'#A8A8A8'}
                    className="mr-4 my-4"
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

SolvesModal.propTypes = {
  deleteSolve: PropTypes.func.isRequired,
};

export default memo(SolvesModal);
