import React from 'react';
import styles from './Alert.css';
import AppActions from '../../actions/AppActions';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={(this.props.gameover ? styles.container + ' ' + styles.visible : styles.container)}>
        <div className={styles.block}>
          You&apos;ve won in {this.props.moves} moves ! <a className={styles.restart} onClick={this.restart}>Restart</a>
        </div>
      </div>
    );
  }
  restart() {
    AppActions.reset();
  }
}