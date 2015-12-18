import React from 'react';
import Cards from '../Cards/Cards.jsx';
import CardActions from '../../actions/CardActions';
import CardStore from '../../stores/CardStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = CardStore.getState();
  }
  componentDidMount() {
    CardStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    CardStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context (defaults to `undefined` in strict mode).
    this.setState(state);
  }
  render() {
    const cards = this.state.cards;
    const disabled = this.state.disabled;
    return (
      <div>
        <Cards items={cards} disabled={disabled} onFlip={this.checkPair} />
      </div>
    );
  }
  checkPair = (id, rank) => {
    CardActions.update({id, rank});
  }
};