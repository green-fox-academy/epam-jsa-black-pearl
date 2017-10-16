import React from 'react';
import {Redirect} from 'react-router';
import Validator from 'validator';

import './index.scss';
import Spinner from '../../../img/spinner.svg';
<<<<<<< HEAD
import Validator from 'validator';
const statusOK = 200;
const internalError = 500;
const minPwdLength = 6;
=======

const MIN_PASSWORD_LENGTH = 6;
const ANIMATION_SHAKING_DURATION = 500;
const STATUS_CODE_OK = 200;
>>>>>>> develop

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isInvalidFields: false,
      isLoggedIn: false,
      isLoginFailure: false,
    };
  }

  onLogin() {
    function isValidEmail(email) {
      return Validator.isEmail(email);
    }

    function isValidPassword(password) {
<<<<<<< HEAD
      return password.length >= minPwdLength;
    }
    if (!isValidEmail(this.state.username)
      || !isValidPassword(this.state.password)) {
      let that = this;

      that.setState({isInvalidFields: true});
      setTimeout(function() {
        that.setState({isInvalidFields: false});
      }, internalError);
      return;
    }
    this.setState({isLoading: true});
    let that = this;
=======
      return password.length >= MIN_PASSWORD_LENGTH;
    }
>>>>>>> develop

    function doLogin(state, username, password) {
      let API = '/api/login';

      let myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      let myRequest = new Request(API, {
        'method': 'POST',
        'headers': myHeaders,
        'body': JSON.stringify({'username': username, 'password': password}),
      });

<<<<<<< HEAD
      fetch(myRequest).then(function(response) {
        if (response.status === statusOK) return response.json();
=======
      fetch(myRequest).then((response) => {
        if (response.status === STATUS_CODE_OK) return response.json();
>>>>>>> develop
        throw new Error('error.');
      }).then((response) => {
        localStorage.token = response.token;
<<<<<<< HEAD
        state.setState({isLoading: false});
        window.location.href = '/board';
      }).catch(function(error) {
        state.setState({isLoginFailure: true});
        state.setState({isLoading: false});
      });
    }
=======
        state.setState({isLoading: false, isLoggedIn: true});
      }).catch((error) => {
        state.setState({isLoading: false, isLoginFailure: true});
      });
    }
    if (!isValidEmail(this.state.username)
     || !isValidPassword(this.state.password)) {
      let that = this;

      that.setState({isInvalidFields: true});
      setTimeout(() => {
        that.setState({isInvalidFields: false});
      }, ANIMATION_SHAKING_DURATION);
      return;
    }
    this.setState({isLoading: true});
    let that = this;

>>>>>>> develop
    doLogin(that, this.state.username, this.state.password);
  }
  onUsernameChange(ev) {
    this.setState({username: ev.target.value});
  }
  onPasswordChange(ev) {
    this.setState({password: ev.target.value});
  }
  onWarningMessage() {
    let warning = null;

    if (this.state.isLoginFailure) {
      warning = (
        <p>Login failed.</p>
      );
    } else {
      warning = null;
    }
    return warning;
  }
  onLoginSuccess() {
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
          <div className="loading-input">
            <Spinner width={50} height={50} />
          </div>
        </div>
      );
    }
<<<<<<< HEAD
    let warning = null;

    if (this.state.isLoginFailure) {
      warning = (
        <p>Login failed.</p>
=======
    return button;
  }
  render() {
    let warning = this.onWarningMessage();

    if (this.state.isLoggedIn) {
      return (
        <Redirect to="/board" />
>>>>>>> develop
      );
    }
<<<<<<< HEAD
=======
    let button = this.onLoginSuccess();
>>>>>>> develop

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
