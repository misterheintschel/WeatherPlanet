import React, { Component } from 'react';

export class AutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    }
  }

  onChange = (val) => {
    let list = [];
    let input = val.currentTarget.value
    let fetchData = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search:input
      })
    }
    this.setState({
      userInput:input
    })
    if(input.length > 2){
      fetch("/citySearch", fetchData)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          showSuggestions:true,
          filteredSuggestions: data
        })
      })
    }
  }

  onKeyDown = (event) => {
    if(event.key === 'Enter') {
      this.onSubmit()
      this.setState({
        filteredSuggestions:[],
        showSuggestions:false,
      })
    }
  }

  onClick = (val) => {
    this.setState({
      filteredSuggestions:[],
      showSuggestions:false,
      userInput: val.currentTarget.innerText
    });
    this.props.submit(val.currentTarget.innerText);
  }

  onSubmit = (event) => {
    this.props.submit(this.state.userInput);
  }

  handleClickOutside = (event) => {

    if(this.node.contains(event.target)) {
      return;
    }
    else {
      this.setState({
        filteredSuggestions: [],
        showSuggestions:false
      })
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  render(){
    const {
      onChange,
      onClick,
      onKeyDown,
      onSubmit,
      state: {
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
              {filteredSuggestions.slice(0,50).map((suggestion, index) => {
                return (
                  <li className="suggestion" key={index} onClick={onClick}>
                    {suggestion.name + ', '+suggestion.state + ' ' + suggestion.country}
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
      <div className="Search" ref={node => this.node = node}>
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
