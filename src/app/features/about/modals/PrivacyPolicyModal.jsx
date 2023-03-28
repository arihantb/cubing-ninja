import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Header, Text} from '_components';
import {strings} from '_data/strings';
import {togglePrivacyPolicyModalVisibilityFromModal} from '../redux/privacyPolicyModalSlice';
import {togglePrivacyPolicyModalVisibility} from '../redux/aboutSlice';

const PrivacyPolicyModal = () => {
  const isPrivacyPolicyModalVisible = useSelector(
    state => state.privacyPolicyModal.isPrivacyPolicyModalVisible,
  );

  const dispatch = useDispatch();

  return (
    <Modal
      onBackdropPress={() =>
        dispatch(togglePrivacyPolicyModalVisibilityFromModal())
      }
      onBackButtonPress={() =>
        dispatch(togglePrivacyPolicyModalVisibilityFromModal())
      }
      onModalHide={() => dispatch(togglePrivacyPolicyModalVisibility())}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      className="m-0"
      isVisible={isPrivacyPolicyModalVisible}>
      <View className="flex-1 bg-slate-900">
        <Header
          title={strings.privacyPolicyTitle}
          backButtonAction={() =>
            dispatch(togglePrivacyPolicyModalVisibilityFromModal())
          }
        />
        <View className="p-2 bg-red-500">
          <Text className="text-slate-900">{strings.privacyPolicyRedView}</Text>
        </View>
        <View className="p-2 bg-yellow-500">
          <Text className="text-slate-900">
            {strings.privacyPolicyOrangeView}
          </Text>
        </View>
        <View className="p-2 bg-indigo-500">
          <Text className="text-slate-900">
            {strings.privacyPolicyBlueView}
          </Text>
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View className="p-3 gap-3">
            <Card
              title={strings.privacyPolicyCardTitle1}
              subtitle={strings.privacyPolicyCardSubtitle1}
            />
            <Card
              title={strings.privacyPolicyCardTitle2}
              subtitle={strings.privacyPolicyCardSubtitle2}
            />
            <Card
              title={strings.privacyPolicyCardTitle3}
              subtitle={strings.privacyPolicyCardSubtitle3}
            />
            <Card
              title={strings.privacyPolicyCardTitle4}
              subtitle={strings.privacyPolicyCardSubtitle4}
            />
            <Card
              title={strings.privacyPolicyCardTitle5}
              subtitle={strings.privacyPolicyCardSubtitle5}
            />
            <Card
              title={strings.privacyPolicyCardTitle6}
              subtitle={strings.privacyPolicyCardSubtitle6}
            />
            <Card
              title={strings.privacyPolicyCardTitle7}
              subtitle={strings.privacyPolicyCardSubtitle7}
            />
            <Card
              title={strings.privacyPolicyCardTitle8}
              subtitle={strings.privacyPolicyCardSubtitle8}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(PrivacyPolicyModal);
