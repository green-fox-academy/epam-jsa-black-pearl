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
    if (!dateObj) {
      return '';
    }
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

    if (this.props.boardId === 'loading') {
      return (
        <div className="board-list-loading">
          <p className="board-name">
            {this.props.boardName}
          </p>
          <div className="board-list-loading-spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      );
    }
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
