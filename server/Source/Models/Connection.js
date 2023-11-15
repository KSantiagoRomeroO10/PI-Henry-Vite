require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos usando variables de entorno

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME_DB,
  username: process.env.DB_NAME_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
