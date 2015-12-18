import alt from '../libs/alt';
import AppActions from '../actions/AppActions';
import CardStore from '../stores/CardStore';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.flippedCards = [];
  }
  reset() {
    this.setState({flippedCards: []});
  }
  update({id, rank}) {
    const cards = CardStore.getState().cards;
    const currCard = cards[cards.findIndex((c) => c.id === id)];
    
    console.log(currCard);
    const flippedCards = this.flippedCards.concat(currCard);
    this.setState({flippedCards});

    if (flippedCards.length > 1){
      console.log('checking pair..');
      if (flippedCards[0].rank === flippedCards[1].rank){
        console.log('ranks are equal, you got it');
      } else {
        console.log('not equal, sorry');
      }
    }
  }
}

export default alt.createStore(AppStore, 'AppStore');