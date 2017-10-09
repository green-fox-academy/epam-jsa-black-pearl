'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('header');
var Input  = require('input');
var Footer  = require('footer');

class Main extends React.Component {
  render (){
    return(
      <div>
        <Header />
        <Input />
        <Footer />
      </div>
    );
  }
};

ReactDOM.render(<Main />, document.getElementById('main'));
