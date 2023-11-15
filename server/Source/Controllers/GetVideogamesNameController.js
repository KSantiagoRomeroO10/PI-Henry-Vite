const axios = require('axios');

require('dotenv').config()

const Videogame = require('../Models/Videogame')
const Genres = require('../Models/Genres')

const { Op } = require('sequelize')

const GetVideoGamesNameController = async (req, res) => {
  try {
    
    const { name } = req.query
  
    const defaultImageUrl = 'https://wallpapercave.com/wp/gGAlal4.jpg'
  
    const videogamesFromDB = await Videogame.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${name}%`
        }
      }
    })
  
    const apiResponse = await axios.get(`${process.env.API_URL}?search=${name}&key=${process.env.API_KEY}`)
    const apiData = apiResponse.data.results
  
    const videogamesDBWithImages = videogamesFromDB.map(videogame => {
      if (videogame.imagen && videogame.imagen !== 'Without image' && videogame.imagen !== "") {
        return {
          ...videogame,
          imagen: videogame.imagen
        }
      } 
      else {
        return {
          ...videogame,
          imagen: defaultImageUrl
        }
      }
    })
  
    const videogamesApiWithImages = apiData.map(videogame => {
      if (videogame.background_image && videogame.background_image !== 'Without image' && videogame.background_image !== "") {
        return {
          ...videogame,
          background_image: videogame.background_image
        }
      } 
      else {
        return {
          ...videogame,
          background_image: defaultImageUrl
        }
      }
    })
  
    if (videogamesDBWithImages.length === 0 && videogamesApiWithImages.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron videojuegos con el nombre especificado.' })
    }
    
    const mergeVideoGames = []
  
    const minLength = Math.min(videogamesDBWithImages.length, videogamesApiWithImages.length)
  
    for (let i = 0; i < minLength; i++) {
      mergeVideoGames.push(videogamesDBWithImages[i]);
      mergeVideoGames.push(videogamesApiWithImages[i]);
    }
  
    // Agregar los elementos restantes de videogamesDBWithImages si su longitud es mayor que la de videogamesApiWithImages
    for (let i = minLength; i < videogamesDBWithImages.length; i++) {
      mergeVideoGames.push(videogamesDBWithImages[i]);
    }
  
    // Agregar los elementos restantes de videogamesApiWithImages si su longitud es mayor que la de videogamesDBWithImages
    for (let i = minLength; i < videogamesApiWithImages.length; i++) {
      mergeVideoGames.push(videogamesApiWithImages[i]);
    }
  
    const max15 = mergeVideoGames.slice(0, 15)
  
    res.status(200).json({Videogames: max15})
  
  }
  catch (error) {
    res.status(500).json({error: error.message, error1: error})
  }
  
}

module.exports = GetVideoGamesNameController