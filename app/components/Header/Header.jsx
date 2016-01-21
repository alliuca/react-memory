import React from 'react';
import styles from './Header.css';
import Counter from '../Counter/Counter.jsx';
import Nav from '../Nav/Nav.jsx';

export default class Header extends React.Component {
  render() {
    const {moves, total, matches, ...props} = this.props;
    return (
      <header className={styles.block}>
        <Nav />
        <Counter moves={moves} matches={matches} total={total} />
      </header>
    );
  }
}