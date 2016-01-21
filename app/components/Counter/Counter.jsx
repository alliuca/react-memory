import React from 'react';
import styles from './Counter.css';

export default class Counter extends React.Component {
  render() {
    return (
      <div className={styles.block}>
        <span className={styles.moves}>Moves: {this.props.moves}</span>
        <span className={styles.matched}>Matches: {this.props.matches} / {this.props.total}</span>
      </div>
    );
  }
}