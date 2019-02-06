import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  // for Redux Dev Tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
  // Enable HMR for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index.js');
    store.replaceReducer(nextRootReducer);
  });
}