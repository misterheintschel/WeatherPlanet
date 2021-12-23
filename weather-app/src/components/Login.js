import React, { Component, useState } from 'react';
import logo from '../weather-icon.png';
import close from '../resources/weather-icons/x.png';
import back from '../resources/weather-icons/back.png';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      handleClickOutside:this.handleClickOutside.bind(this),
      action:'choice'
    }
  }

  backtoChoice = () => {
    this.setState({ action:'choice' })
  }

  handleClickOutside = (event) => {

    if(this.node.contains(event.target)) {
      return;
    }
    else {
      this.closeLogin();
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  closeLogin = () => {
    this.props.close();
  }

  login = (e) => {
    e.preventDefault();
    this.setState({ action:'login' });
  }

  register = (e) => {
    e.preventDefault();
    this.setState({ action:'register' });
  }

  submitLogin = (e) => {
    e.preventDefault();
    let log =
      {
        email:e.target.form[0].value,
        password:e.target.form[1].value
      };
    this.props.login(log);
  }

  submitRegister = (e) => {
    e.preventDefault();
    let reg =
      {
        first:e.target.form[0].value,
        last:e.target.form[1].value,
        email:e.target.form[2].value,
        password:e.target.form[3].value
      };
    if(reg.first === '') {

    }
    this.props.register(reg)
  }

  displayForm = (state) => {
    const welcome = <h1><span>Welcome!</span><br/> Thank you for coming to Weather Planet!<br/> Please select an option:</h1>;
    let action = state.action;

    switch(action) {
      case 'choice':
        return (
          <div className="LoginBackground">
            <form ref={node => this.node = node } className="LoginForm">
              <div className="login-nav">
                <img onClick={this.closeLogin} id="close-button" src={close} alt="Loading..."></img>
              </div>
              <img id="login-logo" src={logo} alt="logo"></img>
              <div className="Welcome-Content">
                <div className="Welcome">
                  <div id="welcome-message">{welcome}</div>
                </div>
                <div className="Login-Register">
                  <button onClick={this.login}>Login</button>
                  <button onClick={this.register}>Register</button>
                </div>
              </div>
            </form>
          </div>
        )
        break;
      case 'login':
        return (
          <div className="LoginBackground">
            <form ref={node => this.node = node } className="LoginForm">
              <div className="login-nav">
                <img id="back-button" onClick={this.backtoChoice} src={back} alt="Loading..."></img>
              </div>
              <h1><span>Login</span></h1>
              <div className="Input">
                <label>Email:</label><input type="text" name="email" required></input><br/>
                <label>Password:</label><input type="password" name="password" required></input>
                <p id="login-message"></p>
                <button id="login-button" onClick={this.submitLogin}>Login</button>
              </div>
            </form>
          </div>
        )
        break;
      case 'register':
        return (
          <div className="LoginBackground">
            <form ref={node => this.node = node } className="LoginForm">
              <div className="login-nav">
                <img id="back-button" onClick={this.backtoChoice} src={back} alt="Loading..."></img>
              </div>
              <h1><span>Register</span></h1>
              <div className="Input">
                <label>First Name:  </label><input type="text" name="first" required></input><br/>
                <label>Last Name:  </label><input type="text" name="last" required></input><br/>
                <label>Email:  </label><input type="text" name="email" required></input><br/>
                <label>Password:  </label><input type="password" name="password" required></input><br/>
                <p id="registration-message"></p>
                <button id="register-button" onClick={this.submitRegister}>Register</button>
              </div>
            </form>
          </div>
        )
      case 'default':
        return;
    }
  }


  render(){



    return (
      <>
        {this.displayForm(this.state)}
      </>
    )
  }
}

export default Login;
