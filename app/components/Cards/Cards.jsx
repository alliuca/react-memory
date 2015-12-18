import React from 'react';
import Card from '../Card/Card.jsx';
import styles from './Cards.css';

export default class Cards extends React.Component {
  render() {
    const cards = this.props.items;
    return <div className={styles.block}>{cards.map(this.renderCard)}</div>;
  }
  renderCard = (card) => {
    return (
      <Card key={card.id} rank={card.rank} shown={card.shown} matched={card.matched} img={card.img} disabled={this.props.disabled} onFlip={this.props.onFlip.bind(null, card.id)} />
    );
  }
}