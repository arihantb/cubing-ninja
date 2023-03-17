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
import {colors} from '_features/theme';
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
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.black, fontSize: 30}}>
                {penalty === 'DNF' ? 'DNF' : penalizedTime}
              </Text>
              {penalty !== 'DNF' && (
                <Text style={{marginLeft: 5, color: colors.red, fontSize: 20}}>
                  {penalty}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faCalendar} color={colors.greyDark} />
              <Text style={{marginLeft: 10, color: colors.black, fontSize: 12}}>
                {getDate()}
              </Text>
            </View>
          </View>
          <Divider color={colors.greyLight} width={1} />
          {isEditCommentsVisible ? (
            <View
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Input
                inputStyle={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 18,
                  paddingBottom: 0,
                }}
                defaultValue={comments}
                multiline={true}
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
                        <FontAwesomeIcon
                          icon={faTimes}
                          color={colors.greyDark}
                        />
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
                <View style={{padding: 5}}>
                  <FontAwesomeIcon icon={faCheck} color={colors.green} />
                </View>
              </Pressable>
            </View>
          ) : (
            comments !== '' && (
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faStickyNote} color={colors.greyDark} />
                <ScrollView
                  style={{maxHeight: 150}}
                  showsVerticalScrollIndicator={false}>
                  <Text
                    style={{
                      margin: 15,
                      marginLeft: 10,
                      color: colors.black,
                      fontSize: 16,
                    }}>
                    {comments}
                  </Text>
                </ScrollView>
              </View>
            )
          )}
          {isEditCommentsVisible && (
            <Divider color={colors.greyLight} width={1} />
          )}
          {solveData.scrambleText !== '' && (
            <Pressable
              style={{
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                isScrambleImageVisible ? heightAnimOut() : heightAnimIn()
              }>
              <FontAwesomeIcon icon={faVectorSquare} color={colors.greyDark} />
              <Text
                style={{
                  flex: 1,
                  marginLeft: 10,
                  marginRight: 10,
                  color: colors.black,
                  fontSize: 16,
                }}>
                {solveData.scrambleText}
              </Text>
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
                  color={colors.black}
                  size={12}
                />
              </Animated.View>
            </Pressable>
          )}
          {solveData.scrambleImage !== '' && (
            <Animated.View
              style={{
                height: heightAnim,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SvgXml
                xml={solveData.scrambleImage}
                height={150}
                width={'100%'}
                style={{marginBottom: 20}}
              />
            </Animated.View>
          )}
          {solveData.scrambleText !== '' && (
            <Divider color={colors.greyLight} width={1} />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => _share()}>
                <FontAwesomeIcon
                  icon={faShareAlt}
                  color={colors.greyDark}
                  style={{marginLeft: 15, marginVertical: 15}}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  props.deleteSolve(solveData.id);
                  setVisible(false);
                }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  color={colors.greyDark}
                  style={{marginLeft: 15, marginVertical: 15}}
                />
              </Pressable>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => dispatch(toggleEditCommentsVisibility())}>
                <FontAwesomeIcon
                  icon={faCommentAlt}
                  color={!isEditCommentsVisible ? colors.greyDark : colors.blue}
                  style={{marginRight: 15, marginVertical: 15}}
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
                    color={colors.greyDark}
                    style={{marginRight: 15, marginVertical: 15}}
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
                    color={colors.greyDark}
                    style={{marginRight: 15, marginVertical: 15}}
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
                    color={colors.greyDark}
                    style={{
                      marginRight: 15,
                      marginVertical: 15,
                    }}
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
