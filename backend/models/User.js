const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferredLanguage: {
    type: String,
    default: 'en', // can be 'en', 'om' (Oromo), 'am' (Amharic), etc.
  },
  role: {
    type: String,
    enum: ['farmer', 'admin', 'expert'],
    default: 'farmer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
