import {
  SET_GAME,
  SET_CARD_VISIBILITY,
  ADD_CARD_TO_PAIR,
  CHECK_PAIR,
  RESET_PAIR
} from './../actions/types';

const INITIAL_STATE = {
  status: 'unset',
  matches: [],
  cards: [],
  pair: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_GAME:
      return Object.assign({}, state, action.payload);

    case SET_CARD_VISIBILITY:
      var cards = [...state.cards].map(card => {
        if (card.id === action.payload.card.id)
          card[action.payload.filter] = !card[action.payload.filter];
        return card;
      });
      return Object.assign({}, state, { cards });

    case ADD_CARD_TO_PAIR:
      return Object.assign({}, state, { pair: [...state.pair, action.payload] });

    case RESET_PAIR:
      return Object.assign({}, state, { pair: [] });

    case CHECK_PAIR:
      if (state.pair.length === 2) {
        var matches = [...state.matches];
        // we got a match
        if (state.pair[0].rank === state.pair[1].rank)
          matches = [...matches, state.pair[0], state.pair[1]]
        return Object.assign({}, state, { matches });
      }
  }

  return state;
}