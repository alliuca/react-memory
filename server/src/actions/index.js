import {
  SET_CARDS,
  SET_GAME,
  CHECK_PAIR
} from './types';

export function setCards(cards) {
  return {
    type: SET_CARDS,
    payload: cards
  };
}

export function setGame(game) {
  return {
    type: SET_GAME,
    payload: game
  }
}

export function checkPair(state, pair) {
  const isMatch = pair[0].rank === pair[1].rank ? true : false;
  let cards = state.cards;
  let matches = state.matches;
  let status = state.status;
  if (isMatch) {
    cards = cards.filter((card) => card.rank !== pair[0].rank);
    matches++;

    if (!cards.length)
      status = 'over';
  }

  return {
    type: CHECK_PAIR,
    payload: { status, matches, cards }
  }
}