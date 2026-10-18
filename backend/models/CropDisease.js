const mongoose = require('mongoose');

const cropDiseaseSchema = new mongoose.Schema({
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
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  confidenceScore: {
    type: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('CropDisease', cropDiseaseSchema);
