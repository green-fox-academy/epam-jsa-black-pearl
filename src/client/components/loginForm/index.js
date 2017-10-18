import React from 'react';
import {Redirect} from 'react-router';
import Validator from 'validator';

import './index.scss';
import Spinner from '../../../img/spinner.svg';

const MIN_PASSWORD_LENGTH = 6;
const ANIMATION_SHAKING_DURATION = 500;
const STATUS_CODE_OK = 200;

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
    if (!this.isValidEmail(this.state.username)
     || !this.isValidPassword(this.state.password)) {
      this.setState({
        isInvalidFields: true,
        isLoading: false,
        isLoginFailure: true,
      });
      setTimeout(() => {
        this.setState({isInvalidFields: false});
      }, ANIMATION_SHAKING_DURATION);
    } else {
      this.setState({isLoading: true});
      this.doLogin(this.state.username, this.state.password);
    }
  }
  isValidEmail(email) {
    return Validator.isEmail(email);
  }
  isValidPassword(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
  }
  doLogin(username, password) {
    let API = '/api/login';

    let myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    let myRequest = new Request(API, {
      'method': 'POST',
      'headers': myHeaders,
      'body': JSON.stringify({'username': username, 'password': password}),
    });

    fetch(myRequest).then((response) => {
      if (response.status === STATUS_CODE_OK) return response.json();
      throw new Error('error.');
    }).then((response) => {
      localStorage.token = response.token;
      this.setState({isLoading: false, isLoggedIn: true});
    }).catch((error) => {
      this.setState({isLoading: false, isLoginFailure: true});
    });
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
        <p>Invalid Email or Password!</p>
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
    return button;
  }

  render() {
    let warning = this.onWarningMessage();

    if (this.state.isLoggedIn && this.captchaPass === true) {
      return (
        <Redirect to="/boards" />
      );
    }
    let button = this.onLoginSuccess();

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
