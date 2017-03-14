import {
  SET_GAME,
  CHECK_PAIR
} from './../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_GAME:
      return action.payload;
    case CHECK_PAIR:
      return action.payload;
  }
  return state;
}