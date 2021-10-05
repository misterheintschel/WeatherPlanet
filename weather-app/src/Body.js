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
              lng:data.coord.lon,
              data:data
            }
          })
        }.bind(this))

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
        console.log(data.hourly)
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
    if (this.state.searchForecast === ''){
      return (
        <>
          <div className="BodyTop">
            <div className="CurrentLocation">
              <h3>Current Location: <br/>Latitude: <span>{this.state.lat}</span><br/>Longitude: <span>{this.state.lng}</span><br/>
              City: <span>{this.state.location.name}</span></h3>
            </div>
            <div className="hidden">
              <h1>This should not be visible</h1>
            </div>
            <div className="Search">
              <input id="searchInput" type="text" name="" placeholder="Enter Location" onChange={this.getSearch}/>
              <button type="submit" onClick={this.searchPull}>Search</button>
            </div>
          </div>
          <div className="BodyBottom">
            <div className="CurrentWeather">
              <h1 id="City">{this.state.location.name}</h1>
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
            <div className="CurrentLocation">
              <h3>Current Location: <br/>Latitude: <span>{this.state.lat}</span><br/>Longitude: <span>{this.state.lng}</span><br/>
              City: <span>{this.state.location.name}</span></h3>}
            </div>
            <div className="hidden">
              <h1>This should not be visible</h1>
            </div>
            <div className="Search">
              <input id="searchInput" type="text" name="" placeholder="Enter Location" onChange={this.getSearch}/>
              <button type="submit" onClick={this.searchPull}>Search</button>
            </div>
          </div>
          <div className="BodyBottom">
            <div className="CurrentWeather">
              <h1 id="City">{this.state.searchCoords.data.name}</h1>
              <CurrentWeather data={this.state.searchForecast}
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
        {this.renderBody()}
        </div>
      )
  }
}

export default Body;
