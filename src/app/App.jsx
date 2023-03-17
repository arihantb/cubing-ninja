import React, {memo} from 'react';
import {Provider} from 'react-redux';
import {Home} from '_features/home';
import store from '_redux/store';

const Root = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default memo(Root);
