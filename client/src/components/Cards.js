import React from 'react';
import Card from './Card';

export default (props) => {
  const cards = require('./../../../server/cards.json');
  return (
    <div>
      {cards.map(card => <Card {...card} /> )}
    </div>
  );
};