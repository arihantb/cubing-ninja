import Modal from 'react-native-modal';
import React, {memo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Header, Text} from '_components';
import {strings} from '_data/strings';
import {togglePrivacyPolicyModalVisibilityFromModal} from '../redux/privacyPolicyModalSlice';
import {togglePrivacyPolicyModalVisibility} from '../redux/aboutSlice';
import styles from '../styles/privacyPolicyModalStyle';

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
      style={styles.modal}
      isVisible={isPrivacyPolicyModalVisible}>
      <View style={styles.mainView}>
        <Header
          title={strings.privacyPolicyTitle}
          hideModal={() =>
            dispatch(togglePrivacyPolicyModalVisibilityFromModal())
          }
        />
        <View style={styles.redView}>
          <Text style={styles.redViewText}>{strings.privacyPolicyRedView}</Text>
        </View>
        <View style={styles.orangeView}>
          <Text style={styles.orangeViewText}>
            {strings.privacyPolicyOrangeView}
          </Text>
        </View>
        <View style={styles.blueView}>
          <Text style={styles.blueViewText}>
            {strings.privacyPolicyBlueView}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card
            title={strings.privacyPolicyCardTitle1}
            subtitle={strings.privacyPolicyCardSubtitle1}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle2}
            subtitle={strings.privacyPolicyCardSubtitle2}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle3}
            subtitle={strings.privacyPolicyCardSubtitle3}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle4}
            subtitle={strings.privacyPolicyCardSubtitle4}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle5}
            subtitle={strings.privacyPolicyCardSubtitle5}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle6}
            subtitle={strings.privacyPolicyCardSubtitle6}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle7}
            subtitle={strings.privacyPolicyCardSubtitle7}
            cardStyle={styles.card}
          />
          <Card
            title={strings.privacyPolicyCardTitle8}
            subtitle={strings.privacyPolicyCardSubtitle8}
            cardStyle={styles.bottomCard}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(PrivacyPolicyModal);
