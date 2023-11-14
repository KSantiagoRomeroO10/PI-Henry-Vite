const express = require('express')
const router = express.Router()

const GetVideogamesRoute = require('./GetVideogamesRoute')
const GetVideogamesIdRoute = require('./GetVideogamesIdRoute')


router.use('/get', GetVideogamesRoute) // http://localhost:3000/get/videogames
router.use('/get', GetVideogamesIdRoute) // http://localhost:3000/get/videogames/:id

module.exports = router
