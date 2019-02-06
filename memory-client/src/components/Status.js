import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Status.css';

class Status extends Component {
  render() {
    return (
      <div>
        <div className={styles.item}>
          <span className={styles.label}>Moves</span>
          <span className={styles.value}>{this.props.moves}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Matches</span>
          <span className={styles.value}>{this.props.matches.length / 2}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { moves, matches } = state.game;
  return { moves, matches }
}

export default connect(mapStateToProps, null)(Status);