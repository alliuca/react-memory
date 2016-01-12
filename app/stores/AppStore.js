import alt from '../libs/alt';
import AppActions from '../actions/AppActions';
import CardStore from '../stores/CardStore';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
  }
}

export default alt.createStore(AppStore, 'AppStore');