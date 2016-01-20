import React from 'react';
import Card from '../Card/Card.jsx';
import styles from './Cards.css';

export default class Cards extends React.Component {
  render() {
    const {cards, disabled, onFlip, ...props} = this.props;
    return (
      <div className={styles.block}>
        {cards.map((card) =>
          <Card
            key={card.id}
            rank={card.rank}
            shown={card.shown}
            matched={card.matched}
            img={card.img}
            disabled={disabled}
            onFlip={onFlip.bind(null, card.id)} />
        )}
      </div>
    );
  }
}