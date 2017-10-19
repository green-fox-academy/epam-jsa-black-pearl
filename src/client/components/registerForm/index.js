import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {Redirect} from 'react-router';
import Validator from 'validator';

import './index.scss';
import Spinner from '../../../img/spinner.svg';
import $api from '../../api/api.json';

const MIN_PASSWORD_LENGTH = 6;
const ANIMATION_SHAKING_DURATION = 250;
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
      captcha: '',
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
    this.setState({isLoading: true});
    fetch(this.formHttpRequest()).then((response) => {
      if (SUCCESSFUL_RESPONSE.test(response.status)) {
        this.setState({
          isRegistered: true,
          isLoading: false,
        });
      } else if (response.status === CONFLICT_RESPONSE) {
        this.shakingAnimation('Email exists!');
      } else {
        this.shakingAnimation('Registration failed!');
      }
    }).catch((error) => {
      this.shakingAnimation('Registration failed!');
    });
  }

  shakingAnimation(errorMessage) {
    let that = this;

    that.setState({
      isLoading: false,
      isInvalidFields: true,
      isRegistrationFailure: true,
      registrationFailureMessage: errorMessage,
    });
    setTimeout(() => {
      that.setState({isInvalidFields: false});
    }, ANIMATION_SHAKING_DURATION);
  }

  doRegister(username, password, captcha) {
    if (!this.isValidEmail(this.state.username)) {
      this.shakingAnimation('Invalid email');
      return;
    } else if (!this.isValidPassword(this.state.password)) {
      this.shakingAnimation('Password must be 6 characters');
      return;
    } else if (this.state.captcha === '') {
      this.shakingAnimation('Please complete the captcha!');
      return;
    }
    this.registrationHttpRequest();
  }

  onRegist(event) {
    const {username, password} = this.state;

    event.preventDefault();
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
          <input type="submit" value="Create Account"
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

  captchaPass(value) {
    this.setState({captcha: value});
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
        <div className="recaptcha">
          <ReCAPTCHA ref="recaptcha"
            sitekey="6LfMtzQUAAAAAMD920qYn8GBmjBKgv5QeOW_u2gH"
            onChange={this.captchaPass.bind(this)} />
        </div>
        {button}
      </form>
    );
  }
}

export default RegisterForm;
