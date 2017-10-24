import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardList from '../boardList';
import person from '../../../img/person.png';
import $api from '../../api/api.json';
import {sendGetHttpRequest, sendPostHttpRequest, sendDeleteHttpRequest}
  from '../../controller/httpRequest.js';

const SUCCESSFUL_RESPONSE = /^20[0-6]$/;

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isAddBoardEditing: false,
      addBoardValue: '',
    };
  }

  componentDidMount() {
    sendGetHttpRequest($api.boards)
      .then((result) => {
        this.setState({data: result.boards});
      });
  }

  addBoard() {
    if (!this.state.addBoardValue) {
      return;
    }
    let reqObj = {
      'boardname': this.state.addBoardValue,
      'timestamp': (new Date()).getTime(),
    };

    sendPostHttpRequest($api.boards, reqObj)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards)
            .then((result) => {
              this.setState({data: result.boards});
            });
        }
      });

    this.setState({
      isAddBoardEditing: false,
      addBoardValue: '',
    });
  }

  deleteBoard(id) {
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
      });
    } else {
      this.setState({isAddBoardEditing: state});
    }
  }

  onInputChange(ev) {
    this.setState({addBoardValue: ev.target.value});
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
          deleteBoard={this.deleteBoard}
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
            onClick={this.addBoard.bind(this)}>
            √
          </button>
          <button
            onClick={this.onChangeAddBoardState.bind(this, false)}>
            ×
          </button>
        </div>
      </div>
    );
  }

  generateWelcomeList() {
    return (
      <div className="board-welcome-list">
        <p className="board-name">Welcome onboard...</p>
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
              <span>Personal Board</span>
            </p>
          </section>
          {welcomeList}
          {list}
          {addList}
        </div>
      </div>
    );
  }
}

export default BoardScreen;
