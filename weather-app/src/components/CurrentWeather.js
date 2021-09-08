import React from 'react';





function CurrentWeather() {


  return (
    <div className="CurrentWeatherContainer">
      <img id="img" alt="Loading..."/>
      <div>
        <h1 id="name"></h1>
      </div>
      <div>
        <h3 id="description"></h3>
        <h4 id="temp"></h4>
        <h4 id="maxTemp"></h4>
        <h4 id="minTemp"></h4>
        <h4 id="feelsLike"></h4>
        <p id="time"></p>
      </div>
    </div>
  )
}



export default CurrentWeather;
