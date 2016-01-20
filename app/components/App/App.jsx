import AltContainer from 'alt-container';
import React from 'react';
import Header from '../Header/Header.jsx';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';
import Cards from '../Cards/Cards.jsx';
import CardActions from '../../actions/CardActions';
import CardStore from '../../stores/CardStore';
// import 'normalize.css/normalize.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header moves={AppStore.getState().moves} />
        <AltContainer
          stores={[AppStore, CardStore]}
          inject={{
            cards: () => CardStore.getState().cards,
            disabled: () => CardStore.getState().disabled
          }}>
          <Cards onFlip={this.checkPair} />
        </AltContainer>
      </div>
    );
  }
  checkPair = (id, rank) => {
    CardActions.update({id, rank});
    AppActions.updateCounter();
  }
};