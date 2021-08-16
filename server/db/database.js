const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'new_password',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log('cant connect!', err);
  } else {
    console.log('connected!');
  }
});

module.exports = client;
