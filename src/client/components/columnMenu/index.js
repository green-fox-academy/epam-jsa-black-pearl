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
    this.props.closeDropDownMenu();
  }

  handleMenuAction(actionName) {
    if (actionName === 'delete') {
      this.props.deleteColumn(this.props.columnId);
    }
  }

  render() {
    if (this.props.isEditing) {
      return (
        <div className="column-menu"
          ref={(elem) => {
            this.menu = elem;
          }}>
          <p>Column Actions</p>
          <ul className="column-menu-list">
            <li>Rename Column</li>
            <li>Add Card</li>
            <li onClick={this.handleMenuAction.bind(this, 'delete')}>
              Delete Column
            </li>
            <li>Move Column To</li>
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default ColumnMenu;
