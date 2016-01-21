import React from 'react';
import styles from './Nav.css';
import AppActions from '../../actions/AppActions';

export default () => {
  return (
    <div className={styles.block}>
      <nav>
        <ul>
          <li><a href="https://github.com/alliuca/react-memory" target="_blank">Memory</a></li>
          <li><a onClick={AppActions.reset}>Restart</a></li>
        </ul>
      </nav>
    </div>
  );
}