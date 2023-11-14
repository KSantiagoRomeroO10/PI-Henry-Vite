const axios = require('axios')
require('dotenv').config();

const Videogame = require('../Models/Videogame')

const GetVideogamesController = async(req, res) => {
  try{
    const dbVideogamesResponse = await Videogame.findAll()    

    let pages = true
    let numberPage = 1
    const apiResponseAllPage = []

    while(pages) {

      let apiResponse = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}&page=${numberPage}`)
      apiResponseAllPage.push(...apiResponse.data.results)
      numberPage += 1 

      if(numberPage === 6) pages = false
      // if(apiResponse.data.next === null) pages = false
      // else console.log(`Página: ${numberPage}`);

    }

    // const apiData = apiResponse.data.results

    const newFormat = apiResponseAllPage.map(videogame => {
      const platforms = videogame.platforms.map(platform => platform.platform)
      return {
        id: videogame.id,
        nombre: videogame.name,
        descripcion: videogame.description,
        plataformas: platforms,
        imagen: videogame.background_image,
        fechaLanzamiento: videogame.fechaLanzamiento,
        rating: videogame.rating,
        genres: videogame.genres
      }
    })

    res.status(200).json([...newFormat, ...dbVideogamesResponse])

  }
  catch(error){
    res.status(500).json({ 'Error 500:': error.message })
  }
}

module.exports = GetVideogamesController