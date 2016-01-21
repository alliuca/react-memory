import alt from '../libs/alt';
import AppActions from '../actions/AppActions';
import CardStore from '../stores/CardStore';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.moves = 0;
    this.matches = 0;
    this.gameover = false;
  }
  updateCounter() {
    this.waitFor(CardStore);
    const matches = Math.floor(CardStore.getState().cards.filter((card) => card.matched === true).length/2);
    this.setState({
      moves: this.moves + 1,
      matches: matches
    });
  }
  alert() {
    this.waitFor(CardStore);
    if (this.matches === Math.floor(CardStore.getState().cards.length/2))
      setTimeout(() => this.setState({gameover: true}), 800);
  }
  reset() {
    alt.recycle();
  }
}

export default alt.createStore(AppStore, 'AppStore');