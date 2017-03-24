import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGame, flipCard } from './../actions';
import Cards from './Cards';

const cardSubset = require('./../../../server/cards.json').slice(0, 6 / 2);
const gameCards = [...cardSubset, ...cardSubset];

class Game extends Component {
  componentWillMount() {
    this.props.setGame({
      status: 'on',
      cards: gameCards.map(card =>
        Object.assign({}, card, {
          id: '_' + Math.random().toString(36).substr(2, 9),
          shown: false,
          matched: false
        }))
    });
  }

  render() {
    return (
      <div>
        <Cards
          cards={this.props.game.cards}
          onFlipCard={this.props.flipCard} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { game: state.game }
}

export default connect(mapStateToProps, { setGame, flipCard })(Game);