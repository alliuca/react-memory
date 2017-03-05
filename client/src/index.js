import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css/normalize.css';
import './index.css';

const rootEl = document.getElementById('root');
ReactDOM.render(
  <App />,
  rootEl
);

// https://webpack.github.io/docs/hot-module-replacement.html
// check if HMR is enabled
if (module.hot) {
  // accept update of dependency
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
