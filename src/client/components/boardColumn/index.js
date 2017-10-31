import React from 'react';

import './index.scss';
import Card from '../boardCard';
import Menu from '../columnMenu';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isAddCardTitleEditing: false,
      addCardTitleValue: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddCardClick = this.onAddCardClick.bind(this);
  }

  componentDidMount() {
    let that = this;

    that.editIcon.addEventListener('click', (ev) => {
      ev.stopPropagation();
      that.toggleDropDownMenu();
    });
  }

  componentWillUnmount() {
    let that = this;

    that.editIcon.removeEventListener('click', (ev) => {
      ev.stopPropagation();
      that.toggleDropDownMenu();
    });
  }

  toggleDropDownMenu() {
    this.setState({isEditing: !this.state.isEditing});
  }

  closeDropDownMenu() {
    this.setState({isEditing: false});
  }

  generateAddCard() {
    let addCardField = null;

    if (!this.state.isAddCardTitleEditing) {
      addCardField = (
        <div className="add-card"
          onClick={this.onChangeAddCardTitleState.bind(this, true)}>
          Add A Card...
        </div>
      );
    } else {
      addCardField = (
        <div className="add-card">
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange} />
          <button className="ok-button"
            onClick={this.onAddCardClick}>
            Add
          </button>
          <button className="cancel-button"
            onClick={this.onChangeAddCardTitleState.bind(this, false)}>
            x
          </button>
        </div>
      );
    }

    return addCardField;
  }

  onChangeAddCardTitleState(state) {
    if (state) {
      this.setState({isAddCardTitleEditing: state}, () => {
        this.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this.input.focus();
      });
    } else {
      this.input.removeEventListener('keydown', this.onInputKeyDown.bind(this));
      this.setState({isAddCardTitleEditing: state});
    }
  }

  onInputChange(ev) {
    this.setState({addCardTitleValue: ev.target.value});
  }

  onInputKeyDown(ev) {
    if (ev.keyCode === ENTER_KEY_CODE) {
      this.onAddCardClick();
    } else if (ev.keyCode === ESC_KEY_CODE) {
      this.setState({
        addCardTitleValue: '',
        isAddCardTitleEditing: false,
      });
    }
  }

  onAddCardClick() {
    if (this.state.addCardTitleValue) {
      this.props.addCard(this.props.column._id, this.state.addCardTitleValue);
    }
    this.setState({
      addCardTitleValue: '',
      isAddCardTitleEditing: false,
    });
  }

  render() {
    let cardDisplay = [];
    let addCard = this.generateAddCard();

    if (Array.isArray(this.props.column.cards)) {
      this.props.column.cards.forEach(function(element) {
        cardDisplay.push(
          <Card card={element} key={element._id}
            columnId={this.props.column._id}
            deleteCard={this.props.deleteCard} />
        );
      }, this);
    }

    return (
      <div className="board-column-wrapper">
        <div className="board-column">
          <div className="column-header">
            <h4 className="column-title">{this.props.column.columnName}</h4>
            <div className="edit-icon"
              ref={(elem) => {
                this.editIcon = elem;
              }}>
            </div>
            {this.state.isEditing ?
              <Menu
                columnId={this.props.column._id}
                closeDropDownMenu={this.closeDropDownMenu.bind(this)}
                deleteColumn={this.props.deleteColumn}
                isEditing={this.state.isEditing} /> :
              null}
          </div>
          <div>
            {cardDisplay}
          </div>
          {addCard}
        </div>
      </div>
    );
  }
}

export default List;
