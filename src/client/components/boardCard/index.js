import React from 'react';

import './index.scss';

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board-card">
        <p className="card-title">{this.props.card.cardName}</p>
        <p className="card-subtitle">{this.props.card.cardsubname}</p>
      </div>
    );
  }
}

export default Cards;
