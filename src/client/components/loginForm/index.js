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
      isIllegalFields: false,
      isLoginFailure: false,
    };
  }
  onLogin() {
    function validateEmail(email) {
      return Validator.isEmail(email);
    }
    if (!validateEmail(String(this.state.username)) || this.state.password.length < 6) {
      let self = this;
      self.setState({isIllegalFields: true});
      setTimeout(function() {
        self.setState({isIllegalFields: false});
      }, 500);
      return;
    }
    this.setState({
      isLoading: true,
    });
    let self = this;
    callApi(self, this.state.username, this.state.password);
    function callApi(state, username, password) {
      let API = 'http://localhost:3000/api/login';
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
        self.setState({isLoading: false});
        window.location.href = '/board';
      }).catch(function(error) {
        this.setState({
          isLoginFailure: true,
        });
        self.setState({isLoading: false});
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
            className={this.state.isIllegalFields ? 'shaking' : ''} />
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
