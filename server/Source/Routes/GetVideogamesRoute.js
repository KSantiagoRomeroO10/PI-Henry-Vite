const express = require('express');
const router = express.Router();
const GetVideogamesController = require('../Controllers/GetVideogamesController');

router.get('/videogames', GetVideogamesController);

module.exports = router;
