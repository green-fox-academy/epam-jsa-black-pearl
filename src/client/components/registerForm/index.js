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
      that.setState({isLoading: false});
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
    let that = this;

    if (!that.isValidEmail(that.state.username)
    || !that.isValidPassword(this.state.password)) {
      that.shakingAnimation();
      return;
    }
    that.registrationHttpRequest(username, password);
  }

  onRegist() {
    let that = this;

    that.doRegist(that.state.username, that.state.password);
    return;
  }

  onUsernameChange(ev) {
    this.setState({username: ev.target.value});
  }

  onPasswordChange(ev) {
    this.setState({password: ev.target.value});
  }

  onLoading() {
    let button = null;

    if (!this.state.isLoading) {
      button = (
        <div>
          <input type="button" value="Creat Account"
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

  render() {
    let button = this.onLoading();

    return (
      <form className="login-form">
        <div className="warning">
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
