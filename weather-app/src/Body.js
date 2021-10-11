import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forecast from './components/Forecast';
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import CurrentWeather from './components/CurrentWeather';
import Chart from './components/Chart';
import icons from './resources/weather-icons/Icons';
import './Body.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


class Body extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat:0,
      lng:0,
      location:'',
      forecast:'',
      forecastList:'',
      search:'',
      searchCoords:{
        lat:0,
        lng:0
      },
      searchForecast:'',
      searchForecastList:''
    }
  }

  getSearch = (val) => {
    this.setState({
      search:val.target.value
    })
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
            }
          })
        }.bind(this))

  }

  handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      this.searchPull()
    }
  }

  forecastPull = (lat,lng) => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+
        lat+'&lon='+lng+'&appid='+API_KEY+'&units=imperial')
        .then(function(resp) {return resp.json()})
        .then(function(data) {
          this.setState({
            forecastList:data.daily
          })
        }.bind(this))
  }

  currentWeatherOneCall = (lat,lng) => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' +
      lat+'&lon='+lng+'&appid='+API_KEY+'&units=imperial')
      .then(function(resp) {return resp.json()})
      .then(function(data) {
        this.setState({
          forecast:data.hourly
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
          location:data
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
      this.forecastPull(this.state.lat,this.state.lng);
      }.bind(this));
    }




  renderBody(){
    if (this.state.lat === 0 && this.state.lng === 0){
      return (
        <>
          <div className="BodyTop">
            <div className="Search">
              <input id="searchInput" type="text" name="" placeholder="Enter Location" onChange={this.getSearch} onKeyPress={this.handleKeyPress}/>
              <button type="submit" onClick={this.searchPull}>Search</button>
            </div>
          </div>
          <div className="BodyBottom">
            <h1>No Location Data Available...</h1>
            <h1>Please allow location sharing or search for your city.</h1>
          </div>
        </>
      )
    } else if (this.state.searchCoords.lat === 0 && this.state.searchCoords.lng === 0){
      return (
        <>
          <div className="BodyTop">
            <div className="Search">
              <input id="searchInput" type="text" name="" placeholder="Enter Location" onChange={this.getSearch} onKeyPress={this.handleKeyPress}/>
              <button type="submit" onClick={this.searchPull}>Search</button>
            </div>
          </div>
          <div className="BodyBottom">
            <div className="CurrentWeather">
              <CurrentWeather data={this.state.location}
                              oneCall={this.state.forecast}
                              iconPath={icons}
              />
              <Chart data={this.state.forecast}/>
            </div>
            <div className="Forecast">
              <Forecast list={this.state.forecastList}
                        iconPath={icons}
              />
            </div>
          </div>
        </>
      )
    }else{
      return (
        <>
          <div className="BodyTop">
            <div className="Search">
              <input id="searchInput" type="text" name="" placeholder="Enter Location" onChange={this.getSearch} onKeyPress={this.handleKeyPress}/>
              <button type="submit" onClick={this.searchPull}>Search</button>
            </div>
          </div>
          <div className="BodyBottom">
            <div className="CurrentWeather">
              <CurrentWeather data={this.state.searchForecast}
                              oneCall={this.state.forecast}
                              iconPath={icons}
              />
            </div>
            <div className="Forecast">
              <Forecast list={this.state.searchForecastList}
                        iconPath={icons}
              />
            </div>
          </div>
        </>
      )
    }
  }

  render() {


      return (
        <div className="Body">
        {console.log(this.state)}
        {this.renderBody()}
        </div>
      )
  }
}

export default Body;
