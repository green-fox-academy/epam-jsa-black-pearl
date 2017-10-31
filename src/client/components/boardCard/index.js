import React from 'react';

import './index.scss';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete(ev) {
    let that = this;

    ev.stopPropagation();
    that.props.deleteCard(this.props.columnId, this.props.card._id);
  }

  render() {
    return (
      <div className="board-card">
        <p className="card-title">{this.props.card.cardName}</p>
        <div className="delete-card"
          onClick={this.onClickDelete}>X</div>
        <p className="card-subtitle">{this.props.card.cardsubname}</p>
      </div>
    );
  }
}

export default Cards;
