import alt from '../libs/alt';
import AppActions from '../actions/AppActions';
import CardStore from '../stores/CardStore';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.moves = 0;
  }
  updateCounter() {
    this.setState({moves: this.moves + 1});
  }
}

export default alt.createStore(AppStore, 'AppStore');