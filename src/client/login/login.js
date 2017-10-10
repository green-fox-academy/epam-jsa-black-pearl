'use strict';
import React from 'react';
import Header from './header';
import Input from './input';
import Footer from './footer';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Input />
        <Footer />
      </div>
    );
  }
}

export default Login;
