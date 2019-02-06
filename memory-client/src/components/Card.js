import React, { Component } from 'react';

import styles from './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.image = require(`./../data/svg/${this.props.rank}.svg`);
  }

  getCardClass() {
    let c = styles.block;
    if (this.props.shown)
      c += ` ${styles.faceup}`;
    if (this.props.matched)
      c += ` ${styles.matched}`;
    return c;
  }

  handleClick() {
    if (!this.props.shown)
      return this.props.onClick();
  }

  render() {
    return (
      <div className={this.getCardClass()} onClick={this.handleClick.bind(this)}>
        <div className={styles.flipper}>
          <div className={styles.front}></div>
          <div className={styles.back}>
            <img src={this.image} alt={this.props.rank} />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;