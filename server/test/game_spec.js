import { expect } from './test_helper';
import { setGame, checkPair } from './../src/actions';

describe('Game', () => {
  let nCards, cards, subset;

  beforeEach(() => {
    nCards = 8;
    cards = require('./../cards.json').slice(0, nCards / 2);
  });

  it('uses a subset of cards defined by the user', () => {
    subset = [...cards, ...cards].sort(() => 0.5 - Math.random());
    const action = setGame({
      status: 'on',
      matches: 0,
      cards: subset
    });

    // number of cards defined should have an even value
    expect((action.payload.cards.length) % 2).to.equal(0);
    expect(action.payload.cards.length).to.equal(nCards);
  });

  it('has a match', () => {
    subset = [...cards, ...cards];
    const action = setGame({
      status: 'on',
      matches: 0,
      cards: subset
    });
    const firstSelection = action.payload.cards[0];
    const secondSelection = action.payload.cards[nCards / 2];
    const game = checkPair(action.payload, [firstSelection, secondSelection]);
    
    expect(game.payload.matches).to.equal(1);

    // check that the game.cards array does not contain the matches anymore
    expect(game.payload.cards).to.not.include.members([firstSelection, secondSelection]);
  });

  it('is over', () => {
    subset = [...(cards).slice(3), ...cards.slice(3)];
    const action = setGame({
      status: 'on',
      matches: 3,
      cards: subset
    });
    const firstSelection = action.payload.cards[0];
    const secondSelection = action.payload.cards[1];
    const game = checkPair(action.payload, [firstSelection, secondSelection]);

    expect(game.payload.matches).to.equal(4);
    expect(game.payload.cards).to.be.empty;
  });
});