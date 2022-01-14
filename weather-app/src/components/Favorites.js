import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites:null
    }
  }

  componentDidMount = () => {
  }

  componentDidUpdate = () => {
  }

  getDayNumber = (dayInput) => {
    switch(dayInput){
      default:{
        return ''
      }
      case 0:{
        return 'Sunday'
      }
      case 1:{
        return 'Monday'
      }
      case 2:{
        return 'Tuesday'
      }
      case 3:{
        return 'Wednesday'
      }
      case 4:{
        return 'Thursday'
      }
      case 5:{
        return 'Friday'
      }
      case 6:{
        return 'Saturday'
      }
    }
  }

  findImage = (str) => {
    return this.props.iconPath.find(o => o.key === str).value;
  }

  capitalizeFirst = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");
    return str2;
  }

  backToHome = () => {
    this.props.history.push('/')
  }

  welcomeMessage = (user) => {
    if(user == null || user === '' || user === undefined) {
      return (
        <>
          <div className="welcome-message">
            <h1>Please sign in to view the Favorites Page</h1>
          </div>
          <div className="back-to-home-button">
            <button onClick={this.backToHome}>Back to Home</button>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div className="welcome-message">
            <h1>Hello! Welcome, {user.namef}, and thank you for using Weather Planet!</h1>
          </div>
        </>
      )
    }
  }

  createFavorites = () => {
    if(this.props.user != null && this.props.user !== undefined && this.props.user !== ''){
      if(this.props.user.favorites != null && this.props.user.favorites !== undefined && this.props.user.favorites !== '') {
        var favorites = this.props.user.favorites
        var cities = ''
        for (let i = 0, len = favorites.length; i < len; i++){
          if(i===len-1){
            cities += favorites[i].id
          }
          else {
            cities += (favorites[i].id+',')
          }
        }
        fetch('https://api.openweathermap.org/data/2.5/group?id='+cities+'&appid='+API_KEY+'&units=imperial')
          .then((res) => res.json())
          .then((data) => {
              this.setState({ favorites:data.list })
        })
        return
      }
      else return
    }
    else return
  }

  renderFavorites() {
    if(this.props.user){
      if(this.props.user.favorites){
        let favorites = this.props.user.favorites
        if(favorites.length > 0) {
          return (
            favorites.map((element,index) => (
              <div className="FavoritesCard" key={index}>
                <div>
                  <h1>{element.city_name}</h1>
                </div>
              </div>
            ))
          )
        }
        else {
          return (
            <div className="FavoritesCard">
              <h1>You do not currently have any favorites</h1>
            </div>
          )
        }
      }
    }
    else return (
      <>
      </>
    )
  }

  render(){
    return (
      <>
        <div className="Welcome">{console.log(this.state)}
          {this.welcomeMessage(this.props.user)}
        </div>
        <div className="favorites-list">
          {this.renderFavorites()}
        </div>
      </>
    )
  }
}

export default withRouter(Favorites);
