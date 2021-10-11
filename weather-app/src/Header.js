import React from 'react';
import './Header.css';
import logo from './weather-icon.png';

const url = 'localhost:3000'

function Header() {

  return (
    <div className="nav">
      <div className="logo">
        <a href={url}><img src={logo} alt="logo"></img></a>
      </div>
      <div className="nav-buttons">
        <div className="login-button">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
