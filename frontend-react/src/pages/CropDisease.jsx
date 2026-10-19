import { useState, useContext } from 'react';
import API from '../api';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function CropDisease() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [symptoms, setSymptoms] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const quickSymptoms = [
    { label: '☕ Coffee Leaf Rust', text: 'Orange powdery spots on lower surface of coffee leaves with premature leaf dropping' },
    { label: '🌾 Teff Head Smut', text: 'Black sooty fungal powder replacing teff grain heads' },
    { label: '🌽 Maize Armyworm', text: 'Ragged holes in maize whorls and leaves with sawdust-like frass' },
    { label: '🍞 Wheat Stem Rust', text: 'Reddish-brown elongated pustules breaking through wheat stems and leaves' }
  ];

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
      setError('Please provide either symptoms or upload a crop photo.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('symptoms', symptoms);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await API.post('/api/diseases/detect', formData, { headers });
      setResult(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to the AI diagnosis server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">{t('Crop Disease Detection')}</h1>
        <p className="text-gray-500 text-sm mt-1">
          AI vision scanner and agronomic disease diagnostics for Ethiopian crops
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-8">
        
        {/* Input Form */}
        <div className="flex-1">
          <form onSubmit={handleAnalyze}>
            <div className="mb-6">
              <label className="block text-gray-800 font-bold text-sm mb-2">
                1. Upload a photo of the affected crop leaf or stem
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-green-100 file:text-brandGreen hover:file:bg-green-200 transition cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-bold text-sm mb-2">
                2. Describe the observed symptoms
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen transition text-sm"
                rows="4"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., orange spots under leaves, wilting stem, caterpillar holes..."
              ></textarea>
            </div>

            {/* Quick symptom presets */}
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Common Symptoms Quick Presets:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickSymptoms.map((qs) => (
                  <button
                    type="button"
                    key={qs.label}
                    onClick={() => setSymptoms(qs.text)}
                    className="text-[11px] font-semibold bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-brandGreen border border-gray-200 px-2.5 py-1 rounded-lg transition"
                  >
                    {qs.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md transition active:scale-95 flex items-center justify-center gap-2 ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-brandGreen hover:bg-green-800'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Agronomist is Analyzing...</span>
                </>
              ) : (
                <>
                  <span>🔬</span>
                  <span>Analyze Crop with AI</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Image Preview Box */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/60 min-h-[250px] p-4 text-center">
          {imagePreview ? (
            <img src={imagePreview} alt="Crop Preview" className="max-h-64 object-contain rounded-xl shadow-sm" />
          ) : (
            <div className="space-y-2">
              <div className="text-4xl">📸</div>
              <p className="text-xs font-semibold text-gray-500">No image chosen</p>
              <p className="text-[11px] text-gray-400">Photo preview will appear here</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl mb-6 text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Diagnosis Results Card */}
      {result && (
        <div className="bg-white rounded-2xl shadow-md border border-green-200 overflow-hidden mb-8 animate-fade-in-up">
          <div className="bg-brandGreen p-6 text-white flex justify-between items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-200">AI Diagnostic Report</span>
              <h2 className="text-2xl font-black mt-0.5">Diagnosis Complete</h2>
            </div>
            {user && (
              <span className="text-xs bg-green-800 text-green-100 px-3 py-1 rounded-full font-semibold">
                ✓ Saved to Dashboard
              </span>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Identified Disease</p>
                <p className="text-lg font-black text-gray-900 mt-1">{result.diseaseName}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Crop Affected</p>
                <p className="text-lg font-black text-gray-900 mt-1">{result.cropAffected}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                <p className="text-xs text-brandGreen font-bold uppercase tracking-wider">AI Confidence</p>
                <p className="text-3xl font-black text-brandGreen mt-0.5">{result.confidenceScore}%</p>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Recommended Treatment & Agronomic Action</h3>
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{result.treatment}</p>
            </div>

            {user && (
              <div className="mt-4 text-right">
                <Link to="/dashboard" className="text-xs font-bold text-brandGreen hover:underline inline-flex items-center gap-1">
                  View past diagnoses on your Dashboard →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CropDisease;
