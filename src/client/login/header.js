'use strict';
import React from 'react';
import './scss/header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <img src="../../img/black_pearl.png" alt=""/>
        <h1>Welcome Onboard!</h1>
      </header>
    );
  }
}

export default Header;
