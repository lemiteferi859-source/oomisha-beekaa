const MarketPrice = require('../models/MarketPrice');

// @desc    Get market prices
// @route   GET /api/market
// @access  Public
const getMarketPrices = async (req, res) => {
  try {
    const { crop, location } = req.query;
    let query = {};
    
    if (crop) {
      query.cropName = new RegExp(crop, 'i');
    }
    if (location) {
      query.marketLocation = new RegExp(location, 'i');
    }

    const prices = await MarketPrice.find(query).sort({ dateRecorded: -1 });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add a new market price record
// @route   POST /api/market
// @access  Private/Admin (Placeholder)
const addMarketPrice = async (req, res) => {
  try {
    const { cropName, marketLocation, pricePerKg, currency } = req.body;

    if (!cropName || !marketLocation || !pricePerKg) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newPrice = await MarketPrice.create({
      cropName,
      marketLocation,
      pricePerKg,
      currency
    });

    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a market price record
// @route   DELETE /api/market/:id
// @access  Private
const deleteMarketPrice = async (req, res) => {
  try {
    const price = await MarketPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ message: 'Market price not found' });
    }
    await MarketPrice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Market price deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getMarketPrices,
  addMarketPrice,
  deleteMarketPrice
};
