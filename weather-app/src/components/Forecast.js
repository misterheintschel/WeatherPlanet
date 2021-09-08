import React, { useState, Component } from 'react';


class Forecast extends React.Component {
  constructor(props){
    super(props);
  }

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

  renderForecast(){
    if(this.props.list === ''){
      return
        <div className="Card">
        </div>
    }
    else {

      return (
        this.props.list.map((element,index) => (
        <div className="Card" key={index}>
          <img id="imgF" src={this.props.iconPath.find(o => o.key === element.weather[0].icon).value} alt="Loading..."/>
          <div>
            <h1 id="nameF">{this.getDayNumber(new Date(element.dt*1000).getDay())}</h1>
          </div>
          <div>
            <h3 id="descriptionF"></h3>
            <h4 id="maxTempF">High: {element.temp.max}&deg;</h4>
            <h4 id="minTempF">Low: {element.temp.min}&deg;</h4>
            <h4 id="feelsLikeF">Feels Like:<br/>Morning: {element.feels_like.morn}&deg;
            <br/>Day: {element.feels_like.day}&deg;<br/>Evening: {element.feels_like.eve}&deg;
            <br/>Night: {element.feels_like.night}&deg;</h4>
            <p id="timeF">{new Date(element.dt * 1000).toString()}</p>
          </div>
        </div>
        ))
      )
    }
  }
  render() {

    return (
      <div className="List">
        {this.renderForecast()}
      </div>
    )
  }

}



export default Forecast;
