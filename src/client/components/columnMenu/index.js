import React from 'react';

import './index.scss';

class ColumnMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(ev) {
    if (!this.menu.contains(ev.target)) {
      this.props.closeDropDownMenu();
    }
  }

  handleMenuAction(actionName) {
    if (actionName === 'delete') {
      this.props.deleteColumn(this.props.columnId);
    }
    if (actionName === 'rename') {
      this.props.editColumn(true);
    }
    if (actionName === 'add') {
      this.props.onChangeAddCardTitleState(true);
    }
    this.props.closeDropDownMenu();
  }

  render() {
    if (this.props.isEditing) {
      return (
        <div className="column-menu"
          ref={(elem) => {
            this.menu = elem;
          }}>
          <h4>Column Actions</h4>
          <ul className="column-menu-list">
            <li onClick={this.handleMenuAction.bind(this, 'rename')}>
              Rename Column
            </li>
            <li onClick={this.handleMenuAction.bind(this, 'add')}>
              Add Card
            </li>
            <li onClick={this.handleMenuAction.bind(this, 'delete')}>
              Delete Column
            </li>
            <li onClick={this.handleMenuAction.bind(this, 'move')}>
              Move Column To
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default ColumnMenu;
