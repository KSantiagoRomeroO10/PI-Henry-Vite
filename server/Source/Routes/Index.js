const express = require('express')
const router = express.Router()

const GetVideogamesRoute = require('./GetVideogamesRoute')
const GetVideogamesIdRoute = require('./GetVideogamesIdRoute')
const GetVideogamesNameRoute = require('./GetVideogamesNameRoute')
const GetGenresRoute = require('./GetGenresRoute')


router.use('/get', GetVideogamesRoute) // http://localhost:3000/get/videogames
router.use('/get', GetVideogamesIdRoute) // http://localhost:3000/get/videogames/:id
router.use('/get', GetVideogamesNameRoute) // http://localhost:3000/get/videogames?name=ha
router.use('/get', GetGenresRoute) // http://localhost:3000/get/videogames/genre

module.exports = router
