const { Pool } = require('pg');

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: 'registrationdb',
  password: dbPassword,
  port: dbPort
});

// Проверка соединения с базой данных
pool.connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  });

module.exports = pool;
