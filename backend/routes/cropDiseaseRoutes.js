const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getDiseaseInfo, reportDisease } = require('../controllers/cropDiseaseController');

// Configure multer to store files in memory (perfect for passing directly to Gemini AI)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to get info about a specific disease
router.get('/:diseaseName', getDiseaseInfo);

// Route to submit an image and symptoms for AI prediction
// 'image' is the field name we expect from the frontend
router.post('/detect', upload.single('image'), reportDisease);

module.exports = router;
