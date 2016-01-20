import React from 'react';
import styles from './Counter.css';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.block}>
        {this.props.moves}
      </div>
    )
  }
}