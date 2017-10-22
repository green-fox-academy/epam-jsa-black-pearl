import React from 'react';

import './index.scss';

const MONTH_PLUS_NUMBER = 1;

class BoardList extends React.Component {
  constructor(props) {
    super(props);
  }

  generateFullDate(dateObj) {
    let date = new Date(dateObj);

    return date.getFullYear() + '-' + (date.getMonth() + MONTH_PLUS_NUMBER) +
      '-' + date.getDate() + ' ' + date.getHours() + ':' +
      date.getMinutes() + ':' + date.getSeconds();
  }

  render() {
    let createDate = this.generateFullDate(this.props.boardDate);

    return (
      <div className="board-list"
        onClick={this.props.showBoardDetail}>
        <p
          className="board-name"
          title={this.props.boardName}>{this.props.boardName}</p>
        <p className="board-date">Created at {createDate}</p>
      </div>
    );
  }
}

export default BoardList;
