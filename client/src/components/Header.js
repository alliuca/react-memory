import React from 'react';

import styles from './Header.css';
import Status from './Status';

export default function Header() {
  return (
    <div className={styles.block}>
      <Status />
    </div>
  );
}