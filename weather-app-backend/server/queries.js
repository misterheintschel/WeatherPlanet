

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432
})

const getUser = (request, response) => {
  var email = request.body.email;
  var password = request.body.password;
  pool.query(`SELECT id,email,namef,namel
              FROM users WHERE email = $1
              AND password = crypt($2, password)`,[email,password], (error, results) => {
    if(error) {
      throw error;
    }
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
    response.status(200).json(results.rows);
  })
}

const getFavorites = (request, response) => {
  var user = request.body.user;
  pool.query(`SELECT u.id,u.email,u.namef,u.namel, jsonb_agg(jsonb_build_object('id',f.weather_api_id,'name',f.city_name)) AS favorites
              FROM users u, favorites f
              WHERE u.id = $1
              AND f.user_id = u.id
              GROUP BY u.id;`,[user], (error, results) => {
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
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUser,
  registerUser,
  addFavorite,
  getFavorites,
  removeFavorite
}
