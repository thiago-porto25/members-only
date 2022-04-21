const mongoose = require('mongoose');
require('dotenv').config();

const dbString = process.env.MONGO_URI;

mongoose.connect(dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  'error',
  console.error.bind(console, 'mongo connection error')
);

module.exports = mongoose.connection;
