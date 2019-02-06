// import Firebase from 'firebase';
import makeStore from './src/store';
import startServer from './src/server';
import * as actions from './src/actions';

// const Cards = new Firebase('https://memory-game-6b6c3.firebaseio.com/')

export const store = makeStore();
startServer(store);

const cards = require('./cards.json');
const nCards = 8;
const carsSubset = cards.slice(0, nCards / 2);
const gameCards = [...carsSubset, ...carsSubset];

store.dispatch(actions.setCards([...cards, ...cards].sort(() => 0.5 - Math.random())));

// simulate a game (no random order)
store.dispatch(actions.setGame({
  status: 'on',
  matches: 0,
  cards: gameCards
}));
console.log('--- Setting game up ---');
console.log(`Game ${store.getState().game.status}!`);

console.log('--- Pick pair of cards... ---');
store.dispatch(actions.checkPair(store.getState().game, [store.getState().game.cards[0], store.getState().game.cards[4]]));
console.log('--- Pick pair of cards... ---');
store.dispatch(actions.checkPair(store.getState().game, [store.getState().game.cards[0], store.getState().game.cards[3]]));
console.log('--- Pick pair of cards... ---');
store.dispatch(actions.checkPair(store.getState().game, [store.getState().game.cards[0], store.getState().game.cards[2]]));
console.log('--- Pick pair of cards... ---');
store.dispatch(actions.checkPair(store.getState().game, [store.getState().game.cards[0], store.getState().game.cards[1]]));
console.log(`--- Game ${store.getState().game.status}, you won ---`);
console.log(store.getState().game);

// restart game
console.log('--- Restart ---');
console.log('--- Setting game up ---');
store.dispatch(actions.setGame({
  status: 'on',
  matches: 0,
  cards: gameCards
}));
console.log(`Game ${store.getState().game.status}!`);