import React from 'react';

import './index.scss';

const MONTH_PLUS_NUMBER = 1;
const ADD_DIGIT_THRESHOLD = 10;

class BoardList extends React.Component {
  constructor(props) {
    super(props);
  }

  addDigitZero(time) {
    if (time < ADD_DIGIT_THRESHOLD) {
      return '0' + time;
    }
    return time;
  }

  generateFullDate(dateObj) {
    let date = new Date(dateObj);

    return date.getFullYear() + '-' +
      this.addDigitZero((date.getMonth() + MONTH_PLUS_NUMBER)) + '-' +
      this.addDigitZero(date.getDate()) + ' ' +
      this.addDigitZero(date.getHours()) + ':' +
      this.addDigitZero(date.getMinutes()) + ':' +
      this.addDigitZero(date.getSeconds());
  }

  onClickDelete(ev) {
    let that = this;

    ev.stopPropagation();
    that.props.deleteBoard(this.props.boardId);
  }

  render() {
    let createDate = this.generateFullDate(this.props.boardDate);

    return (
      <div className="board-list"
        onClick={this.props.showBoardDetail}>
        <p
          className="board-name"
          title={this.props.boardName}>
          {this.props.boardName || '(No Title)'}
        </p>
        <p className="board-date">
          Created at {createDate}
          <span className="delete-icon">
            <a onClick={this.onClickDelete.bind(this)}></a>
          </span>
        </p>
      </div>
    );
  }
}

export default BoardList;
