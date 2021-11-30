import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Login from './components/Login';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import Chart from './components/Chart';
import icons from './resources/weather-icons/Icons';
import './Body.css';
import AutoComplete from './components/AutoComplete';



const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;



class Body extends Component {
  constructor(props){
    super(props)
    this.state = {
      current:'',
      lat:0,
      lng:0,
      location:'',
      forecast:'',
      forecastList:'',
      oneCall:'',
      search:'',
      searchCoords:'',
      searchLocation:'',
      searchForecast:'',
      searchForecastList:'',
      searchOneCall:'',
      showLogin:false,
      loggedIn:false,
      user:''
    }
  }

  initUser = (id,first,last,email,favorites) => {
    return {
      id:id,
      first:first,
      last:last,
      email:email,
      favorites:favorites
    }
  }

  searchPull = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.state.search+
          '&appid='+API_KEY+'&units=imperial')
        .then(function(resp) {return resp.json()})
        .then(function(data) {
          this.setState({
            searchCoords:{
              lat:data.coord.lat,
              lng:data.coord.lon
            },
            searchLocation:data,
            current:'search'
          })
          fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+
              data.coord.lat+'&lon='+data.coord.lon+'&appid='+API_KEY+'&units=imperial')
              .then(function(resp) {return resp.json()})
              .then(function(info) {
                this.setState({
                  searchForecast:info.hourly,
                  searchForecastList:info.daily,
                  searchOneCall:info
                })
              }.bind(this))
        }.bind(this))

  }

  handleAutoComplete = (city) => {
    this.setState({ search:city }, () => {this.searchPull()});
  }

  currentWeatherOneCall = (lat,lng) => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' +
      lat+'&lon='+lng+'&appid='+API_KEY+'&units=imperial')
      .then(function(resp) {return resp.json()})
      .then(function(data) {
        this.setState({
          forecast:data.hourly,
          forecastList:data.daily,
          oneCall:data
        })
      }.bind(this))
      .catch(function(){

      })

  }

  currentWeather = (lat,lng) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +
      lat+'&lon='+lng+'&appid='+API_KEY+'&units=imperial')
      .then(function(resp) {return resp.json()})//convert data to json
      .then(function(data) {
        this.setState({
          location:data,
          current:'location'
        })
        this.currentWeatherOneCall(data.coord.lat,data.coord.lon)
      }.bind(this))
      .catch(function() {
        //catch errors
      })
  }


  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({
        lat: (Math.round(position.coords.latitude * 1000000) /1000000),
        lng: (Math.round(position.coords.longitude * 1000000) /1000000)
      })
      this.currentWeather(this.state.lat,this.state.lng);
      }.bind(this));
    }

  componentDidUpdate = () => {
  }

  showLocation = () => {
    this.setState({ searchCoords:'', current:'location' });
  }

  showLogin = () => {
    this.setState({ showLogin:true });
  }

  removeLogin = () => {
    this.setState({ showLogin:false });
  }

  setUser = (info) => {
    this.setState({ user:info })
  }



  login = (usr) => {
    let fetchData = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:usr.email,
        password:usr.password
      })
    }
    fetch("http://localhost:3001/user", fetchData)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('login-message').innerHTML = "Login Successful. Redirecting..."
        setTimeout(this.setState({ user:data[0], showLogin:false }), 5000)
      })

  }

  logout = () => {
    this.setState({ user: null })
  }


  register = (usr) => {

    let fetchData = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        namef:usr.first,
        namel:usr.last,
        email:usr.email,
        password:usr.password
      })
    }
    fetch("http://localhost:3001/register", fetchData)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  addFavorite = () => {

    if(this.state.current === 'search'){
      let name = this.state.searchLocation.name;
      let id = this.state.searchLocation.id;
      let user = this.state.user.id;
      if(user != undefined && user != ''){
        let fetchData = {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name:name,
            id:id,
            user:user
          })
        }
        fetch("http://localhost:3001/favorite", fetchData)
          .then((res) => res.json())
          .then((data) => {
            console.log('success')
            this.setState({ user: data[0]})

          })
      }
    }
    else {
      let name = this.state.location.name;
      let id = this.state.location.id;
      let user = this.state.user.id;
      if(user != undefined){
        let fetchData = {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name:name,
            id:id,
            user:user
          })
        }
        fetch("http://localhost:3001/favorite", fetchData)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)

          })
      }
    }
  }

  removeFavorite = () => {
    let city;
    let user = this.state.user.id;
    if(this.state.current === 'search'){
      city = this.state.searchLocation.id
    }
    else {
      city = this.state.location.id
    }
    let fetchData = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:user,
        city:city
      })
    }
    fetch("http://localhost:3001/removeFavorite", fetchData)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  showFavorites = () => {
    console.log('success')
  }

  renderBody(state){
    let data;
    let forecast;
    let list;
    let oneCall;
    let showLogin;
    let user;
    switch (state.current){
      case 'search':
        data = state.searchLocation;
        forecast = state.searchForecast;
        list = state.searchForecastList;
        oneCall = state.searchOneCall;
        showLogin = state.showLogin;
        user = state.user;

        break;
      case 'location':
        data = state.location;
        forecast = state.forecast;
        list = state.forecastList;
        oneCall = state.oneCall;
        showLogin = state.showLogin;
        user = state.user;
        break;
      default:
        data = '';
        forecast = '';
        list = '';
        oneCall = '';
        user = '';
    }
    return (

      <Router>
        <Switch>
          <Route path='/'>
            <>
              <div className="BodyTop">
                <div className="Search">
                  <AutoComplete
                    submit={this.handleAutoComplete} />
                </div>
              </div>
              <div className="BodyBottom">
                <div className="CurrentWeather">

                  <CurrentWeather
                    data={data}
                    forecast={forecast}
                    oneCall={oneCall}
                    iconPath={icons}
                    user={user}
                    favorite={this.addFavorite}
                    remove={this.removeFavorite}
                  />
                  <Chart
                    data={forecast}/>
                  /*ADD ALERTS ONECALL*/
                </div>
                <div className="Forecast">
                  <Forecast
                    list={list}
                    iconPath={icons}
                  />
                </div>
              </div>
              {showLogin ? <Login close={this.removeLogin} register={this.register} login={this.login}/> : <></>}
            </>
          </Route>
        </Switch>
      </Router>

    )
  }

  render() {
      return (
        <>
          <Header showLogin={this.showLogin} logged={this.state.user} logout={this.logout}  favorites={this.showFavorites} submit={this.showLocation}/>
          <div className="Body">{console.log(this.state)}{console.log(this.state.user.favorites)}
            {this.renderBody(this.state)}
          </div>
        </>
      )
  }
}

export default Body;
