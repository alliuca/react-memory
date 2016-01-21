import React from 'react';
import styles from './Header.css';
import Counter from '../Counter/Counter.jsx';
import Controls from '../Controls/Controls.jsx';

export default class Header extends React.Component {
  render() {
    const {moves, total, matches, ...props} = this.props;
    return (
      <header className={styles.block}>
        <Controls />
        <Counter moves={moves} matches={matches} total={total} />
      </header>
    );
  }
}