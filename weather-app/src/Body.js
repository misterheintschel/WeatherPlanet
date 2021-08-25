import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Body.css';



function Body() {

function sayHello(){
  console.log('Hello');
}


  return (
    <div className="Body">
      <div className="Search">
        <input id="searchInput" type="text" name="" placeholder="Enter Location"/>
        <button type="submit">Search</button>
      </div>
    </div>
  );
}

export default Body;
