import { expect } from './test_helper';
import { setCards } from './../src/actions';
import { SET_CARDS } from './../src/actions/types';
import cardsReducer from './../src/reducers/cards';

describe('Store', () => {
  it('initializes the store with some cards', () => {
    const action = setCards(['boston-celtics', 'chicago-bulls']);
    expect(action.type).to.equal(SET_CARDS);
    expect(action.payload).to.include.members(['boston-celtics', 'chicago-bulls']);
    // console.log(cardsReducer([], action));
    // expect(cardsReducer([], action)).to.equal(['boston-celtics']);
  });  
});