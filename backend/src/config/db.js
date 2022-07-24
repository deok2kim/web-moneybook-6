const mysql = require('mysql2');
const env = require('dotenv');

env.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: 'date',
  })
  .promise();

module.exports = pool;
