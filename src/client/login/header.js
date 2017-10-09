'use strict';
var React = require('react');

class Header extends React.Component {
  constructor(props){
        super(props);
    }
  render (){
    return(
      <header>
        <h1>Create your own account!</h1>
      </header>
    );
  }
};

module.exports = Header;