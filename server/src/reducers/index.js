import { combineReducers } from 'redux';
import cardsReducer from './cards';
import gameReducer from './game';

const rootReducer = combineReducers({
  cards: cardsReducer,
  game: gameReducer
});

export default rootReducer;
