

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
  pool.query(`SELECT id,email,namef,namel,favorites FROM users WHERE email = $1 AND password = crypt($2, password)`,[email,password], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const addFavorite = (request, response) => {
  var name = request.body.name;
  var city_id = request.body.id;
  var data = { "name": name, "id": city_id }
  var user = request.body.user;
  console.log(name, city_id, user)
  pool.query(`UPDATE users SET favorites = favorites || $1::jsonb WHERE id = $2 RETURNING *`,[data,user], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const removeFavorite = (request, response) => {
  var user = request.body.user;
  var city = request.body.city;
  pool.query(`TODO`,[user,city], (error, results) => {
    if(error) {
      throw error;
    }

  })
}

const registerUser = (request, response) => {

  var namef = request.body.namef;
  var namel = request.body.namel;
  var email = request.body.email;
  var password = request.body.password;

  pool.query(`INSERT INTO users(namef,namel,email,password) VALUES($1,$2,$3,crypt($4, gen_salt('bf'))) RETURNING *`,[namef,namel,email,password], (error, results) => {
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
  removeFavorite
}
