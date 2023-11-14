const axios = require('axios')

const Videogame = require('../Models/Videogame')

const GetVideogamesController = async(req, res) => {
  try{
    const dbVideogamesResponse = await Videogame.findAll()
    const apiResponse = await axios.get('https://api.rawg.io/api/games?key=5c431612f90f43539fd6e525ef8c4a14')

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