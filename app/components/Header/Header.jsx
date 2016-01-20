import React from 'react';
import styles from './Header.css';
import Counter from '../Counter/Counter.jsx';

export default class Header extends React.Component {
  render() {
    const {moves, ...props} = this.props;
    return (
      <header className={styles.block}>
        <Counter moves={moves} />
      </header>
    );
  }
}