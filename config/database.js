const mongoose = require('mongoose');
require('dotenv').config();

const dbString = process.env.MONGO_URI;

const connection = mongoose.createConnection(dbString);

mongoose.connection.on(
  'error',
  console.error.bind(console, 'mongo connection error')
);

module.exports = connection;
