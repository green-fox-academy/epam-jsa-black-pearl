import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardList from '../boardList';
import person from '../../../img/person.png';
import $api from '../../api/api.json';
import {sendGetHttpRequest, sendPostHttpRequest, sendDeleteHttpRequest}
  from '../../controller/httpRequest.js';

const SUCCESSFUL_RESPONSE = /^20[0-6]$/;
const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isAddBoardEditing: false,
      isBoardsLoading: false,
      addBoardValue: '',
    };
  }

  componentDidMount() {
    this.onChangeBoardLoadingState('loading');
    sendGetHttpRequest($api.boards)
      .then((result) => {
        this.setState({data: result.boards});
      });
  }

  onChangeBoardLoadingState(boardName, id) {
    let withLoadingBoard = this.state.data;

    if (!id) {
      withLoadingBoard.push({
        _id: 'loading',
        boardname: boardName,
      });
      this.setState({data: withLoadingBoard});
    } else {
      withLoadingBoard.forEach(function(board) {
        if (board._id === id) {
          board._id = 'loading';
          board.boardname = 'deleting';
          this.setState({data: withLoadingBoard});
        }
      }, this);
    }
  }

  addBoard() {
    if (!this.state.addBoardValue) {
      return;
    }
    let reqObj = {'boardname': this.state.addBoardValue};

    this.onChangeBoardLoadingState(this.state.addBoardValue);
    sendPostHttpRequest($api.boards, reqObj)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards)
            .then((result) => {
              this.setState({data: result.boards});
            });
        }
      });

    this.onChangeAddBoardState(false);
  }

  deleteBoard(id) {
    this.onChangeBoardLoadingState('deleting', id);
    sendDeleteHttpRequest($api.boards + '/' + id)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards)
            .then((result) => {
              this.setState({data: result.boards});
            });
        }
      });
  }

  showBoardDetail(id) {
    this.props.history.push('/boards/' + id);
  }

  onChangeAddBoardState(state) {
    if (state) {
      this.setState({isAddBoardEditing: state}, () => {
        this.input.focus();
        this.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
      });
    } else {
      this.input.removeEventListener('keydown', this.onInputKeyDown.bind(this));
      this.setState({
        isAddBoardEditing: state,
        addBoardValue: '',
      });
    }
  }

  onInputChange(ev) {
    this.setState({addBoardValue: ev.target.value});
  }

  onInputKeyDown(ev) {
    let that = this;

    if (ev.keyCode === ENTER_KEY_CODE) {
      that.addBoard();
    } else if (ev.keyCode === ESC_KEY_CODE) {
      that.onChangeAddBoardState(false);
    }
  }

  generateBoardListComponent() {
    let list = [];

    this.state.data.forEach(function(element) {
      list.push(
        <BoardList
          boardId={element._id}
          boardDate={element.timestamp}
          boardName={element.boardname}
          showBoardDetail={this.showBoardDetail.bind(this, element._id)}
          deleteBoard={this.deleteBoard.bind(this)}
          key={element._id}
        />
      );
    }, this);

    return list;
  }

  generateAddBoardComponent() {
    if (!this.state.isAddBoardEditing) {
      return (
        <div className="board-add-list"
          onClick={this.onChangeAddBoardState.bind(this, true)}>
          <p className="board-name">Add A Board...</p>
        </div>
      );
    }

    return (
      <div className="board-add-list">
        <div className="board-add-list-row">
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange.bind(this)} />
        </div>
        <div className="board-add-list-row">
          <button
            className="board-add-list-ok-button"
            onClick={this.addBoard.bind(this)}>
            Add
          </button>
          <button
            className="board-add-list-cancel-button"
            onClick={this.onChangeAddBoardState.bind(this, false)}>
            ×
          </button>
        </div>
      </div>
    );
  }

  generateWelcomeList() {
    return (
      <div className="board-welcome-list"
        onClick={this.showBoardDetail.bind(this, 'welcome')}>
        <p className="board-name">WELCOME BOARD</p>
      </div>
    );
  }

  render() {
    let list = this.generateBoardListComponent();

    let addList = this.generateAddBoardComponent();

    let welcomeList = this.generateWelcomeList();

    return (
      <div className="board">
        <BoardNav />
        <div className="board-main-list">
          <section className="personal-board">
            <p>
              <img src={person} alt="icon" />
              <span>Personal Boards</span>
            </p>
          </section>
          {list}
          {addList}
        </div>
      </div>
    );
  }
}

export default BoardScreen;
