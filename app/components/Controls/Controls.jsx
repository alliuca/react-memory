import React from 'react';
import styles from './Controls.css';
import AppActions from '../../actions/AppActions';

export default () => {
  return (
    <div className={styles.block}>
      <nav>
        <ul>
          <li><a href="https://github.com/alliuca/react-memory" target="_blank">Memory@github</a></li>
          <li><a onClick={AppActions.reset}>Restart</a></li>
        </ul>
      </nav>
    </div>
  );
}