import React from 'react';
import styles from './Card.css';
import CardActions from '../../actions/CardActions';
import CardStore from '../../stores/CardStore';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {shown, matched, img, rank, ...props} = this.props;
    return (
      <div className={this.getCardClass(shown, matched)} onClick={this.flipCard}>
        <div className={styles.flipper}>
          <div className={styles.front}></div>
          <div className={styles.back}>
            <img src={img} alt={rank} />
          </div>
        </div>
      </div>
    );
  }
  getCardClass = (shown, matched) => {
    let c = styles.block;
    if (shown)
      c += ' ' + styles.faceup;
    if (matched)
      c += ' ' + styles.matched;
    return c;
  }
  flipCard = () => {
    if (!this.props.shown && !this.props.disabled)
      this.props.onFlip(this.props.rank);
  }
}