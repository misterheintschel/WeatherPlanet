import React from 'react';


class Forecast extends React.Component {

  getDayNumber(dayInput){
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
      return (
        <>
        </>
      );
    }
    else {
      return (
        this.props.list.slice(1).map((element,index) => (
        <div className="Card" key={index} style={{backgroundImage: `url(${this.findImage(element.weather[0].id + element.weather[0].icon[2])})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'}} >
          <div className="ForecastValues">
            <p id="nameF">{this.getDayNumber(new Date(element.dt*1000).getDay())}</p>
            <p id="descriptionF">{this.capitalizeFirst(element.weather[0].description)}</p>
            <p id="maxTempF"><img alt="loading..." id="maxTempArrow" src={this.findImage('thermoRed')}/> {Math.round(element.temp.max)}&deg;</p>
            <p id="minTempF"><img alt="loading..." id="minTempArrow" src={this.findImage('thermoBlue')}/> {Math.round(element.temp.min)}&deg;</p>
            <p id="feelsLikeF">Feels Like:</p>
            <p id="sunriseF"><img alt="loading..." id="sunriseForecast" src={this.findImage('sunrise')}/> {Math.round(element.feels_like.morn)}&deg;</p>
            <p id="dayF"><img alt="loading..." id="dayForecast" src={this.findImage('sun')}/> {Math.round(element.feels_like.day)}&deg;</p>
            <p id="sunsetF"><img alt="loading..." id="sunsetForecast" src={this.findImage('sunset')}/> {Math.round(element.feels_like.eve)}&deg;</p>
            <p id="nightF"><img alt="loading..." id="nightForecast" src={this.findImage('moon')}/> {Math.round(element.feels_like.night)}&deg;</p>
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
