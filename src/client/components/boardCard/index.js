import React from 'react';

import './index.scss';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragEnter = this.handleDragEnd.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
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

  handleDragEnter(ev) {
    return;
  }

  handleDragOver(ev) {
    ev.preventDefault();
    this.card.style.border = '2px dashed #026aa7';
  }

  handleDragLeave(ev) {
    this.card.style.border = '';
  }

  handleDrop(ev) {
    this.card.style.border = '';
  }

  render() {
    return (
      <div className="board-card" draggable="true"
        ref={(c) => {
          this.card = c;
        }}
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}>
        <p className="card-title">{this.props.card.cardName}</p>
        <div className="delete-card"
          onClick={this.onClickDelete}>X</div>
        <p className="card-subtitle">{this.props.card.cardsubname}</p>
      </div>
    );
  }
}

export default Cards;
