'use strict';
var React = require('react');

class Input extends React.Component {
  constructor(props){
        super(props);
    }
    verify(){
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      if (username === '') {
        alert('invailed username!');
      }else if(password === '') {
        alert('password cannot be none!');
      }else if (password.length < 6) {
        alert('password must be above 6 characters!');
      }
    }
    
  render (){
    return(
      <div>
        <input type="text"  id="username" placeholder="Username/email"/>
        <input type="text"  id="password" placeholder="Password"/>
        <button onClick={this.verify}>Login</button>
      </div>
    );
  }
};

module.exports = Input;