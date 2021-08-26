import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WeatherCard from './components/WeatherCard';
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import './Body.css';



class Body extends React.Component {
  constructor(){
    super()
    this.state = {
      lat:0,
      lng:0
    }
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log(position);
      this.setState({
        lat: (Math.round(position.coords.latitude * 10000000) /10000000),
        lng: (Math.round(position.coords.longitude * 10000000) /10000000)
      })
      }.bind(this))
    }


  render() {
    return (
      <div className="Body">
        <div className="CurrentLocation">
          <h3>Current Location: Latitude: {this.state.lat} | Longitude: {this.state.lng}</h3>
        </div>
        <div className="Search">
          <input id="searchInput" type="text" name="" placeholder="Enter Location"/>
          <button type="submit">Search</button>
        </div>
        <div className="CardContainer">
          <div className="WeatherCard">
            <WeatherCard
              dt={1602104400 * 1000}
              temp_min='75'
              temp_max='85'
              main='Day 1 Example'
              icon='10d'
            />
          </div>
          <div className="WeatherCard">
            <WeatherCard
              dt={1602104400 * 1000}
              temp_min='75'
              temp_max='85'
              main='Day 2 Example'
              icon='10d'
            />
          </div>
          <div className="WeatherCard">
            <WeatherCard
              dt={1602104400 * 1000}
              temp_min='75'
              temp_max='85'
              main='Day 3 Example'
              icon='10d'
            />
          </div>
          <div className="WeatherCard">
            <WeatherCard
              dt={1602104400 * 1000}
              temp_min='75'
              temp_max='85'
              main='Day 4 Example'
              icon='10d'
            />
          </div>
        </div>
        <div className="CurrentWeather">
        
        </div>
      </div>
    )
  }
}

export default Body;
