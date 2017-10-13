import React from 'react';
import './index.scss';

import Spinner from '../../../img/spinner.svg';
import Validator from 'validator';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isInvalidFields: false,
    };
  }
  onLogin() {
    function isValidEmail(email) {
      return Validator.isEmail(email);
    }
    function isValidPassword(password) {
      return password.length >= 6;
    }
    if (!isValidEmail(this.state.username) || !isValidPassword(this.state.password)) {
      let that = this;
      that.setState({isInvalidFields: true});
      setTimeout(function() {
        that.setState({isInvalidFields: false});
      }, 500);
      return;
    }
    this.setState({
      isLoading: true,
    });
    let that = this;
    doLogin(that, this.state.username, this.state.password);
    function doLogin(state, username, password) {
      let API = '/api/login';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myRequest = new Request(API, {
        'method': 'POST',
        'headers': myHeaders,
        'body': JSON.stringify({'username': username, 'password': password}),
      });
      fetch(myRequest).then(function(response) {
        if (response.status === 200) return response.json();
        throw new Error('error.');
      }).then(function(response) {
        localStorage.token = response.token;
        state.setState({isLoading: false});
        window.location.href = '/board';
      }).catch(function(error) {
        state.setState({
          isLoginFailure: true,
        });
        state.setState({isLoading: false});
      });
    }
  }
  onUsernameChange(ev) {
    this.setState({
      username: ev.target.value,
    });
  }
  onPasswordChange(ev) {
    this.setState({
      password: ev.target.value,
    });
  }
  render() {
    let button = null;
    if (!this.state.isLoading) {
      button = (
        <div>
          <input type="button" value="Login"
            onClick={this.onLogin.bind(this)}
            className={this.state.isInvalidFields ? 'shaking' : ''} />
        </div>
      );
    } else {
      button = (
        <div>
          <div className="loadingInput">
            <Spinner width={50} height={50} />
          </div>
        </div>
      );
    }
    let warning = null;
    if (this.state.isLoginFailure) {
      warning = (
        <p>Login failed.</p>
      );
    } else {
      warning = null;
    }
    return (
      <form className="login-form">
        <div className="warning">
          {warning}
        </div>
        <input type="text" placeholder="Email"
          onChange={this.onUsernameChange.bind(this)} />
        <input type="password" placeholder="Password"
          onChange={this.onPasswordChange.bind(this)} />
        {button}
      </form>
    );
  }
}

export default LoginForm;
