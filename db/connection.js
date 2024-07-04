const mongoose = require('mongoose');
require('dotenv').config();

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));
  }
}

module.exports = new Database();