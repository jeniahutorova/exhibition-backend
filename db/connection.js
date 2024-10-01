const mysql = require('mysql2/promise');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MYSQL_DATABASE || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD) {
  throw new Error('MYSQL_DATABASE, MYSQL_USER, or MYSQL_PASSWORD not set');
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE, 
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT || 3306,
});

pool.getConnection()
  .then((connection) => {
    console.log('Database connected successfully');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process with failure
  });

module.exports = pool;
