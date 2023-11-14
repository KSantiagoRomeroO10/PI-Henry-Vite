const axios = require('axios')
require('dotenv').config();

const Videogame = require('../Models/Videogame')

const GetVideogamesController = async(req, res) => {
  try{
    const dbVideogamesResponse = await Videogame.findAll()

    const apiResponse = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}`)

    const apiData = apiResponse.data.results

    const newFormat = apiData.map(videogame => {
      const platforms = videogame.platforms.map(platform => platform.platform)
      return {
        id: videogame.id,
        nombre: videogame.name,
        descripcion: videogame.description,
        plataformas: platforms,
        imagen: videogame.background_image,
        fechaLanzamiento: videogame.fechaLanzamiento,
        rating: videogame.rating,
      }
    })

    res.status(200).json([...newFormat, ...dbVideogamesResponse])

  }
  catch(error){
    res.status(500).json({ 'Error 500:': error.message })
  }
}

module.exports = GetVideogamesController