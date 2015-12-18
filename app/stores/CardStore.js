import uuid from 'node-uuid';
import alt from '../libs/alt';
import CardActions from '../actions/CardActions';

// var MemoryFileSystem = require("memory-fs");
// var fs = new MemoryFileSystem();

class CardStore {
  constructor() {
    const numberOfCards = 8;
    this.bindActions(CardActions);
    this.current = null;
    this.disabled = false;
    this.cards = [
      {
        id: uuid.v4(),
        rank: 'boston-celtics',
        img: require('../data/svg/boston-celtics.svg'),
        shown: false,
        matched: false
      },
      {
        id: uuid.v4(),
        rank: 'boston-celtics',
        img: require('../data/svg/boston-celtics.svg'),
        shown: false,
        matched: false
      },
      {
        id: uuid.v4(),
        rank: 'chicago-bulls',
        img: require('../data/svg/chicago-bulls.svg'),
        shown: false,
        matched: false
      },
      {
        id: uuid.v4(),
        rank: 'chicago-bulls',
        img: require('../data/svg/chicago-bulls.svg'),
        shown: false,
        matched: false
      },
      {
        id: uuid.v4(),
        rank: 'golden-state-warriors',
        img: require('../data/svg/golden-state-warriors.svg'),
        shown: false,
        matched: false
      },
      {
        id: uuid.v4(),
        rank: 'golden-state-warriors',
        img: require('../data/svg/golden-state-warriors.svg'),
        shown: false,
        matched: false
      }
    ];

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