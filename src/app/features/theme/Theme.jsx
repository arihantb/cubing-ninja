import React, {memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Switch, View} from 'react-native';
import {Text} from '_components';
import {useColorScheme} from 'nativewind';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';

const Theme = () => {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  useDoubleBackTapToExit();

  return (
    <SafeAreaProvider>
      <View className="flex-1 p-8 gap-8 bg-neutral-50 dark:bg-neutral-900">
        <View className="flex-row">
          <View>
            <Text className="text-lg">Dark Mode</Text>
            <Text className="text-sm">Switch between Light and Dark theme</Text>
          </View>
          <Switch
            className="flex-1"
            value={colorScheme === 'dark'}
            onChangeValue={toggleColorScheme}
          />
        </View>
        <View>
          <Text className="text-lg">AppBar Color</Text>
          <Text className="text-sm">Change the color of AppBar</Text>
        </View>
        <View>
          <Text className="text-lg">Background Color</Text>
          <Text className="text-sm">Change the color of Background</Text>
        </View>
        <View>
          <Text className="text-lg">Text Style</Text>
          <Text className="text-sm">
            Change the font size and color of Text
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default memo(Theme);
