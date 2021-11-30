import React, { Component } from 'react';
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

  showFavorites = (event) => {
    this.props.favorites();
  }

  logout = (event) => {
    this.props.logout();
  }

  render(){
    return (
      <div className="nav">
        <div className="logo">
          <a href={url}><img src={logo} alt="logo"></img></a>
        </div>
        <div className="nav-buttons">
          <div className="login-button">
            <button onClick={(this.props.logged != '' && this.props.logged != undefined) ? this.logout : this.showLogin}>{(this.props.logged != '' && this.props.logged != undefined) ? "Logout" : "Login"}</button>
          </div>
          <div className="location-button">
            <button onClick={this.onPush}>Current Location</button>
          </div>
          <div className ="favorites-button">
            <button onClick={this.showFavorites}>Favorites</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
