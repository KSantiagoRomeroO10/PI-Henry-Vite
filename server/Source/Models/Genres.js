const { DataTypes } = require('sequelize')
const sequelize = require('./Connection')

const Genres = sequelize.define('Genres', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    //autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Genres
