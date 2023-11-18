require('dotenv').config()
const axios = require('axios')

const Videogame = require('../Models/Videogame')
const Genres = require('../Models/Genres')

const PostDriverController = async (req, res) => {

  const { nombre, descripcion, plataformas, imagen, fechaLanzamiento, rating, genres } = req.body

  const limitPage = 5

  try {

    const apiResponse = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}`)
    let maxIdGame

    await Videogame.max('id')
    .then(max => {
      if(max) maxIdGame = max
      else maxIdGame = apiResponse.data.count
      console.log(maxIdGame)
    })
    .catch(error => {
      console.log(error);
    })

    const newVideogame = await Videogame.create({
        id: maxIdGame+1,
        nombre,
        descripcion,
        plataformas,
        imagen,
        fechaLanzamiento,
        rating
      }
    )

    if (genres && genres.length > 0) {
      for (const genreName of genres) {
        let genres = await Genres.findOne({ where: { nombre: genreName } })
        if (!genres) {
          genres = await Genres.create({ nombre: genreName })
        }
        await newVideogame.addGenres(genres)
      }
    }

    res.status(201).json({ mensaje: 'Videogame created succesful.'})
  } 
  catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al crear el videojuego.', error: error.message})
  }
}

module.exports = PostDriverController

// para registar mediante esta API, crea los teams si no existen
// {
//   "nombre": "Nombre del juego",
//   "descripcion": "descripcion",
//   "plataformas": "plataforma1, plataforma2, plataforma3",
//   "imagen": "www.imagen.com",
//   "fechaLanzamiento": "1998-12-10",
//   "rating": 4.8,
//    "genres": ["equipo1", "equipo2", "equipo3"]
// }

