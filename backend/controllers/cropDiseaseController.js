const CropDisease = require('../models/CropDisease');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Get disease info by name
// @route   GET /api/diseases/:diseaseName
// @access  Public
const getDiseaseInfo = async (req, res) => {
  try {
    const disease = await CropDisease.findOne({ diseaseName: new RegExp(req.params.diseaseName, 'i') });
    if (disease) {
      res.json(disease);
    } else {
      res.status(404).json({ message: 'Disease not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper to convert multer buffer to generative AI part
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType
    },
  };
}

// @desc    Report/Detect disease using Gemini AI (Text + Image)
// @route   POST /api/diseases/detect
// @access  Public
const reportDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;
    const file = req.file; // This comes from multer
    
    const apiKey = process.env.AI_MODEL_API_KEY;
    if (!apiKey || apiKey === 'your_ai_model_api_key_here') {
      return res.status(500).json({ message: 'AI Model API key is not configured.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert agricultural agronomist. 
    Analyze the provided crop image (if any) and the following symptoms to identify the likely disease, the crop affected, a confidence score (out of 100), and recommended treatment.
    Return strictly in JSON format without markdown wrapping, like this:
    {
      "diseaseName": "Name of Disease",
      "cropAffected": "Name of Crop",
      "confidenceScore": 95,
      "treatment": "Detailed steps to treat it"
    }
    Symptoms reported by farmer: ${symptoms || 'None provided'}`;

    let result;

    if (file) {
      // If an image was uploaded, send both the image and the text prompt to Gemini
      const imagePart = fileToGenerativePart(file.buffer, file.mimetype);
      result = await model.generateContent([prompt, imagePart]);
    } else {
      // Fallback if only text was provided
      result = await model.generateContent(prompt);
    }

    const responseText = result.response.text();
    const aiPrediction = JSON.parse(responseText.trim().replace(/^```json/i, '').replace(/```$/i, ''));

    res.json({
      message: 'Analysis complete',
      prediction: aiPrediction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error analyzing disease', error: error.message });
  }
};

module.exports = {
  getDiseaseInfo,
  reportDisease
};
