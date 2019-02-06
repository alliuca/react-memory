import React from 'react';

import Card from './Card';
import styles from './Cards.css';

const Cards = (props) => {
  return (
    <div className={styles.block}>
      {props.cards.map((card) =>
        <Card
          key={card.id}
          {...card}
          onClick={() => props.onFlipCard(card)} />
      )}
    </div>
  );
};

export default Cards;