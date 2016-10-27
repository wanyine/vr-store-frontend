import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

// import logger from './log/logger' //error happened when webpacking:Module not found

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import loader from './reducers/loader'
import clientWithToken from './http/client'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

clientWithToken.interceptors.request.use(config => {
  store.dispatch(loader.actions.showLoader(true))
  return config
})

clientWithToken.interceptors.response.use(response => {
  store.dispatch(loader.actions.showLoader(false))
  return response
}, error => {
  // logger.error(error)
  store.dispatch(loader.actions.showLoader(false))
  return Promise.reject(error)
  // store.dispatch(openSnackBar(error.message))
})

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
