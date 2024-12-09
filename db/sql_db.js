const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'blog_db'
})




module.exports = connection