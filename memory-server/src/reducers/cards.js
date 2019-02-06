// import { setCards, INITIAL_STATE } from './core';
import { SET_CARDS } from './../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case SET_CARDS:
      return action.payload;
  }
  return state;
}