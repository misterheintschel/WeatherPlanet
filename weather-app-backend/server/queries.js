const Pool = require('pg').Pool;
const jwt = require('jsonwebtoken');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const checkToken = (request, response) => {
  var cookie = request.headers.cookie
  if(cookie !== undefined) {
    var cookieValue = {key:cookie.split("=")[0], value:cookie.split("=")[1]}
    console.log('cookieValue',cookieValue)
    try {
      var decoded = jwt.verify(cookieValue.value, process.env.JWT_SECRET)
      console.log('decoded', decoded)
      console.log('created:',new Date(decoded.iat * 1000),'expires:',new Date(decoded.exp * 1000))
      pool.query(`SELECT id,email,namef,namel
                  FROM users WHERE id = $1`,[decoded.id], (error, results) => {
        if(error) {
          throw error;
        }
        var user = results.rows[0]
        return response
          .status(200)
          .json(user)
      })
    } catch(err) {
      return response
        .status(511)
        .json({'message':'authentication token invalid'})
    }

  }
  else {
    return response
      .status(401)
      .json({'message':'No authentication token discovered'})
  }
}


const getUser = (request, response) => {
  var email = request.body.email;
  var password = request.body.password;
  pool.query(`SELECT id,email,namef,namel
              FROM users WHERE email = $1
              AND password = crypt($2, password)`,[email,password], (error, results) => {
    if(error) {
      throw error;
    }
    var user = results.rows[0]
    var token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    })
    return response
      .cookie('access-token', token, {
        httpOnly:true,
        sameSite:'lax',
      })
      .status(200)
      .json(user)
  })
}

const citySearch = (request, response) => {
  var search = request.body.search
  console.log(search)
  pool.query(`SELECT * FROM cities
              WHERE name ILIKE $1 || '%'
              ORDER BY CASE WHEN country = 'US'
              THEN 1 ELSE 2 END, country`,[search], (error, results) => {
    if(error) {
      throw error;
    }
    console.log(results.rows)
    response.status(200).json(results.rows);
  })

}

const addFavorite = (request, response) => {
  var name = request.body.name;
  var city_id = request.body.id;
  var user = request.body.user;
  pool.query(`INSERT INTO favorites (weather_api_id,user_id,city_name)
              VALUES ($1,$2,$3)`,[city_id,user,name], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(201).json(results.rows);
  })
}

const getFavorites = (request, response) => {
  var user = request.body.user;
  pool.query(`SELECT city_name,weather_api_id AS "id"
	            FROM favorites
	            WHERE user_id = $1`,[user], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })

}

const removeFavorite = (request, response) => {
  var user = request.body.user;
  var city = request.body.city;
  pool.query(`DELETE FROM favorites
              WHERE user_id = $1
              AND weather_api_id = $2;`,[user,city], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const registerUser = (request, response) => {

  var namef = request.body.namef;
  var namel = request.body.namel;
  var email = request.body.email;
  var password = request.body.password;

  pool.query(`INSERT INTO users(namef,namel,email,password)
              VALUES($1,$2,$3,crypt($4, gen_salt('bf')))
              RETURNING *`,[namef,namel,email,password], (error, results) => {
    if(error){
      throw error;
    }
    response.status(201).json(results.rows)
  })
}

module.exports = {
  getUser,
  checkToken,
  registerUser,
  citySearch,
  addFavorite,
  getFavorites,
  removeFavorite
}
