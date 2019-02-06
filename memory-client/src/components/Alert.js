import React, { Component } from 'react'
import { connect } from 'react-redux';

import { resetGame } from './../actions';
import styles from './Alert.css';

class Alert extends Component {
  getContainerClass() {
    if (this.props.status === 'over')
      return styles.container + ' ' + styles.visible;
    return styles.container;
  }

  render() {
    return (
      <div className={this.getContainerClass()}>
        <div className={styles.block}>
          <div>You won in {this.props.moves} moves!</div>
          <a className={styles.restart} onClick={this.props.resetGame}>Restart</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { status, moves } = state.game;
  return { status, moves };
}

export default connect(mapStateToProps, { resetGame })(Alert);