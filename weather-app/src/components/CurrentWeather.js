import React from 'react';
const REACT_APP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const pre = REACT_APP_IMAGE_URL+'favorite-pre.png';
const post = REACT_APP_IMAGE_URL+'favorite-post.png';
const fav = REACT_APP_IMAGE_URL+'favorite-hover.gif';



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

  timeofDay = (time) => {
    if (time > 12){
      return 'PM';
    }
    else return 'AM';
  }

  findImage = (str) => {
    return this.props.iconPath.find(o => o.key === str).value;
  }

  displayFavorite = (user,data) => {
    let pic = pre;
    let cities;
    if (user != null) {cities = user.favorites;}

    if(cities === undefined){
      return pic;
    }

    if(cities === null){
      return pic
    }

    if(cities.some(e => e.id === data.id)){
      pic = post;
      return pic;
    }
    else {
      return pic;
    }
  }

  addHours = (date,offset) => {
    let hours = offset / 3600;
    let time = new Date(date * 1000);
    let off = date+offset
    let offdate = new Date(off * 1000)
    let timeString = time.toUTCString();
    let newb = new Date(Date.UTC(timeString))

  }

  addFavorite = () => {
    return this.props.favorite();
  }
  removeFavorite = () => {
    return this.props.remove();
  }

  renderCurrentWeather = () => {
    if(this.props.data === '') {
      return (
        <div className="Body">
        <h2>No location data available...</h2>
        <h2>Please allow location sharing or search for weather.</h2>
        </div>
      )
    }
    else{
      let data = this.props.data;
      let user = this.props.user;
      let oneCall = this.props.oneCall;
      let sunrise = data.sys.sunrise;
      let sunset = data.sys.sunset;
      let favorited;
      if(user != null){
        if(user.favorites !== undefined && user.favorites != null && user.favorites !== '') {
          if(user.favorites.some((e) => (e.id === data.id))) {
            favorited = true;
          }
          else {
            favorited = false;
          }
        }
      }
      else {
        favorited = false;
      }
      return (

        <div className="CurrentWeatherCard" style={{
                                                    backgroundImage: `url(${this.findImage(data.weather[0].id + data.weather[0].icon[2])})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'}}>
          <div className="CurrentValues">
            {this.addHours(sunrise,oneCall.timezone_offset)}
            <h1 id="name">{data.name}</h1>
            <p id="temp">{Math.round(data.main.temp)}&deg;</p>
            <p id="today">Currently</p>
            <p id="info">{this.capitalizeFirst(data.weather[0].description)}</p>
            <p id="feelsLike">Feels Like: {Math.round(data.main.feels_like)}&deg;</p>
            <p id="minMax"><img alt="loading..." id="redUp" src={this.findImage('thermoRed')}/>{Math.round(data.main.temp_max)}&deg;<img alt="loading..." id="blueDown" src={this.findImage('thermoBlue')}/>{Math.round(data.main.temp_min)}&deg;</p>
            <p id="wind">{data.wind.deg}&deg; {this.degreesToDirection(data.wind.deg)} Wind at {Math.round(data.wind.speed)}mph</p>
            <p id="description">{data.weather[0].main} currently. <br/>The high will be {Math.round(data.main.temp_max)}&deg;,
              <br/>with a low of {Math.round(data.main.temp_min)}&deg;</p>
            <p id="humidity">Humidity: {data.main.humidity}%</p>
            <p id="sunrise">{new Date(sunrise * 1000).toLocaleString([], { hour:'numeric',minute:'numeric' })}</p>
            <img alt="loading..." id="sunrise_pic" src={this.findImage('sunrise')}></img>
            <p id="sunset">{new Date(sunset * 1000).toLocaleString([], { hour:'numeric',minute:'numeric' })}</p>
            <img alt="loading..." id="sunset_pic" src={this.findImage('sunset')}></img>
            <p id="time">{new Date(data.dt * 1000).toString().substr(0,16)}</p>
          </div>
          <label className="Btn">{(user !== '' && user !== undefined && user != null)? <img id="favicon" alt="favorite" src={this.displayFavorite(user,data)} onMouseOver={(e) => e.currentTarget.src = fav} onMouseOut={(e) => e.currentTarget.src = this.displayFavorite(user,data)}  onClick={favorited ? this.removeFavorite : this.addFavorite}></img> : <></>}</label>
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

//onMouseOver={(e) => e.currentTarget.src = fav}
export default CurrentWeather;
