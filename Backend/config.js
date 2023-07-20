// const mysql = require('mysql');



// const dbConfig = {
//     host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   };
  
//   const connection = mysql.createConnection(dbConfig);
  
//   connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to the database:', error);
//       return;
//     }
//     console.log('Connected to the database.');
//   });

//   module.exports = connection;
const mysql = require('mysql2');
const path = require('../../Handi_Decor/Backend');
require('dotenv').config();
// require('dotenv').config('../.e');
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user:'root',
  password: 'admin',
  database: 'handi_decor',
  connectionLimit: 10
});
console.log(`hihandi${process.env.DB_HOST}`)
module.exports = pool;