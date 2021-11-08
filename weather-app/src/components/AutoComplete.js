import React, { Component } from 'react';
import PropTypes from 'prop-types';
let admins = require('../resources/city.list.json');

export class AutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    }
  }

  onChange = (val) => {
    let list = [];
    this.setState({
      userInput:val.currentTarget.value
    })
    for (let i = 0; i <admins.length; i++){
      if (this.state.userInput.length >= 2){
        if (admins[i].name.toLowerCase().includes(this.state.userInput.toLowerCase())) {
          list.push({name:admins[i].name, state:admins[i].state, country:admins[i].country, key:admins[i].id});
        }
      }

    }
    this.setState({
      showSuggestions:true,
      filteredSuggestions: list
    })

  }

  onClick = (val) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions:[],
      showSuggestions:false,
      userInput: val.currentTarget.innerText
    });
    this.props.submit(val.currentTarget.innerText);
    //this.props.submit(this.state.userInput);
  }

  onSubmit = (event) => {
    this.props.submit(this.state.userInput);
  }



  render(){
    const {
      onChange,
      onClick,
      onKeyDown,
      onSubmit,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
      if(showSuggestions && userInput) {
        if(filteredSuggestions.length){
          suggestionsListComponent = (
            <ul className="suggestions">
              {filteredSuggestions.slice(0,15).map((suggestion, index) => {
                return (
                  <li className="suggestion" key={suggestion.key} onClick={onClick}>
                    {suggestion.name +', '+suggestion.state + ' ' + suggestion.country}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div className="no-suggestions">
              <em>...</em>
            </div>
          );
        }
      }
    return (
      <div className="Search">
        <input
          type="text"
          id="searchInput"
          placeholder="  Enter Location"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
        <button type="submit" onClick={onSubmit}>Search</button>
      </div>
    );

  }
}

export default AutoComplete;
