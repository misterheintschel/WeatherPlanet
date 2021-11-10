

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

  pool.query('SELECT * FROM users WHERE email = $1',[email], (error, results) => {
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

  pool.query('INSERT INTO users(namef,namel,email,password) VALUES($1,$2,$3,$4) RETURNING *',[namef,namel,email,password], (error, results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUser,
  registerUser
}
