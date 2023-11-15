const axios = require('axios')
require('dotenv').config();

const Videogame = require('../Models/Videogame')
const Genres = require('../Models/Genres')

const GetVideogamesIdController = async(req, res) => {
  try{

    const { id } = req.params

    const dbVideogamesResponse = await Videogame.findByPk(id, { include: Genres })
    const apiResponse = await axios.get(`${process.env.API_URL}/${id}?key=${process.env.API_KEY}`)
    const apiData = apiResponse.data
    const platforms = apiData.platforms.map(platform => platform.platform)

    const newFormat = {  
        id: apiData.id,
        nombre: apiData.name,
        descripcion: apiData.description,
        plataformas: platforms,
        imagen: apiData.background_image,
        fechaLanzamiento: apiData.fechaLanzamiento,
        rating: apiData.rating,
        genres: videogame.genres
    }

    if(dbVideogamesResponse) res.status(200).json(dbVideogamesResponse)
    else if(newFormat) res.status(200).json(newFormat)
    else res.status(404).json({'Error 404': 'Videogame not found'})
  }
  catch(error){
    res.status(500).json({ 'Error 500:': error.message })
  }
}

module.exports = GetVideogamesIdController