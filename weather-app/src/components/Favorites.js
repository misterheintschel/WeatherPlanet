import React, { Component } from 'react';

class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }


  displayFavorites = (user) => {


    return (
      <>
        <div className="welcome-message">
          <h1>Hello, and welcome {user.namef + ' ' + user.namel}!</h1>
        </div>
      </>
    )

  }

  render(){

    let user = this.props.user;
    if(user != null && user != undefined && user != ''){
      if(user.favorites != null && user.favorites != undefined && user.favorites != ''){
        let favorites = user.favorites
      }
      else return (<></>)

    }
    else{
      return (<></>)
    }
    return (
      this.displayFavorites(user)
    )
  }
}


export default Favorites;
