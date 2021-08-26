import React, { useState } from 'react';
import {Card} from 'react-bootstrap';



let values = [
  {
    dt: 0,
    temp_min: 0,
    temp_max: 0,
    main: '',
    icon: ''
  }
]

const WeatherCard = ({dt, temp_min, temp_max, main, icon}) => {

  // create a date object with Date class constructor
  //const date = new Date(dt);

  return (
    <div className="Card">
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-status"/>
      <div className="Main">
        <h1>{main}</h1>
      </div>
      <div className="Values">
        <ul>
          <li>Min: {temp_min}</li>
          <li>Max: {temp_max}</li>
        </ul>
      </div>
    </div>
  );

/*   return (
    <Card style={{width: '25rem'}}>
      <Card.Img
        variant="top"
        // get the src from example url and pass the icon prop for icon code
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
      <Card.Body>
        <Card.Title>{main}</Card.Title>
        {  datetime is received in milliseconds, let's turn into local date time }
        <p>
          {date.toLocaleDateString()} - {date.toLocaleTimeString()}
        </p>
        { minimum temperature }
        <p>Min: {temp_min}</p>
        { maximum temperature }
        <p>Max: {temp_max}</p>
      </Card.Body>
    </Card>
  ) */
};

export default WeatherCard;
