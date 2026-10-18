const express = require('express');
const router = express.Router();
const { getMarketPrices, addMarketPrice, deleteMarketPrice } = require('../controllers/marketController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all market prices or filter by crop
router.get('/', getMarketPrices);

// Route to add a new market price (protected)
router.post('/', protect, addMarketPrice);

// Route to delete a market price (protected)
router.delete('/:id', protect, deleteMarketPrice);

module.exports = router;
