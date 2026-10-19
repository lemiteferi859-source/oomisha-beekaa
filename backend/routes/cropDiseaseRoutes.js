const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getDiseaseInfo, reportDisease, getUserHistory } = require('../controllers/cropDiseaseController');
const { protect, optionalProtect } = require('../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to get logged-in user's past diagnoses
router.get('/my-history', protect, getUserHistory);

// Route to get info about a specific disease
router.get('/:diseaseName', getDiseaseInfo);

// Route to submit an image and symptoms for AI prediction (supports guest & logged-in users)
router.post('/detect', upload.single('image'), optionalProtect, reportDisease);

module.exports = router;
