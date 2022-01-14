import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from './weather-icon.png';

class Header extends Component {
  constructor(props){
    super(props)
  }

  onPush = (event) => {
    this.props.submit()
  }

  showLogin = (event) => {
    this.props.showLogin()
  }

  logout = (event) => {
    this.props.logout()
  }

  goFavorites = (event) => {
    this.props.history.push('/favorites')
  }

  goHome = (event) => {
    this.props.history.push('/')
  }

  messages = (user) => {
    if(user !== undefined && user !== null && user !== ''){
      var rand
      rand = Math.floor(Math.random() * 7)
      var message
      switch(rand){
        case 0: {
          message = 'Welcome, '+user.namef
          return message
        }
        case 1: {
          message = 'Great to see ya, '+user.namef+'!'
          return message
        }
        case 2: {
          message = 'Welcome back, '+user.namef+'!'
          return message
        }
        case 3: {
          message = 'Thanks for choosing Weather Planet, '+user.namef+'!'
          return message
        }
        case 4: {
          message = 'Stay safe out there, '+user.namef
          return message
        }
        case 5: {
          message = 'Thanks for logging in, '+user.namef+'. Feel free to try out the favorite button!'
          return message
        }
        case 6: {
          message = user.namel+', Wow! What a cool last name! The developer is jealous.'
          return message
        }
      }
    }
    else {
      return <></>
    }
  }


  render(){
    var message = this.messages(this.props.logged)
    var path = this.props.location.pathname
    return (
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="logo" onClick={this.goHome}></img>
        </div>
        {(this.props.logged !== undefined && this.props.logged !== null && this.props.logged !== '') ? <div className="nav-message"><p>{message}</p></div> : <></>}
        <div className="nav-buttons">
          <div className="login-button">
            <button onClick={(this.props.logged !== undefined && this.props.logged !== null && this.props.logged !== '') ? this.logout : this.showLogin}>
              {(this.props.logged !== undefined && this.props.logged !== null) ? "Logout" : "Login"}</button>
          </div>
          <div className="location-button">
            <button onClick={this.onPush}>Current Location</button>
          </div>
          <div className ="favorites-button">
            {(this.props.logged !== undefined && this.props.logged !== null && this.props.logged !== '') ? <button onClick={this.goFavorites}>Favorites</button> : <></>}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
