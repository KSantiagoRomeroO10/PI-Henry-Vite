const express = require('express');
const router = express.Router();
const GetVideogamesIdController = require('../Controllers/GetVideogamesIdController');

router.get('/videogames/:id', GetVideogamesIdController);

module.exports = router;
