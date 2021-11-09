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
    fetch("http://localhost:9000/api")
      .then((res) => res.json())
      .then((data) => console.log(data))
  }


  register = (usr) => {
    console.log(usr.first)
    console.log(usr.last)
    console.log(usr.email)
    console.log(usr.password)
  }

  renderBody(state){
    let data;
    let forecast;
    let list;
    let oneCall;
    let showLogin
    switch (state.current){
      case 'search':
        data = state.searchLocation;
        forecast = state.searchForecast;
        list = state.searchForecastList;
        oneCall = state.searchOneCall;
        showLogin = state.showLogin;
        break;
      case 'location':
        data = state.location;
        forecast = state.forecast;
        list = state.forecastList;
        oneCall = state.oneCall;
        showLogin = state.showLogin;
        break;
      default:
        data = '';
        forecast = '';
        list = '';
        oneCall = '';
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
          <Header showLogin={this.showLogin} submit={this.showLocation}/>
          <div className="Body">
            {this.renderBody(this.state)}
          </div>
        </>
      )
  }
}

export default Body;
