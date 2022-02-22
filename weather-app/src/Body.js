import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from './Header';
import Login from './components/Login';
import AutoComplete from './components/AutoComplete';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import Chart from './components/Chart';
import Alerts from './components/Alerts';
import Favorites from './components/Favorites';
import icons from './resources/weather-icons/Icons';
import './Body.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const myStorage = window.sessionStorage;

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
      user:null,
      redirect:null
    }
  }

  searchPull = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.state.search+'&appid='+API_KEY+'&units=imperial')
      .then(function(resp) {return resp.json()})
      .then(function(data) {
        if(data.cod != 400) {
          this.setState({
            searchCoords:{
              lat:data.coord.lat,
              lng:data.coord.lon
            },
            searchLocation:data,
            current:'search'
          })
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+data.coord.lat+'&lon='+data.coord.lon+'&appid='+API_KEY+'&units=imperial')
      .then(function(resp) {return resp.json()})
      .then(function(info) {
        this.setState({
          searchForecast:info.hourly,
          searchForecastList:info.daily,
          searchOneCall:info
        })
      }.bind(this))
    } else return//timezone favorites button & page
    }.bind(this))
  }

  loadFavorite = (city) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?id='+city.id+'&appid='+API_KEY+'&units=imperial')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          searchCoords:{
            lat:data.coord.lat,
            lng:data.coord.lon
          },
          searchLocation:data,
          current:'search'
        })
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+data.coord.lat+'&lon='+data.coord.lon+'&appid='+API_KEY+'&units=imperial')
        .then((res) => res.json())
        .then((info) => {
          this.setState({
            searchForecast:info.hourly,
            searchForecastList:info.daily,
            searchOneCall:info
          })
        })
      })
  }

  handleAutoComplete = (city) => {
    this.setState({ search:city }, () => {this.searchPull()});
  }

  handleNavigateToFav = (city) => {
    this.loadFavorite(city)
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

  setPosition = () => {

  }


  componentDidMount = () => {
    if(myStorage.getItem('latitude') === null){
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            let lat = (Math.round(position.coords.latitude * 1000000) / 1000000)
            let lng = (Math.round(position.coords.longitude * 1000000) / 1000000)
            this.setState({ lat:lat, lng:lng })
            var location = { lat:lat, lng:lng }
            myStorage.setItem('latitude',lat)
            myStorage.setItem('longitude',lng)
            this.currentWeather(lat,lng)
          }.bind(this),
          function(error) {
            if(error.code == 1){
            alert('Your location information was not obtained due to a Location Sharing Setting')
            }
          },
          { timeout: 1000 })
      }
      else {
        console.log('Your browser does not support geolocation')
      }
    }
    else {
      let lat = myStorage.getItem('latitude')
      let lng = myStorage.getItem('longitude')
      this.setState({ lat:lat, lng:lng })
      this.currentWeather(lat,lng)
    }
    this.checkToken()

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

  checkToken = () => {
    let fetchData = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch('/checkToken', fetchData)
      .then((res) => res.json())
      .then((data) => {
        if(data.message === undefined){
          this.setState({ user:data, showLogin:false })
          this.getFavorites()
        }
        else {
          return
        }
      })
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
    fetch("/login", fetchData)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('login-message').innerHTML = "Login Successful. Redirecting..."
        this.setState({ user:data, showLogin:false })
        this.getFavorites()
      })
  }

  logout = () => {
    this.setState({ user: null });
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
    fetch("/register", fetchData)
      .then((res) => res.json())
      .then((data) => {
        alert('Account for ' + data[0].namef + ' ' + data[0].namel + ' with login email: ' + data[0].email + ' created.')
        this.setState({ showLogin:false })
      })

  }

  addFavorite = () => {

    if(this.state.current === 'search'){
      let name = this.state.searchLocation.name;
      let id = this.state.searchLocation.id;
      let user = this.state.user.id;
      if(this.state.user.favorites.some(e => e.id === id)){
        return
      }
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
        fetch("/favorite", fetchData)
          .then((res) => res.json())
          .then((data) => {
            this.getFavorites()
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
        fetch("/favorite", fetchData)
          .then((res) => res.json())
          .then((data) => {
            this.getFavorites()
          })
      }
    }
  }

  getFavorites = () => {
    let user = this.state.user.id;
    let fetchData = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:user
      })
    }
    fetch("/getFavorites", fetchData)
      .then(function(res) {
        if(res.status === 200){
          return res
        }
        else if(res.status !== 200){
          return
        }
      })
      .then((res) => res.json())
      .then((data) => {
        let user = this.state.user
        user.favorites = data
        this.setState({ user:user })
      })
  }

  removeFavorite = () => {
    let city;
    let name;
    let user = this.state.user.id;
    if(this.state.current === 'search') {
      city = this.state.searchLocation.id
      name = this.state.searchLocation.name
    }
    else {
      city = this.state.location.id
      name = this.state.location.name
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
    fetch("/removeFavorite", fetchData)
      .then((res) => res.json())
      .then((data) => {
        this.getFavorites()
      })
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
          <Route path='/favorites'>
            <>
              <Header
                showLogin={this.showLogin}
                logged={user}
                logout={this.logout}
                submit={this.showLocation}
                favorites={this.showFavorites}
              />
              <div className="BodyTop">
                <div className="Search">
                  <AutoComplete
                    submit={this.handleAutoComplete} />
                </div>
              </div>
              <div className="BodyBottom">
                <div className="Favorites">
                  <Favorites
                    user={user}
                    iconPath={icons}
                    nav={this.handleNavigateToFav}
                  />
                </div>
              </div>
              {showLogin ? <Login close={this.removeLogin} register={this.register} login={this.login}/> : <></>}
            </>
          </Route>
          <Route path='/'>
            <>
              <Header
                showLogin={this.showLogin}
                logged={user}
                logout={this.logout}
                submit={this.showLocation}
                favorites={this.showFavorites}
              />
              <div className="BodyTop">
                <div className="Search">
                  <AutoComplete
                    submit={this.handleAutoComplete}
                  />
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
                    getFavorites={this.getFavorites}
                    remove={this.removeFavorite}
                  />
                  <Chart
                    data={forecast}
                  />
                  <div className="Alerts">
                    {oneCall === '' ? <></> : <Alerts alerts={oneCall.alerts}/>}
                  </div>
                </div>
                <div className="Forecast">
                  {list === '' ? <></> : <h1 id="sevenday">7-Day Forecast</h1>}
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
          <div className="Body">
            {this.renderBody(this.state)}
          </div>
        </>
      )
  }
}

export default Body;
