import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGame, flipCard } from './../actions';
import styles from './Game.css';
import Header from './Header';
import Cards from './Cards';
import Nav from './Nav';
import Alert from './Alert';

const cardSubset = require('./../../../server/cards.json').slice(0, 12 / 2);
const gameCards = [...cardSubset, ...cardSubset];

class Game extends Component {
  componentWillMount() {
    // shuffle up
    gameCards.sort(() => 0.5 - Math.random());
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
      <div className={styles.block}>
        <Header />
        <Cards
          cards={this.props.game.cards}
          onFlipCard={this.props.flipCard} />
        <Nav />
        <Alert />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { game: state.game }
}

export default connect(mapStateToProps, { setGame, flipCard })(Game);