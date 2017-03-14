import React, { Component } from 'react';
import styles from './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.flipper}>
        <div className={styles.flipper}>
          <div className={styles.front}></div>
          <div className={styles.back}>
            <img src="http://placehold.it/150x150" alt={this.props.rank} />
          </div>
        </div>
      </div>
    );
  }
}