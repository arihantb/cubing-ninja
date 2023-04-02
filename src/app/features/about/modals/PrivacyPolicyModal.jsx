import React, {memo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Screen, Text} from '_components';
import {strings} from '_data/strings';
import {togglePrivacyPolicyModalVisibilityFromModal} from '../redux/privacyPolicyModalSlice';
import {togglePrivacyPolicyModalVisibility} from '../redux/aboutSlice';

const PrivacyPolicyModal = () => {
  const isPrivacyPolicyModalVisible = useSelector(
    state => state.privacyPolicyModal.isPrivacyPolicyModalVisible,
  );

  const dispatch = useDispatch();

  return (
    <Screen
      onClose={() => dispatch(togglePrivacyPolicyModalVisibilityFromModal())}
      onHide={() => dispatch(togglePrivacyPolicyModalVisibility())}
      title={strings.privacyPolicyTitle}
      isVisible={isPrivacyPolicyModalVisible}>
      <View className="p-2 bg-red-500">
        <Text className="text-neutral-900">{strings.privacyPolicyRedView}</Text>
      </View>
      <View className="p-2 bg-yellow-500">
        <Text className="text-neutral-900">
          {strings.privacyPolicyOrangeView}
        </Text>
      </View>
      <View className="p-2 bg-indigo-500">
        <Text className="text-neutral-900">
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
    </Screen>
  );
};

export default memo(PrivacyPolicyModal);
