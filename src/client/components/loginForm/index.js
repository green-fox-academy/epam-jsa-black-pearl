import React from 'react';
import './index.scss';

import Spinner from '../../../img/spinner.svg';
import Validator from 'validator';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      isLoading: false,
    };
  }
  onLogin() {
    function validateEmail(email) {
      return Validator.isEmail(email);
    }
    if (!validateEmail(this.state.username) || this.state.password.length < 6) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    let self = this;
    setTimeout(function() {
      self.setState({
        isLoading: false,
      });
    }, 2000);
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
            onClick={this.onLogin.bind(this)} />
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
    return (
      <form className="login-form">
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
