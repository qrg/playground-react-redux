'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {devToolsEnhancer} from 'redux-devtools-extension';

import todoApp from './reducers';
import App from './components/App';

const store = createStore(todoApp, devToolsEnhancer());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
