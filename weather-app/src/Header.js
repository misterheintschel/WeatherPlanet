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

  logout = (event) => {
    this.props.logout();
  }

  messages = () => {
    var rand;
    if(user !== undefined && user !== ''){
      var user = this.props.user;
      rand = Math.floor(Math.random() * 6);
      console.log(rand);
      switch(rand){
        case 1: return 'Welcome, '+user.namef;
        case 2: return 'Great to see ya, '+user.namef+'!';
        case 3: return 'Welcome back, '+user.namef+'!';
        case 4: return 'Thanks for choosing Weather Planet '+user.namef+'!';
        case 5: return 'Stay safe out there '+user.namef;
        case 6: return 'Thanks for logging in '+user.namef+', feel free to try out the favorite button!';
        default: return <></>;
      }
    }
    else return;
  }


  render(){
    return (
      <div className="nav">
        <div className="logo">
          <a href={url}><img src={logo} alt="logo"></img></a>
        </div>
        <div className="nav-buttons">
          <div className="login-button">
            <button onClick={(this.props.logged !== '' && this.props.logged !== undefined && this.props.logged != null) ? this.logout : this.showLogin}>
              {(this.props.logged !== '' && this.props.logged !== undefined && this.props.logged != null) ? "Logout" : "Login"}</button>
          </div>
          <div className="location-button">
            <button onClick={this.onPush}>Current Location</button>
          </div>
          <div className ="favorites-button">
            {(this.props.logged !== '' && this.props.logged !== undefined && this.props.logged != null) ? <a href='/favorites'><button>Favorites</button></a> : <></>}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
