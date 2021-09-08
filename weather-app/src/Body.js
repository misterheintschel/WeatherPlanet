import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forecast from './components/Forecast';
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import CurrentWeather from './components/CurrentWeather';
import icons from './resources/weather-icons/Icons';
import './Body.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


class Body extends Component {
  constructor(){
    super()
    this.state = {
      lat:0,
      lng:0,
      location:{

      },
      forecast:{

      },
      forecastList:'',
      search:'',
      searchLocation:{

      },
      searchForecast:{

      }
    }
  }

  getSearch = (val) => {
    this.setState({
      search:val.target.value
    })
  }

  searchPull = () => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?q='+this.state.search+'&appid='+API_KEY+'&units=imperial')
        .then(function(resp) {return resp.json()})
        .then(function(data) {
          console.log(data)
        }.bind(this))
  }

  forecastPull = () => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+
        this.state.lat+'&lon='+this.state.lng+'&appid='+API_KEY+'&units=imperial')
        .then(function(resp) {return resp.json()})
        .then(function(data) {
          this.setState({
            forecast:data,
            forecastList:data.daily
          })
          console.log(data)
        }.bind(this))
        .catch(function() {

        })
  }

  weatherPull = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +
      this.state.lat+'&lon='+this.state.lng+'&appid='+API_KEY+'&units=imperial')
      .then(function(resp) {return resp.json() })//convert data to json
      .then(function(data) {
        this.setState({
          location:data
        })
        this.drawCurrentWeather(this.state.location);
      }.bind(this))
      .catch(function() {
        //catch errors
      })
  }


  drawCurrentWeather = ( d ) => {
    const weatherType = d.weather[0].icon;
    document.getElementById('img').src = icons.find(o => o.key === weatherType).value;
    document.getElementById('name').innerHTML = d.name;
    document.getElementById('temp').innerHTML = 'Temp: '+ d.main.temp + '&deg;';
    document.getElementById('maxTemp').innerHTML = 'Max: '+d.main.temp_max+ '&deg;';
    document.getElementById('minTemp').innerHTML = 'Min: '+d.main.temp_min+ '&deg;';
    document.getElementById('feelsLike').innerHTML = 'Feels Like: '+d.main.feels_like+ '&deg;';
    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('time').innerHTML = new Date(d.dt * 1000);

  }

  drawCurrentForecast = ( d ) => {
  }

/*
  drawCurrentForecast = ( d ) => {
    for(var entry in d.list){
      const weatherType = d.list[entry].weather[0].icon;
      document.getElementById('imgF').src = icons.find(o => o.key === weatherType).value;
      document.getElementById('nameF').innerHTML = d.list[entry].name;
      document.getElementById('tempF').innerHTML = 'Temp: '+ d.list[entry].main.temp + '&deg;';
      document.getElementById('maxTempF').innerHTML = 'Max: '+d.list[entry].main.temp_max+ '&deg;';
      document.getElementById('minTempF').innerHTML = 'Min: '+d.list[entry].main.temp_min+ '&deg;';
      document.getElementById('feelsLikeF').innerHTML = 'Feels Like: '+d.list[entry].main.feels_like+ '&deg;';
      document.getElementById('descriptionF').innerHTML = d.list[entry].weather[0].description;
      document.getElementById('timeF').innerHTML = new Date(d.list[entry].dt * 1000);

    }
  }
*/

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({
        lat: (Math.round(position.coords.latitude * 100000000000) /100000000000),
        lng: (Math.round(position.coords.longitude * 100000000000) /100000000000)
      })
      this.weatherPull();
      this.forecastPull();
      this.searchPull();
      }.bind(this));
    }
/*
    {"coord":
    {"lon":-117.0932,"lat":33.1809},
    "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
    "base":"stations",
    "main":{"temp":76.55,"feels_like":76.96,"temp_min":65.16,"temp_max":91.71,"pressure":1004,"humidity":65},
    "visibility":10000,
    "wind":{"speed":1.01,"deg":229,"gust":5.01},
    "clouds":{"all":75},
    "dt":1630367050,
    "sys":{"type":2,"id":2006381,"country":"US","sunrise":1630329708,"sunset":1630376185},
    "timezone":-25200,
    "id":5356722,
    "name":"Hidden Meadows",
    "cod":200}
*/

  render() {

    return (
      <div className="Body">
        <div className="BodyTop">
          <div className="CurrentLocation">
            <h3>Current Location: Latitude: {this.state.lat} | Longitude: {this.state.lng}</h3>
          </div>
          <div className="Search">
            <input id="searchInput" type="text" name="" placeholder="Enter Location" onChange={this.getSearch}/>
            <button type="submit" onClick={this.searchPull}>Search</button>
          </div>
        </div>
        <div className="BodyBottom">
          <div className="Forecast">
            <Forecast list={this.state.forecastList}
                      iconPath={icons}
            />
          </div>
          <div className="CurrentWeather">
            <CurrentWeather />
          </div>
        </div>
      </div>
    )
  }
}

export default Body;
