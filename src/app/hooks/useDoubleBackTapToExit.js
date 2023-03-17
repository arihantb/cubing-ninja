import {useState, useEffect} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';

/**
 * Exits the app if double back tapped in the interval of 2 seconds.
 */
export const useDoubleBackTapToExit = () => {
  const [exitTimeOut, setExitTimeOut] = useState(0);

  const backAction = () => {
    setTimeout(() => {
      setExitTimeOut(0);
    }, 2000);

    if (exitTimeOut === 0) {
      setExitTimeOut(exitTimeOut + 1);
      ToastAndroid.show('Press back again to exit!', ToastAndroid.SHORT);
    } else if (exitTimeOut === 1) {
      BackHandler.exitApp();
    }

    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });
};
