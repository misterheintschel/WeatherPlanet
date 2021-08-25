import React from 'react';
import './Header.css';
import logo from './weather-icon.jpg';


const url = 'localhost:3000';

const loc = () => {
  return ('TODO: GET LOCATION');
}


function Header() {



  return (
    <div className="Header">
      <div className="logo">
        <a href={url}><img src={logo} alt="logo"></img></a>
      </div>
      <div className="title">
        <h1>Weather Information</h1>
        <p>Current Location: {loc()}</p>
      </div>
      <div className="login-button">
        <button><h2>Login</h2></button>
      </div>
    </div>
  );
}

export default Header;
