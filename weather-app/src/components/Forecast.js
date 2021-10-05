import React, { useState, Component } from 'react';


class Forecast extends React.Component {
  constructor(props){
    super(props);
  }


  //<img id="imgF" src={this.props.iconPath.find(o => o.key === element.weather[0].icon).value} alt="Loading..."/>

  getDayNumber(dayInput){
    switch(dayInput){
      case 0:{
        return 'Sunday'
        break;
      }
      case 1:{
        return 'Monday'
        break;
      }
      case 2:{
        return 'Tuesday'
        break;
      }
      case 3:{
        return 'Wednesday'
        break;
      }
      case 4:{
        return 'Thursday'
        break;
      }
      case 5:{
        return 'Friday'
        break;
      }
      case 6:{
        return 'Saturday'
        break;
      }
    }
  }

  findImage(str) {
    return this.props.iconPath.find(o => o.key === str).value
  }

  capitalizeFirst(str) {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");
    return str2;
  }

  renderForecast() {
    if(this.props.list === ''){
      return
        <div className="Card">
        </div>
    }
    else {
      return (
        this.props.list.map((element,index) => (
        <div className="Card" key={index} style={{backgroundImage: `url(${this.props.iconPath.find(o => o.key === element.weather[0].icon).value})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'}} >
          <div className="ForecastValues">
            <p id="nameF">{this.getDayNumber(new Date(element.dt*1000).getDay())}</p>
            <p id="descriptionF">{this.capitalizeFirst(element.weather[0].description)}</p>
            <p id="maxTempF"><img id="maxTempArrow" src={this.findImage('redUp')}/> {Math.round(element.temp.max)}&deg;</p>
            <p id="minTempF"><img id="minTempArrow" src={this.findImage('blueDown')} /> {Math.round(element.temp.min)}&deg;</p>
            <p id="feelsLikeF">Feels Like:</p>
            <p id="sunriseF"><img id="sunriseForecast" src={this.findImage('sunrise')}/> {Math.round(element.feels_like.morn)}&deg;</p>
            <p id="dayF"><img id="dayForecast" src={this.findImage('sun')}/> {Math.round(element.feels_like.day)}&deg;</p>
            <p id="sunsetF"><img id="sunsetForecast" src={this.findImage('sunset')}/> {Math.round(element.feels_like.eve)}&deg;</p>
            <p id="nightF"><img id="nightForecast" src={this.findImage('moon')}/> {Math.round(element.feels_like.night)}&deg;</p>
            <p id="timeF">{new Date(element.dt * 1000).toString().substr(4,12)}</p>
          </div>
        </div>
        ))
      )
    }
  }
  render() {

    return (
      <div className="ForecastList">
        {this.renderForecast()}
      </div>
    )
  }

}


export default Forecast;
