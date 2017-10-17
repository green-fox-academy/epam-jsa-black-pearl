import React from 'react';
import Validator from 'validator';

import './index.scss';
import Spinner from '../../../img/spinner.svg';

const MIN_PASSWORD_LENGTH = 6;
const ANIMATION_SHAKING_DURATION = 500;
const TEST = 1000;

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isInvalidFields: false,
      isLoggedIn: false,
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

  registrationHttpRequest(username, password) {
    let that = this;

    that.setState({isLoading: true});
    setTimeout(() => {
      that.setState({
        isLoading: false,
        isRegistrationFailure: true,
        registrationFailureMessage: 'Registration failed!',
      });
    }, TEST);
  }

  shakingAnimation() {
    let that = this;

    that.setState({isInvalidFields: true});
    setTimeout(() => {
      that.setState({isInvalidFields: false});
    }, ANIMATION_SHAKING_DURATION);
  }

  doRegist(username, password) {
    if (!this.isValidEmail(this.state.username)
    || !this.isValidPassword(this.state.password)) {
      this.setState({
        isRegistrationFailure: true,
        registrationFailureMessage: 'Invalid email or password!',
      });
      this.shakingAnimation();
      return;
    }
    this.registrationHttpRequest(username, password);
  }

  onRegist() {
    this.doRegist(this.state.username, this.state.password);
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
    let button = this.generateLoadingButton();
    let warning = this.generateWarningMessage(
      this.state.registrationFailureMessage);

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

export default RegisterForm;
