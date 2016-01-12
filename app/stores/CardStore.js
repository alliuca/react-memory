import uuid from 'node-uuid';
import alt from '../libs/alt';
import CardActions from '../actions/CardActions';

class CardStore {
  constructor() {
    const req = require.context('../data/svg', true, /\.svg$/);
    const svgs = req.keys();
    let numberOfCards = 12;
    this.bindActions(CardActions);
    this.current = null;
    this.disabled = false;
    this.cards = [];

    // generate cards pairs
    for(let i=0; i<(numberOfCards/2); i++){
      let fn = svgs[i].substring(2).replace('.svg', '');
      this.cards.push({
        id: uuid.v4(),
        rank: fn,
        img: require(`../data/svg/${fn}.svg`),
        shown: false,
        matched: false
      });
      this.cards.push({
        id: uuid.v4(),
        rank: fn,
        img: require(`../data/svg/${fn}.svg`),
        shown: false,
        matched: false
      });
    }

    // shuffle cards
    this.cards.sort(() => 0.5 - Math.random());
  }
  update({id, rank}) {
    const current = this.current;
    // const currentIndex = this.cards.findIndex((c) => c.id === current.id);

    const cards = this.cards.map((card, index) => {
      if (card.id === id){
        this.setState({current: {i: index, el: card}});
        card.shown = true;
        if (current && card.rank === current.el.rank){
          card.matched = this.cards[current.i].matched = true;
          this.setState({current: null});
        } else if (current && card.rank !== current.el.rank) {
          this.setState({disabled: true});
          setTimeout(() => {
            card.shown = this.cards[current.i].shown = false;
            this.setState({current: null, disabled: false});
          }, 1000);
        }
      }
      return card;
    });

    this.setState({cards});
  }
}

export default alt.createStore(CardStore, 'CardStore');