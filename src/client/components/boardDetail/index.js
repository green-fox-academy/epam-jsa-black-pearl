import React from 'react';

import BoardNav from '../boardNav';
import BoardColumn from '../boardColumn';
import $api from '../../api/api.json';
import {sendGetHttpRequest, sendPostHttpRequest,
  sendDeleteHttpRequest, sendPutHttpRequest}
  from '../../controller/httpRequest.js';
import './index.scss';
import img from '../../../img/loading.png';

const SUCCESSFUL_RESPONSE = /^20[0-6]$/;
const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;
const SPLICE_DELETE_ONE = 1;
const SPLICE_DELETE_ZERO = 0;

class BoardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {columns: []},
      isAddColumnTitleEditing: false,
      addColumnTitleValue: '',
      isRetrievingData: false,
    };
    this.addColumn = this.addColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.renameColumn = this.renameColumn.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.reorderColumns = this.reorderColumns.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  componentWillMount() {
    this.setState({isRetrievingData: true});
    sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
      .then((result) => {
        this.setState({data: result});
        this.setState({isRetrievingData: false});
      });
  }

  addColumn() {
    if (this.state.addColumnTitleValue) {
      let reqObj = {columnName: this.state.addColumnTitleValue};

      this.setState({isRetrievingData: true});
      sendPostHttpRequest($api.boards + '/' +
        this.props.match.params.id + '/columns', reqObj)
        .then((res) => {
          if (SUCCESSFUL_RESPONSE.test(res.status)) {
            sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
              .then((result) => {
                this.setState({data: result});
                this.setState({isRetrievingData: false});
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
    this.setState({isRetrievingData: true});
    sendDeleteHttpRequest($api.boards + '/' +
      this.props.match.params.id + '/columns/' + columnId)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({isRetrievingData: false});
              this.setState({data: result});
            });
        }
      });
  }

  renameColumn(columnId, newTitle) {
    let requestBody = {columnName: newTitle};

    this.setState({isRetrievingData: true});
    sendPutHttpRequest($api.boards + '/' +
      this.props.match.params.id + '/columns/' + columnId, requestBody)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({data: result});
              this.setState({isRetrievingData: false});
            });
        }
      });
  }

  reorderColumns(sourceColumnId, targetColumnId) {
    let data = this.state.data;
    let sourceColumn;
    let sourceColumnIndex;
    let targetColumnIndex;

    data.columns.forEach(function(element, index) {
      if (element._id === sourceColumnId) {
        sourceColumnIndex = index;
        sourceColumn = element;
      } else if (element._id === targetColumnId) {
        targetColumnIndex = index;
      }
    }, this);

    let requestBody = {newIndex: targetColumnIndex};

    this.setState({isRetrievingData: true});
    sendPostHttpRequest($api.boards + '/' + this.props.match.params.id +
    '/columns/' + sourceColumnId, requestBody)
      .then((res) => {
        data.columns.splice(sourceColumnIndex, SPLICE_DELETE_ONE);
        data.columns.splice(targetColumnIndex,
          SPLICE_DELETE_ZERO, sourceColumn);
        this.setState({data: data});
        this.setState({isRetrievingData: false});
      });
  }

  addCard(columnId, cardTitle) {
    let reqObj = {cardName: cardTitle};

    this.setState({isRetrievingData: true});
    sendPostHttpRequest($api.boards + '/' + this.props.match.params.id +
      '/columns/' + columnId + '/cards', reqObj)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({data: result});
              this.setState({isRetrievingData: false});
            });
        }
      });
  }

  deleteCard(columnId, cardId) {
    this.setState({isRetrievingData: true});
    sendDeleteHttpRequest($api.boards + '/' +
     this.props.match.params.id + '/columns/' + columnId + '/cards/' + cardId)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({data: result});
              this.setState({isRetrievingData: false});
            });
        }
      });
  }

  moveCard(sourceColumnId, targetColumnId, sourceCardId, targetIndex) {
    let reqObj = {
      newColumnId: targetColumnId,
      newIndex: targetIndex,
    };

    sendPostHttpRequest($api.boards + '/' + this.props.match.params.id +
    '/columns/' + sourceColumnId + '/cards/' + sourceCardId, reqObj)
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
            renameColumn={this.renameColumn}
            deleteColumn={this.deleteColumn}
            reorderColumns={this.reorderColumns}
            addCard={this.addCard}
            deleteCard={this.deleteCard}
            moveCard={this.moveCard} />
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

  isloading() {
    let isloading;

    if (this.state.isRetrievingData) {
      isloading = (
        <div onClick={this.prevent} className="loading">
          <img src={img} className="loading-effect"></img>
        </div>
      );
    }
    return isloading;
  }

  prevent(event) {
    event.preventDefault();
  }

  render() {
    let boardDisplay = this.generateBoardColumn();
    let addColumn = this.generateAddColumn();
    let loading = this.isloading();

    return (
      <div className="board">
        {loading}
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
