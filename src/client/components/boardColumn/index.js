import React from 'react';

import './index.scss';
import Card from '../boardCard';
import Menu from '../columnMenu';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;
const STATIC_CARD_INDEX = 0;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isColumnTitleEditing: false,
      isAddCardTitleEditing: false,
      addCardTitleValue: '',
      priorityValue: 'high',
      titleValue: '',
      allowDrag: true,
    };
    this.editColumn = this.editColumn.bind(this);
    this.onRenameClick = this.onRenameClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.onAddCardClick = this.onAddCardClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.closeDropDownMenu = this.closeDropDownMenu.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onChangeAddCardTitleState = this.onChangeAddCardTitleState.bind(this);
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

  editColumn() {
    let that = this;

    that.setState({
      isColumnTitleEditing: !this.state.isColumnTitleEditing,
      allowDrag: this.state.isColumnTitleEditing,
    }, () => {
      if (this.state.isColumnTitleEditing) {
        that.columnTitleInput.focus();
        that.columnTitleInput.addEventListener('keydown', this.onInputKeyDown.bind(this));
      } else {
        that.columnTitleInput.removeEventListener('keydown', this.onInputKeyDown.bind(this));
      }
    });
  }

  generateColumnTitle() {
    if (this.state.isColumnTitleEditing) {
      return (
        <section className="column-title-editing">
          <input type="text"
            ref={(c) => {
              this.columnTitleInput = c;
            }}
            onChange={this.onTitleInputChange}
          />
        </section>
      );
    }
    return (
      <h4 className="column-title">{this.props.column.columnName}</h4>
    );
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
          <span>Priority: </span>
          <select onChange={this.onSelectChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
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

  onSelectChange(ev) {
    this.setState({priorityValue: ev.target.value});
  }

  onTitleInputChange(ev) {
    this.setState({titleValue: ev.target.value});
  }

  onInputKeyDown(ev) {
    if (ev.keyCode === ENTER_KEY_CODE) {
      this.onAddCardClick();
      this.onRenameClick();
    } else if (ev.keyCode === ESC_KEY_CODE) {
      this.setState({
        addCardTitleValue: '',
        isAddCardTitleEditing: false,
        titleValue: '',
        isColumnTitleEditing: false,
      });
    }
  }

  onAddCardClick() {
    if (this.state.addCardTitleValue) {
      this.props.addCard(this.props.column._id,
        this.state.addCardTitleValue, this.state.priorityValue);
    }
    this.setState({
      addCardTitleValue: '',
      isAddCardTitleEditing: false,
    });
  }

  onRenameClick() {
    if (this.state.titleValue &&
      this.state.titleValue !== this.props.column.columnName) {
      this.props.renameColumn(this.props.column._id, this.state.titleValue);
    }
    this.setState({
      titleValue: '',
      isColumnTitleEditing: false,
    });
  }

  handleDragStart(ev) {
    this.closeDropDownMenu();
    ev.dataTransfer.setData('columnId', this.props.column._id);
  }

  handleDrag(ev) {
    return;
  }

  handleDragEnd(ev) {
    return;
  }

  handleDragEnter(ev) {
    if (this.wrapper.contains(ev.target)) {
      this.wrapper.style.border = '2px dashed #026aa7';
    }
  }

  handleDragOver(ev) {
    ev.preventDefault();
    this.wrapper.style.border = '2px dashed #026aa7';
  }

  handleDragLeave(ev) {
    this.wrapper.style.border = '';
  }

  handleDrop(ev) {
    this.wrapper.style.border = '';
    let sourceColumnId = ev.dataTransfer.getData('columnId');
    let sourceCardId = ev.dataTransfer.getData('cardId');

    if (this.props.column._id === sourceColumnId) {
      return;
    }

    if (!ev.dataTransfer.getData('cardId')) {
      this.props.reorderColumns(sourceColumnId, this.props.column._id);
    } else {
      this.props.moveCard(sourceColumnId, this.props.column._id,
        sourceCardId, STATIC_CARD_INDEX);
    }
  }

  render() {
    let cardDisplay = [];
    let addCard = this.generateAddCard();
    let columnTitle = this.generateColumnTitle();

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
      <div className="board-column-wrapper"
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        ref={(elem) => {
          this.wrapper = elem;
        }}>
        <div className="board-column"
          draggable={this.state.allowDrag ? 'true' : 'false'}
          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragEnd={this.handleDragEnd}>
          <div className="column-header">
            {columnTitle}
            <div className={this.state.isColumnTitleEditing ?
              'display-none' : 'edit-icon'}
            ref={(elem) => {
              this.editIcon = elem;
            }}>
            </div>
            {this.state.isEditing ?
              <Menu
                columnId={this.props.column._id}
                closeDropDownMenu={this.closeDropDownMenu}
                deleteColumn={this.props.deleteColumn}
                onChangeAddCardTitleState={this.onChangeAddCardTitleState}
                editColumn={this.editColumn}
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
