import React from 'react';

import BoardNav from '../boardNav';
import BoardColumn from '../boardColumn';
import $api from '../../api/api.json';
import {sendGetHttpRequest, sendPostHttpRequest, sendDeleteHttpRequest}
  from '../../controller/httpRequest.js';
import './index.scss';

const SUCCESSFUL_RESPONSE = /^20[0-6]$/;
const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class BoardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {columns: []},
      isAddColumnTitleEditing: false,
      addColumnTitleValue: '',
    };
    this.addColumn = this.addColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  componentWillMount() {
    sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
      .then((result) => {
        this.setState({data: result});
      });
  }

  addColumn() {
    if (this.state.addColumnTitleValue) {
      let reqObj = {columnName: this.state.addColumnTitleValue};

      sendPostHttpRequest($api.boards + '/' +
        this.props.match.params.id + '/columns', reqObj)
        .then((res) => {
          if (SUCCESSFUL_RESPONSE.test(res.status)) {
            sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
              .then((result) => {
                this.setState({data: result});
              });
          }
        });
    }
    this.setState({
      addColumnTitleValue: '',
      isAddColumnTitleEditing: false,
    });
  }

  deleteColumn(columnId) {
    sendDeleteHttpRequest($api.boards + '/' +
      this.props.match.params.id + '/columns/' + columnId)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({data: result});
            });
        }
      });
  }

  addCard(columnId, cardTitle) {
    let reqObj = {cardName: cardTitle};

    sendPostHttpRequest($api.boards + '/' + this.props.match.params.id +
      '/columns/' + columnId + '/cards', reqObj)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({data: result});
            });
        }
      });
  }

  generateBoardColumn() {
    let boardDisplay = [];

    if (Array.isArray(this.state.data.columns)) {
      this.state.data.columns.forEach(function(element) {
        boardDisplay.push(
          <BoardColumn column={element} key={element._id}
            deleteColumn={this.deleteColumn} addCard={this.addCard} />
        );
      }, this);
    }

    return boardDisplay;
  }

  generateAddColumn() {
    let addColumn = null;

    if (!this.state.isAddColumnTitleEditing) {
      addColumn = (
        <div className="add-column"
          onClick={this.onChangeAddColumnTitleState.bind(this, true)}>
          Add A Column...
        </div>
      );
    } else {
      addColumn = (
        <div className="add-column">
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange.bind(this)} />
          <button className="ok-button"
            onClick={this.addColumn}>
            Add
          </button>
          <button className="cancel-button"
            onClick={this.onChangeAddColumnTitleState.bind(this, false)}>
            x
          </button>
        </div>
      );
    }

    return addColumn;
  }

  onChangeAddColumnTitleState(state) {
    if (state) {
      this.setState({isAddColumnTitleEditing: state}, () => {
        this.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this.input.focus();
        this.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
      });
    } else {
      this.input.removeEventListener('keydown', this.onInputKeyDown.bind(this));
      this.setState({
        isAddColumnTitleEditing: state,
        addColumnTitleValue: '',
      });
    }
  }

  onInputChange(ev) {
    this.setState({addColumnTitleValue: ev.target.value});
  }

  onInputKeyDown(ev) {
    if (ev.keyCode === ENTER_KEY_CODE) {
      this.addColumn();
    } else if (ev.keyCode === ESC_KEY_CODE) {
      this.onChangeAddColumnTitleState(false);
    }
  }

  render() {
    let boardDisplay = this.generateBoardColumn();

    let addColumn = this.generateAddColumn();

    return (
      <div className="board">
        <BoardNav />
        <div className="board-header">
          <p><span className="board-name">{this.state.data.boardname}</span></p>
        </div>
        <div className="board-main">
          {boardDisplay}
          <div className="board-column-wrapper">
            <div className="board-column">
              {addColumn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardDetail;
