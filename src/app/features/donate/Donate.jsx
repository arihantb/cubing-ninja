import React, {memo} from 'react';
import WebView from 'react-native-webview';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';

const Donate = () => {
  useDoubleBackTapToExit();

  return (
    <WebView
      allowsBackForwardNavigationGestures={true}
      javaScriptEnabled={true}
      source={{
        uri: 'https://www.buymeacoffee.com/arihantb',
      }}
      pullToRefreshEnabled={false}
      setDisplayZoomControls={() => false}
    />
  );
};

export default memo(Donate);
