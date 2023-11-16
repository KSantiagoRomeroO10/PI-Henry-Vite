require('dotenv').config();

const axios = require('axios')
const Genres = require('../Models/Genres')

const GetGenresController = async (req, res) => {
  try {
    const dbGenres = await Genres.findAll()

    let pages = true
    let numberPage = 1
    const apiResponseAllPage = []

    while(pages) {

      let apiResponse = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}&page=${numberPage}`)
      apiResponseAllPage.push(...apiResponse.data.results)
      numberPage += 1 

      if(numberPage > 5) pages = false

    }

    // Buscar todos los equipos de la api y guardarlos en un array sin repetirlos 

    const apiGenres = []

    for(let i = 0; i < apiResponseAllPage.length; i++){
      for (let j = 0; j < apiResponseAllPage[i].genres.length; j++) {
        if(apiResponseAllPage[i].genres[j].name){
          console.log(apiResponseAllPage[i].genres[j].name)
          apiGenres.push(apiResponseAllPage[i].genres[j].name)
        }
      }
    }

    const apiGenresRepeat = [...new Set(apiGenres)]

    // si no hay nada en la base de datos vamos a registarlos
    
    if(dbGenres.length === 0){
      for(const genre of apiGenresRepeat) {
        await Genres.create({ nombre: genre })
      }
    }

    // Si hay existen registros en la base de datos, va a compararlos con el array de teams que sacamos de la api
    // y si no existe el equipo, api vs db, entonces registra ese equipo

    if(dbGenres.length > 0){

      for(const nameGenre of apiGenresRepeat) {

        const genre = await Genres.findOne({ where: { nombre: nameGenre } })
        if(!genre){
          await Genres.create({ nombre: nameGenre })
        }
        
      }

    }

    const newDBGenres = await Genres.findAll()

    res.status(200).json({ 'Genres': newDBGenres })

  }
  catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor al obtener los generos.', error: error.message });
  }
}

module.exports = GetGenresController
