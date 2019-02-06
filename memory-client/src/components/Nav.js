import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetGame } from './../actions';
import styles from './Nav.css';

class Nav extends Component {
  render() {
    return (
      <div className={styles.block}>
        <button className="btn" onClick={this.props.resetGame}>New Game</button>
      </div>
    );
  }
}

export default connect(null, { resetGame })(Nav);