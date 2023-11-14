const express = require('express')
const router = express.Router()

const GetVideogamesRoute = require('./GetVideogamesRoute')


router.use('/get', GetVideogamesRoute) // http://localhost:3000/get/videogames

module.exports = router
