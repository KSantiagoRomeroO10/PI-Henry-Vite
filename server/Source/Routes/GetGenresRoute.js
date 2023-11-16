const express = require('express');
const router = express.Router();
const GetGenresController = require('../Controllers/GetGenresController');

router.get('/genres', GetGenresController);

module.exports = router;
