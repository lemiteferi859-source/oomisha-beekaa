const mongoose = require('mongoose');

const cropDiseaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  diseaseName: {
    type: String,
    required: true,
  },
  cropAffected: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String],
    default: [],
  },
  treatment: {
    type: String,
    required: true,
  },
  confidenceScore: {
    type: Number,
    default: 85,
  },
  imageUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('CropDisease', cropDiseaseSchema);
