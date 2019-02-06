import {
  SET_GAME,
  SET_CARD_VISIBILITY,
  ADD_CARD_TO_PAIR,
  RESET_PAIR,
  CHECK_PAIR
} from './types';

export function setGame(settings) {
  return {
    type: SET_GAME,
    payload: settings
  }
}

export function resetGame(settings) {
  return (dispatch, getState) => {
    const { cards } = getState().game;
    cards.map(card => {
      card.shown = false;
      card.matched = false;
    });
    dispatch(setGame({
      status: 'on',
      moves: 0,
      matches: [],
      cards,
      pair: []
    }));
    setTimeout(() => {
      dispatch(setGame({
        cards: cards.sort(() => 0.5 - Math.random())
      }));
    }, 500);
  }
}

export function setCardVisibility(card, filter) {
  return {
    type: SET_CARD_VISIBILITY,
    payload: { card, filter }
  }
}

export function addCardToPair(card) {
  return {
    type: ADD_CARD_TO_PAIR,
    payload: card
  }
}

export function resetPair() {
  return {
    type: RESET_PAIR
  }
}

export function checkPair() {
  return {
    type: CHECK_PAIR
  }
}

export function flipCard(card) {
  return (dispatch, getState) => {
    // change state of the card to flipped
    dispatch(setCardVisibility(card, 'shown'));
    setTimeout(() => {
      // add card to the game pair
      dispatch(addCardToPair(card));
      const prevMatches = getState().game.matches;
      // check pair when there are two cards in the state
      dispatch(checkPair());
      const { cards, matches, pair } = getState().game;
      if (matches.length !== prevMatches.length)
        pair.forEach(match => dispatch(setCardVisibility(match, 'matched')));
      else if (pair.length > 1)
        pair.forEach(item => dispatch(setCardVisibility(item, 'shown')));
      if (pair.length > 1)
        dispatch(resetPair());
      if (matches.length === cards.length)
        dispatch(setGame({ status: 'over' }));
    }, 500);
  }
}