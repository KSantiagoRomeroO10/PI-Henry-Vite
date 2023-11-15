const sequelize = require('./Connection')

const Videogame = require('./Videogame')
const Genres = require('./Genres')

Videogame.belongsToMany(Genres, { through: 'GamesGenres' })
Genres.belongsToMany(Videogame, { through: 'GamesGenres' })

module.exports = { sequelize, Videogame, Genres}
