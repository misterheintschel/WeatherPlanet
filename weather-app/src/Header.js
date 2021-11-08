import React, { Component } from 'react';
import './Header.css';
import logo from './weather-icon.png';

const url = 'localhost:3000'

class Header extends Component {
  constructor(props){
    super(props)
  }

  onPush = (event) => {
    this.props.submit();
  }

  showLogin = (event) => {
    this.props.showLogin();
  }

  render(){
    return (
      <div className="nav">
        <div className="logo">
          <a href={url}><img src={logo} alt="logo"></img></a>
        </div>
        <div className="nav-buttons">
          <div className="login-button">
            <button onClick={this.showLogin}>Login</button>
          </div>
          <div className="location-button">
            <button onClick={this.onPush}>Current Location</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
