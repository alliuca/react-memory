import AltContainer from 'alt-container';
import React from 'react';
import Header from '../Header/Header.jsx';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';
import Cards from '../Cards/Cards.jsx';
import CardActions from '../../actions/CardActions';
import CardStore from '../../stores/CardStore';
import Alert from '../Alert/Alert.jsx';

export default class App extends React.Component {
  render() {
    const totalMatches = Math.floor(CardStore.getState().cards.length/2);
    return (
      <div>
        <AltContainer
          stores={[AppStore, CardStore]}
          inject={{
            moves: () => AppStore.getState().moves,
            matches: () => AppStore.getState().matches,
            total: () => totalMatches
          }}>
          <Header />
        </AltContainer>
        <AltContainer
          stores={[CardStore]}
          inject={{
            cards: () => CardStore.getState().cards,
            disabled: () => CardStore.getState().disabled
          }}>
          <Cards onFlip={this.checkPair} />
        </AltContainer>
        <AltContainer
          stores={[AppStore]}
          inject={{
            gameover: () => AppStore.getState().gameover,
            moves: () => AppStore.getState().moves
          }}>
          <Alert />
        </AltContainer>
      </div>
    );
  }
  checkPair = (id, rank) => {
    CardActions.update({id, rank});
    AppActions.updateCounter();
    AppActions.alert();
  }
};