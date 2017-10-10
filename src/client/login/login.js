'use strict';
import React from 'react';
import Header from './header';
import Input from './input';
import Footer from './footer';
import './scss/login.scss';

class Login extends React.Component {
  render() {
    return (
      <div id="main">
        <Header />
        <Input />
        <Footer />
      </div>
    );
  }
}

export default Login;
