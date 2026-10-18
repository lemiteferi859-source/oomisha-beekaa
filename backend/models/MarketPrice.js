const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    index: true,
  },
  marketLocation: {
    type: String,
    required: true,
  },
  pricePerKg: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'ETB', // Defaulting to Ethiopian Birr given the likely Oromiffa name "Oomisha Beekaa", change if needed
  },
  dateRecorded: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
