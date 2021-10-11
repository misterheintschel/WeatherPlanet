import React from 'react';



class CurrentWeather extends React.Component {

  getDayNumber = (dayInput) => {
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

  capitalizeFirst = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");
    return str2;
  }

  degreesToDirection = (d) => {
        let directions = ['Northerly', 'North Easterly', 'Easterly', 'South Easterly', 'Southerly', 'South Westerly', 'Westerly', 'North Westerly'];

        d += 22.5;

        if (d < 0){
            d = 360 - Math.abs(d) % 360;
        }
        else{
            d = d % 360;
        }
        let w = parseInt(d / 45);
        return (`${directions[w]}`);
    }

  timeofDay = (x) => {
    if (x > 12){
      return 'PM';
    }
    else return 'AM';
  }

  findImage = (str) => {
    return this.props.iconPath.find(o => o.key === str).value
  }


  renderCurrentWeather = () => {
    if(this.props.data === '') {
      return (
        <div>
        </div>
      )
    }
    else{
      let data = this.props.data;
      return (

        <div className="CurrentWeatherCard" style={{
                                                    backgroundImage: `url(${this.findImage(data.weather[0].icon)})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'}}>
          <div className="CurrentValues">
            <p id="temp">{Math.round(data.main.temp)}&deg;</p>
            <p id="today">Today</p>
            <p id="info">{this.capitalizeFirst(data.weather[0].description)}</p>
            <p id="feelsLike">Feels Like: {Math.round(data.main.feels_like)}&deg;</p>
            <p id="minMax"><img id="redUp" src={this.findImage('thermoRed')}/>{Math.round(data.main.temp_max)}&deg; <img id="blueDown" src={this.findImage('thermoBlue')}/>{Math.round(data.main.temp_min)}&deg;</p>
            <p id="wind">{data.wind.deg}&deg; {this.degreesToDirection(data.wind.deg)} Wind at {Math.round(data.wind.speed)}mph</p>
            <p id="description">{data.weather[0].main} currently. <br/>The high will be {Math.round(data.main.temp_max)}&deg;,
              <br/>with a low of {Math.round(data.main.temp_min)}&deg;</p>
            <p id="humidity">Humidity: {data.main.humidity}%</p>
            <p id="sunrise"><img id="sunrise_pic" src={this.findImage('sunrise')}></img>{new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour:'numeric',minute:'numeric'})}</p>
            <p id="sunset"><img id="sunset_pic" src={this.findImage('sunset')}></img>{new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour:'numeric',minute:'numeric'})}</p>
            <p id="time">{new Date(data.dt * 1000).toString().substr(0,16)}</p>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="WeatherCard">
        {this.renderCurrentWeather()}
      </div>
    )
  }
}


export default CurrentWeather;
