import React from 'react';

import './index.scss';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  onClickDelete(ev) {
    let that = this;

    ev.stopPropagation();
    that.props.deleteCard(this.props.columnId, this.props.card._id);
  }

  handleDragStart(ev) {
    ev.stopPropagation();
    ev.dataTransfer.setData('cardId', this.props.card._id);
    ev.dataTransfer.setData('columnId', this.props.columnId);
  }

  handleDrag(ev) {
    return;
  }

  handleDragEnd(ev) {
    return;
  }

  render() {
    return (
      <div className="board-card" draggable="true"
        onDragStart={this.handleDragStart}>
        <p className="card-title">{this.props.card.cardName}</p>
        <div className="delete-card"
          onClick={this.onClickDelete}>X</div>
        <p className="card-subtitle">{this.props.card.cardsubname}</p>
      </div>
    );
  }
}

export default Cards;
