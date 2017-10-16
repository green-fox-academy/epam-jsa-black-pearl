import React from 'react';
import Validator from 'validator';

import './index.scss';

const MIN_PASSWORD_LENGTH = 6;
const ANIMATION_SHAKING_DURATION = 500;

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
  onRegist() {
    let that = this;

    function isValidEmail(email) {
      return Validator.isEmail(email);
    }

    function isValidPassword(password) {
      return password.length >= MIN_PASSWORD_LENGTH;
    }

    function doRegist(username, password) {
      if (!isValidEmail(that.state.username)
      || !isValidPassword(that.state.password)) {
        that.setState({isInvalidFields: true});
        setTimeout(() => {
          that.setState({isInvalidFields: false});
        }, ANIMATION_SHAKING_DURATION);
        return;
      }
    }
    doRegist(this.state.username, this.state.password);
  }
  onUsernameChange(ev) {
    this.setState({username: ev.target.value});
  }
  onPasswordChange(ev) {
    this.setState({password: ev.target.value});
  }
  render() {
    return (
      <form className="register-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Sign up"
          onClick={this.onRegist.bind(this)}/>
      </form>
    );
  }
}

export default RegisterForm;
