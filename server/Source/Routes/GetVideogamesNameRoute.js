const express = require('express');
const router = express.Router();
const GetVideogamesNameController = require('../Controllers/GetVideogamesNameController');

router.get('/name', GetVideogamesNameController);

module.exports = router;
