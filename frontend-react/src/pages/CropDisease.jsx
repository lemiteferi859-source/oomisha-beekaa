import { useState } from 'react';
import API from '../api';
import { useTranslation } from 'react-i18next';

function CropDisease() {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptoms && !imageFile) {
      setError('Please provide either symptoms or an image.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    // Use FormData for file uploads
    const formData = new FormData();
    formData.append('symptoms', symptoms);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await API.post('/api/diseases/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('Crop Disease Detection')}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-8">
        
        {/* Input Form */}
        <div className="flex-1">
          <form onSubmit={handleAnalyze}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                1. Upload a photo of the affected crop (Optional but recommended)
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-brandGreen hover:file:bg-green-100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                2. Describe the symptoms
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-brandGreen"
                rows="4"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., yellow spots on leaves, wilting stem..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded font-bold text-white transition ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-brandGreen hover:bg-green-700'}`}
            >
              {loading ? 'AI is analyzing...' : 'Analyze with AI'}
            </button>
          </form>
        </div>

        {/* Image Preview */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 min-h-[250px] p-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Crop Preview" className="max-h-64 object-contain rounded" />
          ) : (
            <span className="text-gray-400 text-center">No image selected<br/>Image preview will appear here</span>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 shadow-sm">
          {error}
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="bg-green-50 border-l-4 border-brandGreen p-6 rounded-r-lg shadow-sm animate-fade-in-up">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Diagnosis Complete
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Disease Name</p>
              <p className="text-lg font-semibold text-gray-900">{result.diseaseName}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Crop Affected</p>
              <p className="text-lg font-semibold text-gray-900">{result.cropAffected}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm text-center border-b-4 border-brandGreen">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">AI Confidence</p>
              <p className="text-2xl font-black text-brandGreen">{result.confidenceScore}%</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded shadow-sm">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Recommended Treatment</p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.treatment}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropDisease;
