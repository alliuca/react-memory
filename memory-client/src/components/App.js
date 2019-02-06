import React, { Component } from 'react';

import Game from './Game';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.block}>
        <Game />
      </div>
    );
  }
}

export default App;