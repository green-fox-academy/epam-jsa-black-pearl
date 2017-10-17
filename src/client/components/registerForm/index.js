import React from 'react';
import {Redirect} from 'react-router';
import Validator from 'validator';

import './index.scss';
import Spinner from '../../../img/spinner.svg';
import $api from '../../api/api.json';

const MIN_PASSWORD_LENGTH = 6;
const ANIMATION_SHAKING_DURATION = 500;
const SUCCESSFUL_RESPONSE = /^20.$/;
const CONFLICT_RESPONSE = 409;

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isInvalidFields: false,
      isLoggedIn: false,
      isRegistered: false,
      isRegistrationFailure: false,
      registrationFailureMessage: '',
    };
  }

  isValidEmail(email) {
    return Validator.isEmail(email);
  }

  isValidPassword(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
  }

  formHttpRequest() {
    const {username, password} = this.state;

    let myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    let myRequest = new Request($api.register, {
      'method': 'POST',
      'headers': myHeaders,
      'body': JSON.stringify({'username': username, 'password': password}),
    });

    return myRequest;
  }

  registrationHttpRequest() {
    let that = this;

    that.setState({isLoading: true});
    fetch(that.formHttpRequest()).then((response) => {
      if (SUCCESSFUL_RESPONSE.test(response.status)) {
        that.setState({
          isRegistered: true,
          isLoading: false,
        });
      } else if (response.status === CONFLICT_RESPONSE) {
        that.setState({
          isLoading: false,
          isRegistrationFailure: true,
          registrationFailureMessage: 'Email exists!',
        });
      } else {
        that.setState({
          isLoading: false,
          isRegistrationFailure: true,
          registrationFailureMessage: 'Registration failed!',
        });
      }
    }).catch((error) => {
      that.setState({
        isRegistrationFailure: true,
        registrationFailureMessage: 'Registration failed!',
      });
    });
  }

  shakingAnimation() {
    let that = this;

    that.setState({isInvalidFields: true});
    setTimeout(() => {
      that.setState({isInvalidFields: false});
    }, ANIMATION_SHAKING_DURATION);
  }

  doRegister(username, password) {
    if (!this.isValidEmail(this.state.username)
      || !this.isValidPassword(this.state.password)) {
      this.setState({
        isRegistrationFailure: true,
        registrationFailureMessage: 'Invalid email or password!',
      });
      this.shakingAnimation();
      return;
    }
    this.registrationHttpRequest();
  }

  onRegist() {
    const {username, password} = this.state;

    this.doRegister(username, password);
    return;
  }

  onUsernameChange(ev) {
    this.setState({username: ev.target.value});
  }

  onPasswordChange(ev) {
    this.setState({password: ev.target.value});
  }

  generateLoadingButton() {
    let button = null;

    if (!this.state.isLoading) {
      button = (
        <div>
          <input type="button" value="Create Account"
            onClick={this.onRegist.bind(this)}
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

  generateWarningMessage(message) {
    if (this.state.isRegistrationFailure) {
      return (
        <p>{message}</p>
      );
    }
    return null;
  }

  render() {
    if (this.state.isRegistered) {
      return (
        <Redirect to="/login" />
      );
    }
    let button = this.generateLoadingButton();
    let warning = this.generateWarningMessage(
      this.state.registrationFailureMessage);

    return (
      <form className="register-form">
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

export default RegisterForm;
