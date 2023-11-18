const express = require('express');
const router = express.Router();
const PostVidegamesController = require('../Controllers/PostVidegamesController');

router.post('/videogames', PostVidegamesController);

module.exports = router;
