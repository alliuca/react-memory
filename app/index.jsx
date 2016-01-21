import 'normalize.css/normalize.css';
import './main.css';

import 'array.prototype.findindex';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';

main();

function main() {
  const app = document.createElement('div');
  document.body.appendChild(app);
  ReactDOM.render(<App />, app);
}