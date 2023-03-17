import React, {memo, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Switch} from 'react-native-elements';
import {View} from 'react-native';
import {Text} from '_components';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';
import styles from './styles/themeStyle';

const Theme = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      <View style={styles.mainView}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.copyDeviceInfo}>
            <Text style={styles.copyDeviceInfoTitle}>Theme</Text>
            <Text style={styles.copyDeviceInfoSubtitle}>
              Switch between Light and Dark theme
            </Text>
          </View>
          <Switch
            style={{flex: 1, marginRight: 20}}
            value={darkTheme}
            onValueChange={val => setDarkTheme(val)}
          />
        </View>
        <View style={styles.privacyPolicy}>
          <Text style={styles.copyDeviceInfoTitle}>AppBar Color</Text>
          <Text style={styles.copyDeviceInfoSubtitle}>
            Change the color of AppBar
          </Text>
        </View>
        <View style={styles.versionCheck}>
          <Text style={styles.copyDeviceInfoTitle}>Background Color</Text>
          <Text style={styles.copyDeviceInfoSubtitle}>
            Change the color of Background
          </Text>
        </View>
        <View style={styles.versionCheck}>
          <Text style={styles.copyDeviceInfoTitle}>Text Style</Text>
          <Text style={styles.copyDeviceInfoSubtitle}>
            Change the font size and color of Text
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default memo(Theme);
