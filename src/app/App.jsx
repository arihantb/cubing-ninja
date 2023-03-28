import React, {memo} from 'react';
import store from '_redux/store';
import {Home} from '_features/home';
import {Provider} from 'react-redux';

const Root = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default memo(Root);
