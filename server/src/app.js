const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./db');
const authRoutes = require('./routes/auth.routes');

const app = express();

//Iniciando conexion a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//definicion de las rutas
app.use('/api/auth', authRoutes);

module.exports = app;