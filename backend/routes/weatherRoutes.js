const express = require('express');
const router = express.Router();
const { getWeatherForecast } = require('../controllers/weatherController');

// Route to get weather forecast by location (latitude and longitude or city name)
router.get('/', getWeatherForecast);

module.exports = router;
