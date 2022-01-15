import React, {useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

const WelcomeMessage = (props) => {
  const backToHome = () => {
    props.history.push('/')
  }

  if(props.user == null || props.user === '' || props.user === undefined) {
    return (
      <>
        <div className="welcome-message">
          <h1>Please sign in to view the Favorites Page</h1>
        </div>
        <div className="back-to-home-button">
          <button onClick={backToHome}>Back to Home</button>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className="welcome-message">
          <h1>Hello! Welcome, {props.user.namef}, and thank you for using Weather Planet!</h1>
        </div>
      </>
    )
  }
};

const FavoriteList = (props) => {

  const backToHome = () => {
    props.history.push('/')
  }

  const findImage = (str) => {
    return props.iconPath.find(o => o.key === str).value;
  }

  const capitalizeFirst = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");
    return str2;
  }

  const favorites = props.favorites;
  if (!props.user || !favorites) {
    if(!props.user){
      return null;
    }
  }

  const navigateToFav = (city) => {
    console.log('success')
  }

  const moreThanZeroFavorites = favorites.length > 0;
  return (
    <>
      {moreThanZeroFavorites ? props.favorites.map((element,index) => (
            <div className="FavoritesCard" key={index} onClick={navigateToFav()} style={{
                                                        backgroundImage: `url(${findImage(element.weather[0].id + element.weather[0].icon[2])})`,
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'}}>
              <div className="FavoriteValues">{console.log(element)}
                <p id="favName">{element.name}</p>
                <p id="favTemp">{Math.round(element.main.temp)}&deg;</p>
                {element.weather.map((element,index) => (<p id={'favDescription'+index}>{capitalizeFirst(element.description)} </p>))}
                <p id="favSunrise">{new Date(element.sys.sunrise * 1000).toLocaleString([], { hour:'numeric',minute:'numeric' })}</p>
                <img alt="loading..." id="favSunrisePic" src={findImage('sunrise')}></img>
                <p id="favSunset">{new Date(element.sys.sunset * 1000).toLocaleString([], { hour:'numeric',minute:'numeric' })}</p>
                <img alt="loading..." id="favSunsetPic" src={findImage('sunset')}></img>
              </div>
            </div>
        ))
    :
      <div className="FavoritesCard">
        <h1>You do not currently have any favorites</h1>
      </div>
    }
    </>
  );
}

const Favorites = (props) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const createFavorites = () => {
      if(props.user != null && props.user !== undefined && props.user !== ''){
        if(props.user.favorites != null && props.user.favorites !== undefined && props.user.favorites !== '') {
          var favorites = props.user.favorites
          if(favorites.length > 0){
            var cities = ''
            for (let i = 0, len = favorites.length; i < len; i++){
              if(i===len-1){
                cities += favorites[i].id
              }
              else {
                cities += (favorites[i].id+',')
              }
            }

            fetch('https://api.openweathermap.org/data/2.5/group?id='+cities+'&appid='+API_KEY+'&units=imperial')
              .then((res) => res.json())
              .then((data) => {
                  setWeatherData(data.list);
            })
            return
          }
          else return setWeatherData([])

        }
        else return setWeatherData([]);
      }
      else return setWeatherData([]);
    };
    createFavorites();

  }, [props]);

  return (
    <>
      <div className="Welcome">
        <WelcomeMessage user={props.user} history={props.history}/>
      </div>
      <div className="FavoritesList">
        <FavoriteList user={props.user} favorites={weatherData} history={props.history} iconPath={props.iconPath} nav={props.nav} />
      </div>
    </>
  )
};

export default withRouter(Favorites);
