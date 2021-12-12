const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

module.exports = db;
